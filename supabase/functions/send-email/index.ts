import { corsHeaders, handleCors } from '../_shared/cors.ts';

serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { to, template, data, apiKey } = await req.json();

    // apiKey viene passato dal frontend (recuperato dalla tabella settings)
    const resendKey = apiKey || Deno.env.get('RESEND_API_KEY');

    if (!resendKey) {
      return new Response(
        JSON.stringify({ error: 'Resend API key non configurata' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailContent = buildEmailContent(template, data);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ThermoDMR <noreply@thermodmr.com>',
        to: [to],
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: result.message || 'Errore Resend' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function buildEmailContent(template: string, data: Record<string, unknown>) {
  const baseStyle = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;`;
  const headerStyle = `background: #111; padding: 32px; text-align: center; border-radius: 8px 8px 0 0;`;
  const bodyStyle = `background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none;`;
  const footerStyle = `background: #f9fafb; padding: 16px 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; text-align: center;`;

  const header = `<div style="${headerStyle}"><img src="https://thermodmr.com/favicon.ico" alt="ThermoDMR" style="height:40px;" /><h1 style="color:#fff; margin: 12px 0 0; font-size: 20px;">ThermoDMR</h1></div>`;
  const footer = `<div style="${footerStyle}"><p style="color:#9ca3af; font-size: 12px; margin: 0;">© ThermoDMR · <a href="https://thermodmr.com" style="color:#6b7280;">thermodmr.com</a></p></div>`;

  const templates: Record<string, { subject: string; html: string }> = {
    ordine_pronto: {
      subject: `Il tuo ordine #${data.orderNumber} è pronto`,
      html: `<div style="${baseStyle}">${header}<div style="${bodyStyle}"><h2 style="color:#111;">Ordine pronto per la consegna</h2><p>Gentile ${data.clientName},</p><p>Il tuo ordine <strong>#${data.orderNumber}</strong> è pronto e in attesa di essere ritirato/consegnato.</p>${data.details ? `<p><strong>Dettagli:</strong> ${data.details}</p>` : ''}<p>Per qualsiasi informazione, contattaci.</p><p>Cordiali saluti,<br/>Il team ThermoDMR</p></div>${footer}</div>`,
    },
    sollecito_pagamento: {
      subject: `Sollecito pagamento — Ordine #${data.orderNumber}`,
      html: `<div style="${baseStyle}">${header}<div style="${bodyStyle}"><h2 style="color:#111;">Promemoria pagamento</h2><p>Gentile ${data.clientName},</p><p>Ti ricordiamo che risulta un pagamento in sospeso per l'ordine <strong>#${data.orderNumber}</strong>.</p><p><strong>Importo dovuto:</strong> €${data.amount}</p>${data.dueDate ? `<p><strong>Scadenza:</strong> ${data.dueDate}</p>` : ''}<p>Ti invitiamo a provvedere al pagamento al più presto. Per chiarimenti, non esitare a contattarci.</p><p>Cordiali saluti,<br/>Il team ThermoDMR</p></div>${footer}</div>`,
    },
    benvenuto_rivenditore: {
      subject: `Benvenuto in ThermoDMR — Le tue credenziali`,
      html: `<div style="${baseStyle}">${header}<div style="${bodyStyle}"><h2 style="color:#111;">Benvenuto in ThermoDMR!</h2><p>Gentile ${data.name},</p><p>Il tuo account è stato creato con successo. Ecco le tue credenziali di accesso:</p><table style="background:#f9fafb; border-radius:8px; padding:16px; width:100%;"><tr><td style="padding:8px 0;"><strong>Email:</strong></td><td>${data.email}</td></tr><tr><td style="padding:8px 0;"><strong>Password temporanea:</strong></td><td style="font-family:monospace;">${data.tempPassword}</td></tr></table><p>Accedi all'area riservata e cambia la password al primo accesso:</p><div style="text-align:center; margin:24px 0;"><a href="https://app.thermodmr.com/auth" style="background:#111; color:#fff; padding:12px 32px; border-radius:6px; text-decoration:none; font-weight:600;">Accedi ora</a></div><p style="color:#6b7280; font-size:13px;">Per sicurezza, ti consigliamo di cambiare la password al primo accesso.</p><p>Cordiali saluti,<br/>Il team ThermoDMR</p></div>${footer}</div>`,
    },
    ordine_confermato: {
      subject: `Ordine #${data.orderNumber} confermato`,
      html: `<div style="${baseStyle}">${header}<div style="${bodyStyle}"><h2 style="color:#111;">Ordine confermato</h2><p>Gentile ${data.clientName},</p><p>Il tuo ordine <strong>#${data.orderNumber}</strong> è stato confermato e preso in carico dalla nostra produzione.</p>${data.estimatedDelivery ? `<p><strong>Consegna stimata:</strong> ${data.estimatedDelivery}</p>` : ''}<p>Riceverai una notifica quando l'ordine sarà pronto.</p><p>Cordiali saluti,<br/>Il team ThermoDMR</p></div>${footer}</div>`,
    },
  };

  return templates[template] ?? { subject: 'Notifica ThermoDMR', html: `<p>${JSON.stringify(data)}</p>` };
}

// Deno.serve alias for compatibility with older std versions
function serve(handler: (req: Request) => Promise<Response>) {
  Deno.serve(handler);
}
