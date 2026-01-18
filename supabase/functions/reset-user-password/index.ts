import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { createAdminClient, verifySuperAdmin, createSupabaseClient } from '../_shared/auth.ts';
import { createErrorResponse, createSuccessResponse, ApiError, HttpStatus } from '../_shared/errors.ts';
import { validateBody, z, CommonSchemas } from '../_shared/validation.ts';

// Input validation schema
const resetPasswordSchema = z.object({
  userId: CommonSchemas.uuid,
});

/**
 * Generate secure random password
 */
function generateSecurePassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(randomValues[i] % charset.length);
  }
  return password;
}

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
    console.log(`User ${caller.id} (${caller.email}) resetting password`);

    // Validate input
    const { userId } = await validateBody(req, resetPasswordSchema);
    console.log('Resetting password for user:', userId);

    // Verify target user exists
    const { data: targetUser, error: userCheckError } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (userCheckError || !targetUser?.user) {
      throw new ApiError('User not found', HttpStatus.NOT_FOUND);
    }

    // Generate new password
    const newPassword = generateSecurePassword();

    // Update password
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    if (updateError) {
      console.error('Error updating password:', updateError);
      throw new ApiError(
        `Failed to reset password: ${updateError.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    console.log('Password reset successfully for user:', userId);

    // Log the action in audit_log
    try {
      await supabaseAdmin.from('audit_log').insert({
        entity: 'user',
        azione: 'password_reset',
        entity_id: userId,
        user_id: caller.id,
        old_values: null,
        new_values: {
          action: 'Password reset by admin',
          reset_by: caller.email,
          reset_at: new Date().toISOString(),
        },
      });
      console.log('Audit log entry created');
    } catch (auditError) {
      console.error('Failed to create audit log:', auditError);
      // Non-critical, don't fail the request
    }

    return createSuccessResponse({
      success: true,
      userId,
      newPassword,
      message: 'Password successfully reset',
    });
  } catch (error) {
    return createErrorResponse(error);
  }
});
