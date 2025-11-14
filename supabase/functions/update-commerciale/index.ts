import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

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

    // Validate input using Zod schema
    const inputSchema = z.object({
      user_id: z.string().uuid("Invalid user_id format"),
      email: z.string().email("Invalid email format").max(255, "Email too long").optional(),
      display_name: z.string().trim().min(1, "Display name cannot be empty").max(100, "Display name too long").optional(),
      is_active: z.boolean().optional(),
    });

    const requestBody = await req.json();
    const validationResult = inputSchema.safeParse(requestBody);
    
    if (!validationResult.success) {
      throw new Error(`Validation failed: ${validationResult.error.errors.map(e => e.message).join(", ")}`);
    }

    const { user_id, email, display_name, is_active } = validationResult.data;

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
