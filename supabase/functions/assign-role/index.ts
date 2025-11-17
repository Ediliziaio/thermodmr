import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    // Verify the user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Check if the user is a super_admin
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (roleError) {
      console.error('Error checking role:', roleError);
      throw new Error('Failed to verify user role');
    }

    if (!roleData || roleData.role !== 'super_admin') {
      throw new Error('Only super_admin can assign roles');
    }

    // Parse request body
    const { user_id, role } = await req.json();

    if (!user_id || !role) {
      throw new Error('Missing user_id or role in request body');
    }

    // Validate role
    const validRoles = ['super_admin', 'commerciale', 'rivenditore'];
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
    }

    // Check if user exists in profiles
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, display_name')
      .eq('id', user_id)
      .maybeSingle();

    if (profileError || !profileData) {
      throw new Error('User not found');
    }

    // Check if user already has a role
    const { data: existingRole } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', user_id)
      .maybeSingle();

    let result;
    if (existingRole) {
      // Update existing role
      const { data, error } = await supabase
        .from('user_roles')
        .update({ role, updated_at: new Date().toISOString() })
        .eq('user_id', user_id)
        .select()
        .single();

      if (error) throw error;
      result = data;
      
      console.log(`Updated role for user ${profileData.email} (${user_id}) to ${role}`);
    } else {
      // Insert new role
      const { data, error } = await supabase
        .from('user_roles')
        .insert({ user_id, role })
        .select()
        .single();

      if (error) throw error;
      result = data;
      
      console.log(`Assigned role ${role} to user ${profileData.email} (${user_id})`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Role ${role} assigned to ${profileData.email}`,
        data: {
          user_id: result.user_id,
          role: result.role,
          email: profileData.email,
          display_name: profileData.display_name
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in assign-role function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    const status = errorMessage === 'Only super_admin can assign roles' ? 403 : 400;
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        success: false
      }),
      { 
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
