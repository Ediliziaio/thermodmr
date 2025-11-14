import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Verify the user making the request is a super_admin
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabaseAdmin.auth.getUser(token);

    if (!user) {
      throw new Error("Unauthorized");
    }

    // Check if user is super_admin
    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "super_admin")
      .single();

    if (!roles) {
      throw new Error("Only super admins can update commerciali");
    }

    const { user_id, email, display_name, is_active } = await req.json();

    if (!user_id) {
      throw new Error("user_id is required");
    }

    // Update email if provided
    if (email) {
      const { error: emailError } = await supabaseAdmin.auth.admin.updateUserById(
        user_id,
        { email }
      );
      if (emailError) throw emailError;
    }

    // Update display_name if provided
    if (display_name !== undefined) {
      const { error: metadataError } = await supabaseAdmin.auth.admin.updateUserById(
        user_id,
        { 
          user_metadata: { display_name }
        }
      );
      if (metadataError) throw metadataError;

      // Also update profiles table
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .update({ display_name })
        .eq("id", user_id);
      
      if (profileError) throw profileError;
    }

    // Update is_active if provided
    if (is_active !== undefined) {
      const { error: activeError } = await supabaseAdmin
        .from("profiles")
        .update({ is_active })
        .eq("id", user_id);
      
      if (activeError) throw activeError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Commerciale updated successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error updating commerciale:", error);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
