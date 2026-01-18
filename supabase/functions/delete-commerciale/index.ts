import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { createAdminClient, verifySuperAdmin, createSupabaseClient } from '../_shared/auth.ts';
import { createErrorResponse, createSuccessResponse, ApiError, HttpStatus } from '../_shared/errors.ts';
import { validateBody, z, CommonSchemas } from '../_shared/validation.ts';

// Input validation schema
const deleteCommercialeSchema = z.object({
  commerciale_id: CommonSchemas.uuid,
  transfer_to_commerciale_id: CommonSchemas.uuid,
}).refine(
  (data) => data.commerciale_id !== data.transfer_to_commerciale_id,
  { message: 'Cannot transfer dealers to the same commerciale being deleted' }
);

Deno.serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Create clients
    const supabase = createSupabaseClient(req);
    const supabaseAdmin = createAdminClient();

    // Verify caller is super_admin
    const caller = await verifySuperAdmin(supabase);
    console.log(`User ${caller.id} (${caller.email}) deleting commerciale`);

    // Validate input
    const { commerciale_id, transfer_to_commerciale_id } = await validateBody(req, deleteCommercialeSchema);
    console.log(`Deleting commerciale ${commerciale_id}, transferring to ${transfer_to_commerciale_id}`);

    // Verify target commerciale exists
    const { data: targetProfile, error: targetError } = await supabaseAdmin
      .from('profiles')
      .select('id, display_name')
      .eq('id', transfer_to_commerciale_id)
      .single();

    if (targetError || !targetProfile) {
      throw new ApiError('Target commerciale not found', HttpStatus.NOT_FOUND);
    }

    // Get dealers count before transfer
    const { count: dealersCount } = await supabaseAdmin
      .from('dealers')
      .select('id', { count: 'exact', head: true })
      .eq('commerciale_owner_id', commerciale_id);

    console.log(`Transferring ${dealersCount || 0} dealers to ${targetProfile.display_name}`);

    // Transfer dealers
    if (dealersCount && dealersCount > 0) {
      const { error: transferDealersError } = await supabaseAdmin
        .from('dealers')
        .update({ commerciale_owner_id: transfer_to_commerciale_id })
        .eq('commerciale_owner_id', commerciale_id);

      if (transferDealersError) {
        console.error('Error transferring dealers:', transferDealersError);
        throw new ApiError(
          `Failed to transfer dealers: ${transferDealersError.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }

    // Transfer orders
    const { count: ordersCount } = await supabaseAdmin
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .eq('commerciale_id', commerciale_id);

    if (ordersCount && ordersCount > 0) {
      const { error: transferOrdersError } = await supabaseAdmin
        .from('orders')
        .update({ commerciale_id: transfer_to_commerciale_id })
        .eq('commerciale_id', commerciale_id);

      if (transferOrdersError) {
        console.error('Error transferring orders:', transferOrdersError);
        throw new ApiError(
          `Failed to transfer orders: ${transferOrdersError.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      console.log(`Transferred ${ordersCount} orders`);
    }

    // Transfer commissions
    const { error: transferCommissionsError } = await supabaseAdmin
      .from('commissions')
      .update({ commerciale_id: transfer_to_commerciale_id })
      .eq('commerciale_id', commerciale_id);

    if (transferCommissionsError) {
      console.error('Error transferring commissions:', transferCommissionsError);
      // Non-critical, continue
    }

    // Delete the user from auth.users (cascades to profile and user_roles)
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(commerciale_id);

    if (deleteError) {
      console.error('Error deleting user:', deleteError);
      throw new ApiError(
        `Failed to delete commerciale: ${deleteError.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    console.log(`Successfully deleted commerciale ${commerciale_id}`);

    return createSuccessResponse({
      success: true,
      message: 'Commerciale deleted successfully',
      dealers_transferred: dealersCount || 0,
      orders_transferred: ordersCount || 0,
    });
  } catch (error) {
    return createErrorResponse(error);
  }
});
