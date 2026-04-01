import { supabase } from "@/integrations/supabase/client";

export type EmailTemplate =
  | "ordine_pronto"
  | "sollecito_pagamento"
  | "benvenuto_rivenditore"
  | "ordine_confermato";

export interface EmailPayload {
  to: string;
  template: EmailTemplate;
  data: Record<string, unknown>;
}

/**
 * Reads the Resend API key from the settings table (integration category).
 * Returns null if not configured.
 */
export const getResendApiKey = async (): Promise<string | null> => {
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "resend_api_key")
    .maybeSingle();

  if (!data?.value) return null;
  // value is stored as jsonb — strip surrounding quotes if it's a string
  const raw = String(data.value).replace(/^"|"$/g, "");
  return raw || null;
};

/**
 * Persists the Resend API key to the settings table.
 */
export const saveResendApiKey = async (apiKey: string): Promise<void> => {
  const { error } = await supabase
    .from("settings")
    .update({ value: JSON.stringify(apiKey), updated_at: new Date().toISOString() })
    .eq("key", "resend_api_key");

  if (error) throw error;
};

/**
 * Invokes the `send-email` Edge Function.
 * The API key is fetched from settings and forwarded to the function.
 */
export const sendEmail = async (payload: EmailPayload): Promise<void> => {
  const apiKey = await getResendApiKey();

  const { data, error } = await supabase.functions.invoke("send-email", {
    body: { ...payload, apiKey },
  });

  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
};
