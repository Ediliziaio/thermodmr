import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReassignmentRequest {
  dealerId: string;
  dealerName: string;
  oldCommercialeId: string;
  oldCommercialeName: string;
  newCommercialeId: string;
  newCommercialeName: string;
  motivazione: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Validate input using Zod schema
    const inputSchema = z.object({
      dealerId: z.string().uuid("Invalid dealerId format"),
      dealerName: z.string().trim().min(1, "Dealer name required").max(200, "Dealer name too long"),
      oldCommercialeId: z.string().uuid("Invalid oldCommercialeId format"),
      oldCommercialeName: z.string().trim().min(1, "Old commerciale name required").max(200, "Old commerciale name too long"),
      newCommercialeId: z.string().uuid("Invalid newCommercialeId format"),
      newCommercialeName: z.string().trim().min(1, "New commerciale name required").max(200, "New commerciale name too long"),
      motivazione: z.string().trim().min(1, "Motivazione required").max(1000, "Motivazione too long"),
    });

    const requestBody = await req.json();
    const validationResult = inputSchema.safeParse(requestBody);
    
    if (!validationResult.success) {
      throw new Error(`Validation failed: ${validationResult.error.errors.map(e => e.message).join(", ")}`);
    }

    const {
      dealerName,
      oldCommercialeId,
      oldCommercialeName,
      newCommercialeId,
      newCommercialeName,
      motivazione,
    } = validationResult.data;

    // Fetch email addresses
    const { data: oldCommercialeProfile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", oldCommercialeId)
      .single();

    const { data: newCommercialeProfile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", newCommercialeId)
      .single();

    if (!oldCommercialeProfile?.email || !newCommercialeProfile?.email) {
      throw new Error("Could not fetch commerciale email addresses");
    }

    // Send email to old commerciale (dealer removed)
    await resend.emails.send({
      from: "Sistema Gestione <onboarding@resend.dev>",
      to: [oldCommercialeProfile.email],
      subject: `Dealer ${dealerName} riassegnato`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Dealer Riassegnato</h2>
          <p>Ciao <strong>${oldCommercialeName}</strong>,</p>
          <p>Il dealer <strong>${dealerName}</strong> è stato riassegnato da te a <strong>${newCommercialeName}</strong>.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #666;">Motivazione:</h3>
            <p style="margin-bottom: 0;">${motivazione}</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Se hai domande, contatta il tuo amministratore.
          </p>
        </div>
      `,
    });

    // Send email to new commerciale (dealer assigned)
    await resend.emails.send({
      from: "Sistema Gestione <onboarding@resend.dev>",
      to: [newCommercialeProfile.email],
      subject: `Nuovo dealer assegnato: ${dealerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nuovo Dealer Assegnato</h2>
          <p>Ciao <strong>${newCommercialeName}</strong>,</p>
          <p>Ti è stato assegnato un nuovo dealer: <strong>${dealerName}</strong></p>
          <p>Precedentemente gestito da: <strong>${oldCommercialeName}</strong></p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #666;">Motivazione della riassegnazione:</h3>
            <p style="margin-bottom: 0;">${motivazione}</p>
          </div>
          
          <p>Puoi visualizzare i dettagli del dealer accedendo al sistema.</p>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Buon lavoro!
          </p>
        </div>
      `,
    });

    console.log("Reassignment notification emails sent successfully");

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-dealer-reassignment function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
