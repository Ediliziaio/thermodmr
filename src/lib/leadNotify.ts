import { supabase } from "@/integrations/supabase/client";

const OFFICE_EMAIL = "office.marysoryna@gmail.com";

export interface LeadInfo {
  nome: string;
  email: string;
  telefono?: string;
  azienda?: string;
  messaggio: string;
  tipo?: string;
  citta?: string;
  fonte?: string;
  lingua: "it" | "ro";
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Invia una notifica email all'ufficio per ogni nuovo lead.
 * Fire-and-forget: qualsiasi errore viene ignorato — il lead è già
 * salvato in contact_requests, l'email è solo un avviso in più.
 */
export function notifyNewLead(lead: LeadInfo): void {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:8px 14px;font-size:13px;color:#6b7280;background:#f9fafb;border-bottom:1px solid #e5e7eb;width:35%;">${label}</td><td style="padding:8px 14px;font-size:13px;color:#111;font-weight:600;border-bottom:1px solid #e5e7eb;">${esc(value)}</td></tr>`
      : "";

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
  <h2 style="color:#111;margin:0 0 4px;">Nuovo lead dal sito thermodmr.com</h2>
  <p style="color:#6b7280;margin:0 0 20px;font-size:13px;">Ricevuto ${new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" })} · lingua ${lead.lingua.toUpperCase()}</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
    ${row("Nome", lead.nome)}
    ${row("Email", lead.email)}
    ${row("Telefono", lead.telefono)}
    ${row("Azienda", lead.azienda)}
    ${row("Tipo richiesta", lead.tipo)}
    ${row("Città / Provincia", lead.citta)}
    ${row("Pagina di provenienza", lead.fonte)}
  </table>
  <div style="margin-top:16px;padding:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
    <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Messaggio</p>
    <p style="margin:0;font-size:14px;color:#111;white-space:pre-wrap;">${esc(lead.messaggio)}</p>
  </div>
  <p style="margin-top:20px;font-size:13px;">
    <a href="mailto:${esc(lead.email)}" style="color:#1d9bc4;">Rispondi via email</a>
    ${lead.telefono ? ` · <a href="tel:${esc(lead.telefono)}" style="color:#1d9bc4;">Chiama ${esc(lead.telefono)}</a>` : ""}
  </p>
</div>`;

  supabase.functions
    .invoke("send-email", {
      body: {
        to: OFFICE_EMAIL,
        subject: `🔔 Nuovo lead: ${lead.nome}${lead.tipo ? ` (${lead.tipo})` : ""}`,
        html,
      },
    })
    .catch(() => {
      /* solo notifica: il lead è già salvato */
    });
}

/** Fonte della richiesta: percorso + eventuali UTM della sessione. */
export function leadSource(): string {
  try {
    const utm = sessionStorage.getItem("tdmr_utm") || "";
    return `${window.location.pathname}${utm ? ` | ${utm}` : ""}`.slice(0, 200);
  } catch {
    return window.location.pathname;
  }
}

/** Salva gli UTM della prima visita per attribuire il lead alla campagna. */
export function captureUtm(): void {
  try {
    if (sessionStorage.getItem("tdmr_utm")) return;
    const p = new URLSearchParams(window.location.search);
    const parts = ["utm_source", "utm_medium", "utm_campaign", "gclid", "fbclid"]
      .map((k) => (p.get(k) ? `${k}=${p.get(k)}` : null))
      .filter(Boolean);
    if (parts.length) sessionStorage.setItem("tdmr_utm", parts.join("&"));
  } catch {
    /* storage non disponibile */
  }
}
