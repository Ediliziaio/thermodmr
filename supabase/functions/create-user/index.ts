import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Verify the user is authenticated and is a super_admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Check if user has super_admin role
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'super_admin')
      .single();

    if (roleError || !roleData) {
      console.error('Role check failed:', roleError);
      return new Response(
        JSON.stringify({ error: 'Only super admins can create users' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate input
    const inputSchema = z.object({
      email: z.string().email().max(255),
      password: z.string().min(8).max(72),
      display_name: z.string().trim().min(1).max(100),
      role: z.enum(['super_admin', 'commerciale', 'rivenditore']),
    });

    const body = await req.json();
    const validatedData = inputSchema.parse(body);

    console.log('Creating user with email:', validatedData.email);

    // Create user with Supabase Admin API
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: validatedData.email,
      password: validatedData.password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        display_name: validatedData.display_name,
      },
    });

    if (createError) {
      console.error('Error creating user:', createError);
      throw new Error(`Failed to create user: ${createError.message}`);
    }

    console.log('User created successfully, ID:', newUser.user.id);

    // Insert into profiles table (should be handled by trigger, but let's be safe)
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: newUser.user.id,
        email: validatedData.email,
        display_name: validatedData.display_name,
        is_active: true,
      });

    if (profileError) {
      console.error('Error creating profile:', profileError);
      // Don't fail the entire operation, the trigger should handle this
    }

    // Assign role in user_roles table
    const { error: roleInsertError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: newUser.user.id,
        role: validatedData.role,
      });

    if (roleInsertError) {
      console.error('Error assigning role:', roleInsertError);
      // Try to clean up the created user
      await supabaseAdmin.auth.admin.deleteUser(newUser.user.id);
      throw new Error(`Failed to assign role: ${roleInsertError.message}`);
    }

    console.log('Role assigned successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        user: {
          id: newUser.user.id,
          email: validatedData.email,
          display_name: validatedData.display_name,
          role: validatedData.role,
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in create-user function:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const statusCode = errorMessage.includes('Unauthorized') || errorMessage.includes('super admins') ? 403 : 400;
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error instanceof z.ZodError ? error.errors : undefined
      }),
      { 
        status: statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
