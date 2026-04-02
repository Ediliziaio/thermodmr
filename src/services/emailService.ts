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
 * Fetches a custom template (HTML + subject) from the email_templates table.
 * Replaces {{variable}} placeholders with actual values.
 * Returns null if no custom template is saved yet.
 */
export const getCustomTemplate = async (
  templateKey: EmailTemplate,
  data: Record<string, unknown>
): Promise<{ html: string; subject: string } | null> => {
  const { data: row } = await supabase
    .from("email_templates")
    .select("html, subject")
    .eq("template_key", templateKey)
    .maybeSingle();

  if (!row?.html) return null;

  // Replace {{variable}} placeholders
  let html = row.html;
  let subject = row.subject || "";
  for (const [key, value] of Object.entries(data)) {
    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    const replacement = value !== undefined && value !== null ? String(value) : "";
    html = html.replace(placeholder, replacement);
    subject = subject.replace(placeholder, replacement);
  }

  return { html, subject };
};

/**
 * Invokes the `send-email` Edge Function.
 * If a custom template exists in the DB, its compiled HTML is used directly.
 * Otherwise falls back to the built-in Edge Function templates.
 */
export const sendEmail = async (payload: EmailPayload): Promise<void> => {
  const [apiKey, customTemplate] = await Promise.all([
    getResendApiKey(),
    getCustomTemplate(payload.template, payload.data).catch(() => null),
  ]);

  const body = customTemplate
    ? // Custom builder template: send raw HTML + subject directly
      {
        to: payload.to,
        html: customTemplate.html,
        subject: customTemplate.subject,
        apiKey,
      }
    : // Fallback: built-in template in Edge Function
      { ...payload, apiKey };

  const { data, error } = await supabase.functions.invoke("send-email", { body });

  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
};
