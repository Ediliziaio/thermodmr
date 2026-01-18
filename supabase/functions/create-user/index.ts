import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { createAdminClient, verifySuperAdmin, createSupabaseClient } from '../_shared/auth.ts';
import { createErrorResponse, createSuccessResponse, ApiError, HttpStatus } from '../_shared/errors.ts';
import { validateBody, z, CommonSchemas } from '../_shared/validation.ts';

// Input validation schema
const createUserSchema = z.object({
  email: CommonSchemas.email,
  password: CommonSchemas.password,
  display_name: CommonSchemas.displayName,
  role: CommonSchemas.appRole,
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
    console.log(`User ${caller.id} (${caller.email}) creating new user`);

    // Validate input
    const { email, password, display_name, role } = await validateBody(req, createUserSchema);
    console.log('Creating user with email:', email);

    // Create user with Supabase Admin API
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { display_name },
    });

    if (createError) {
      console.error('Error creating user:', createError);
      throw new ApiError(`Failed to create user: ${createError.message}`, HttpStatus.BAD_REQUEST);
    }

    console.log('User created successfully, ID:', newUser.user.id);

    // Insert into profiles table
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: newUser.user.id,
        email,
        display_name,
        is_active: true,
      });

    if (profileError) {
      console.error('Error creating profile:', profileError);
      // Don't fail - trigger should handle this
    }

    // Assign role
    const { error: roleInsertError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: newUser.user.id,
        role,
      });

    if (roleInsertError) {
      console.error('Error assigning role:', roleInsertError);
      // Clean up the created user
      await supabaseAdmin.auth.admin.deleteUser(newUser.user.id);
      throw new ApiError(`Failed to assign role: ${roleInsertError.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    console.log('Role assigned successfully:', role);

    return createSuccessResponse({
      success: true,
      user: {
        id: newUser.user.id,
        email,
        display_name,
        role,
      },
    });
  } catch (error) {
    return createErrorResponse(error);
  }
});
