import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify user is super_admin
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      console.error('Authentication error:', userError);
      return new Response(
        JSON.stringify({ error: 'Non autenticato' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: roles, error: rolesError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    if (rolesError || !roles?.some((r) => r.role === 'super_admin')) {
      console.error('Authorization error:', rolesError);
      return new Response(
        JSON.stringify({ error: 'Non autorizzato. Solo super_admin può eliminare commerciali.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input using Zod schema
    const inputSchema = z.object({
      commerciale_id: z.string().uuid("Invalid commerciale_id format"),
      transfer_to_commerciale_id: z.string().uuid("Invalid transfer_to_commerciale_id format"),
    });

    const requestBody = await req.json();
    const validationResult = inputSchema.safeParse(requestBody);
    
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: `Validation failed: ${validationResult.error.errors.map(e => e.message).join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { commerciale_id, transfer_to_commerciale_id } = validationResult.data;

    if (commerciale_id === transfer_to_commerciale_id) {
      return new Response(
        JSON.stringify({ error: 'Non puoi trasferire i dealers allo stesso commerciale' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Starting deletion of commerciale ${commerciale_id}, transferring dealers to ${transfer_to_commerciale_id}`);

    // Create admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Transfer all dealers to the new commerciale
    const { data: dealers, error: dealersError } = await supabaseAdmin
      .from('dealers')
      .select('id')
      .eq('commerciale_owner_id', commerciale_id);

    if (dealersError) {
      console.error('Error fetching dealers:', dealersError);
      return new Response(
        JSON.stringify({ error: `Errore nel recupero dei dealers: ${dealersError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (dealers && dealers.length > 0) {
      console.log(`Transferring ${dealers.length} dealers to commerciale ${transfer_to_commerciale_id}`);
      
      const { error: transferError } = await supabaseAdmin
        .from('dealers')
        .update({ commerciale_owner_id: transfer_to_commerciale_id })
        .eq('commerciale_owner_id', commerciale_id);

      if (transferError) {
        console.error('Error transferring dealers:', transferError);
        return new Response(
          JSON.stringify({ error: `Errore nel trasferimento dei dealers: ${transferError.message}` }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // 2. Delete the user from auth.users (this will cascade delete profile and user_roles)
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(commerciale_id);

    if (deleteError) {
      console.error('Error deleting user:', deleteError);
      return new Response(
        JSON.stringify({ error: `Errore nell'eliminazione del commerciale: ${deleteError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully deleted commerciale ${commerciale_id} and transferred ${dealers?.length || 0} dealers`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Commerciale eliminato con successo',
        dealers_transferred: dealers?.length || 0
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Errore interno del server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
