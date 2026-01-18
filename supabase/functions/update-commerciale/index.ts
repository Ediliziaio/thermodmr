import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { createAdminClient, verifySuperAdmin, createSupabaseClient } from '../_shared/auth.ts';
import { createErrorResponse, createSuccessResponse, ApiError, HttpStatus } from '../_shared/errors.ts';
import { validateBody, z, CommonSchemas } from '../_shared/validation.ts';

// Input validation schema
const updateCommercialeSchema = z.object({
  user_id: CommonSchemas.uuid,
  email: CommonSchemas.email.optional(),
  display_name: CommonSchemas.displayName.optional(),
  is_active: z.boolean().optional(),
});

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
    console.log(`User ${caller.id} (${caller.email}) updating commerciale`);

    // Validate input
    const { user_id, email, display_name, is_active } = await validateBody(req, updateCommercialeSchema);
    console.log('Updating user:', user_id);

    // Check if at least one field to update
    if (email === undefined && display_name === undefined && is_active === undefined) {
      throw new ApiError('No fields to update provided', HttpStatus.BAD_REQUEST);
    }

    // Verify target user exists
    const { data: existingProfile, error: profileCheckError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', user_id)
      .single();

    if (profileCheckError || !existingProfile) {
      throw new ApiError('User not found', HttpStatus.NOT_FOUND);
    }

    // Update email if provided
    if (email) {
      const { error: emailError } = await supabaseAdmin.auth.admin.updateUserById(user_id, { email });
      if (emailError) {
        console.error('Error updating email:', emailError);
        throw new ApiError(`Failed to update email: ${emailError.message}`, HttpStatus.BAD_REQUEST);
      }

      // Also update profiles table
      const { error: profileEmailError } = await supabaseAdmin
        .from('profiles')
        .update({ email })
        .eq('id', user_id);

      if (profileEmailError) {
        console.error('Error updating profile email:', profileEmailError);
      }
    }

    // Update display_name if provided
    if (display_name !== undefined) {
      const { error: metadataError } = await supabaseAdmin.auth.admin.updateUserById(user_id, {
        user_metadata: { display_name },
      });

      if (metadataError) {
        console.error('Error updating metadata:', metadataError);
        throw new ApiError(`Failed to update display name: ${metadataError.message}`, HttpStatus.BAD_REQUEST);
      }

      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update({ display_name })
        .eq('id', user_id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
      }
    }

    // Update is_active if provided
    if (is_active !== undefined) {
      const { error: activeError } = await supabaseAdmin
        .from('profiles')
        .update({ is_active })
        .eq('id', user_id);

      if (activeError) {
        console.error('Error updating is_active:', activeError);
        throw new ApiError(`Failed to update active status: ${activeError.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    console.log('User updated successfully:', user_id);

    return createSuccessResponse({
      success: true,
      message: 'Commerciale updated successfully',
      updated_fields: {
        email: email !== undefined,
        display_name: display_name !== undefined,
        is_active: is_active !== undefined,
      },
    });
  } catch (error) {
    return createErrorResponse(error);
  }
});
