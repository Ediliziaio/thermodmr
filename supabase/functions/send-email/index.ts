import { corsHeaders, handleCors } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const body = await req.json();
    const { to, apiKey, html: customHtml, subject: customSubject, template, data } = body;

    const resendKey = apiKey || Deno.env.get('RESEND_API_KEY');
    if (!resendKey) {
      return new Response(
        JSON.stringify({ error: 'Resend API key non configurata' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use custom builder HTML if provided, otherwise build from template key
    let emailHtml: string;
    let emailSubject: string;

    if (customHtml && customSubject) {
      emailHtml = customHtml;
      emailSubject = customSubject;
    } else {
      const content = buildEmailContent(template, data || {});
      emailHtml = content.html;
      emailSubject = content.subject;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ThermoDMR <noreply@thermodmr.com>',
        to: [to],
        subject: emailSubject,
        html: emailHtml,
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

  const header = `<div style="${headerStyle}"><h1 style="color:#fff; margin: 0; font-size: 20px;">ThermoDMR</h1></div>`;
  const footer = `<div style="${footerStyle}"><p style="color:#9ca3af; font-size: 12px; margin: 0;">© ThermoDMR · <a href="https://thermodmr.com" style="color:#6b7280;">thermodmr.com</a></p></div>`;

  const templates: Record<string, { subject: string; html: string }> = {
    ordine_pronto: {
      subject: `Il tuo ordine #${data.orderNumber} è pronto`,
      html: `<div style="${baseStyle}">${header}<div style="${bodyStyle}"><h2 style="color:#111;">Ordine pronto</h2><p>Gentile ${data.clientName},</p><p>Il tuo ordine <strong>#${data.orderNumber}</strong> è pronto.</p>${data.details ? `<p>${data.details}</p>` : ''}<p>Cordiali saluti,<br/>Il team ThermoDMR</p></div>${footer}</div>`,
    },
    sollecito_pagamento: {
      subject: `Sollecito pagamento — Ordine #${data.orderNumber}`,
      html: `<div style="${baseStyle}">${header}<div style="${bodyStyle}"><h2 style="color:#111;">Promemoria pagamento</h2><p>Gentile ${data.clientName},</p><p>Importo in sospeso per l'ordine <strong>#${data.orderNumber}</strong>: <strong>€${data.amount}</strong>.</p>${data.dueDate ? `<p>Scadenza: ${data.dueDate}</p>` : ''}<p>Cordiali saluti,<br/>Il team ThermoDMR</p></div>${footer}</div>`,
    },
    benvenuto_rivenditore: {
      subject: `Benvenuto in ThermoDMR — Le tue credenziali`,
      html: `<div style="${baseStyle}">${header}<div style="${bodyStyle}"><h2 style="color:#111;">Benvenuto!</h2><p>Gentile ${data.name},</p><p>Email: ${data.email}<br/>Password temporanea: <code>${data.tempPassword}</code></p><p><a href="https://app.thermodmr.com/auth" style="background:#111;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;">Accedi ora</a></p><p>Cordiali saluti,<br/>Il team ThermoDMR</p></div>${footer}</div>`,
    },
    ordine_confermato: {
      subject: `Ordine #${data.orderNumber} confermato`,
      html: `<div style="${baseStyle}">${header}<div style="${bodyStyle}"><h2 style="color:#111;">Ordine confermato</h2><p>Gentile ${data.clientName},</p><p>L'ordine <strong>#${data.orderNumber}</strong> è stato confermato.${data.estimatedDelivery ? ` Consegna stimata: ${data.estimatedDelivery}.` : ''}</p><p>Cordiali saluti,<br/>Il team ThermoDMR</p></div>${footer}</div>`,
    },
  };

  return templates[template] ?? { subject: 'Notifica ThermoDMR', html: `<p>${JSON.stringify(data)}</p>` };
}
