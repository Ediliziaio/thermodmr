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
  const wrap = (content: string) => `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ThermoDMR</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
        <!-- Header -->
        <tr>
          <td style="background:#111111;padding:32px 40px;border-radius:12px 12px 0 0;text-align:center;">
            <span style="color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">ThermoDMR</span>
            <br/>
            <span style="color:#9ca3af;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-top:4px;display:inline-block;">Gestione Rivenditori</span>
          </td>
        </tr>
        <!-- Body -->
        ${content}
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              © ${new Date().getFullYear()} ThermoDMR &nbsp;·&nbsp;
              <a href="https://thermodmr.com" style="color:#6b7280;text-decoration:none;">thermodmr.com</a>
              &nbsp;·&nbsp;
              <a href="https://thermodmr.com/privacy" style="color:#6b7280;text-decoration:none;">Privacy Policy</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

  const tableRow = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#6b7280;background:#f9fafb;border-bottom:1px solid #e5e7eb;width:40%;">${label}</td>
      <td style="padding:10px 16px;font-size:13px;color:#111;font-weight:600;border-bottom:1px solid #e5e7eb;">${value}</td>
    </tr>`;

  const ctaButton = (href: string, label: string) =>
    `<a href="${href}" style="display:inline-block;background:#111111;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;letter-spacing:0.3px;">${label}</a>`;

  const templates: Record<string, { subject: string; html: string }> = {
    ordine_pronto: {
      subject: `Il tuo ordine #${data.orderNumber} è pronto`,
      html: wrap(`
        <tr>
          <td style="background:#ffffff;padding:32px 40px;border:1px solid #e5e7eb;border-top:none;">
            <div style="margin-bottom:24px;">
              <span style="display:inline-block;background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 12px;border-radius:20px;">&#10003; PRONTO</span>
            </div>
            <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111;">Ordine pronto per la consegna</h2>
            <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Il tuo ordine è disponibile e pronto per essere ritirato o consegnato.</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">Gentile <strong>${data.clientName}</strong>,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Siamo lieti di informarti che il tuo ordine è <strong>pronto</strong> e in attesa di consegna.
              ${data.details ? `<br/><br/>${data.details}` : ''}
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:32px;">
              ${tableRow('Numero Ordine', `#${data.orderNumber}`)}
              ${tableRow('Stato', '<span style="color:#16a34a;font-weight:700;">Pronto per la consegna</span>')}
              ${data.details ? tableRow('Note', String(data.details)) : ''}
            </table>
            <p style="font-size:14px;color:#6b7280;margin:0;">Per qualsiasi informazione, contatta il nostro team.<br/>Cordiali saluti,<br/><strong style="color:#111;">Il team ThermoDMR</strong></p>
          </td>
        </tr>`),
    },

    ordine_confermato: {
      subject: `Ordine #${data.orderNumber} confermato`,
      html: wrap(`
        <tr>
          <td style="background:#ffffff;padding:32px 40px;border:1px solid #e5e7eb;border-top:none;">
            <div style="margin-bottom:24px;">
              <span style="display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 12px;border-radius:20px;">&#10003; CONFERMATO</span>
            </div>
            <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111;">Ordine confermato con successo</h2>
            <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Abbiamo ricevuto e confermato il tuo ordine.</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">Gentile <strong>${data.clientName}</strong>,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Il tuo ordine è stato <strong>confermato</strong> e verrà elaborato nei tempi previsti.
            </p>
            ${data.estimatedDelivery ? `
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#1d4ed8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Data di consegna stimata</p>
              <p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#1e3a8a;">${data.estimatedDelivery}</p>
            </div>` : ''}
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:32px;">
              ${tableRow('Numero Ordine', `#${data.orderNumber}`)}
              ${tableRow('Cliente', String(data.clientName))}
              ${data.estimatedDelivery ? tableRow('Consegna Stimata', `<strong style="color:#1d4ed8;">${data.estimatedDelivery}</strong>`) : ''}
              ${tableRow('Stato', '<span style="color:#1d4ed8;font-weight:700;">Confermato</span>')}
            </table>
            <p style="font-size:14px;color:#6b7280;margin:0;">Grazie per aver scelto ThermoDMR.<br/>Cordiali saluti,<br/><strong style="color:#111;">Il team ThermoDMR</strong></p>
          </td>
        </tr>`),
    },

    sollecito_pagamento: {
      subject: `Sollecito pagamento — Ordine #${data.orderNumber}`,
      html: wrap(`
        <tr>
          <td style="background:#ffffff;padding:32px 40px;border:1px solid #e5e7eb;border-top:none;">
            <div style="margin-bottom:24px;">
              <span style="display:inline-block;background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 12px;border-radius:20px;">! PAGAMENTO IN SOSPESO</span>
            </div>
            <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111;">Promemoria pagamento</h2>
            <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Ti ricordiamo che è presente un importo in sospeso.</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">Gentile <strong>${data.clientName}</strong>,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Risulta ancora un pagamento in sospeso relativo all'ordine indicato di seguito.
              Ti invitiamo a procedere con il saldo al più presto.
            </p>
            <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:20px;text-align:center;margin-bottom:24px;">
              <p style="margin:0;font-size:12px;color:#dc2626;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Importo dovuto</p>
              <p style="margin:8px 0 0;font-size:36px;font-weight:800;color:#dc2626;">€${data.amount}</p>
              ${data.dueDate ? `<p style="margin:8px 0 0;font-size:13px;color:#ef4444;">Scadenza: <strong>${data.dueDate}</strong></p>` : ''}
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:32px;">
              ${tableRow('Numero Ordine', `#${data.orderNumber}`)}
              ${tableRow('Cliente', String(data.clientName))}
              ${tableRow('Importo', `<strong style="color:#dc2626;">€${data.amount}</strong>`)}
              ${data.dueDate ? tableRow('Scadenza', `<strong style="color:#dc2626;">${data.dueDate}</strong>`) : ''}
            </table>
            <p style="font-size:14px;color:#6b7280;margin:0;">Per informazioni sui pagamenti, contatta il nostro ufficio amministrativo.<br/>Cordiali saluti,<br/><strong style="color:#111;">Il team ThermoDMR</strong></p>
          </td>
        </tr>`),
    },

    benvenuto_rivenditore: {
      subject: `Benvenuto in ThermoDMR — Le tue credenziali`,
      html: wrap(`
        <tr>
          <td style="background:#ffffff;padding:32px 40px;border:1px solid #e5e7eb;border-top:none;">
            <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111;">Benvenuto in ThermoDMR!</h2>
            <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Il tuo account rivenditore è stato creato con successo.</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">Gentile <strong>${data.name}</strong>,</p>
            <p style="font-size:15px;color:#374151;margin:0 0 24px;">
              Siamo felici di accoglierti come nuovo rivenditore ThermoDMR.
              Di seguito trovi le tue credenziali di accesso al portale.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:24px;">
              <tr><td colspan="2" style="padding:12px 16px;background:#111;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Credenziali di accesso</td></tr>
              ${tableRow('Email', String(data.email))}
              ${tableRow('Password temporanea', `<code style="background:#f3f4f6;padding:2px 8px;border-radius:4px;font-family:monospace;font-size:13px;">${data.tempPassword}</code>`)}
            </table>
            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:14px 16px;margin-bottom:32px;">
              <p style="margin:0;font-size:13px;color:#92400e;">
                <strong>Importante:</strong> Per sicurezza, ti consigliamo di cambiare la password al primo accesso.
              </p>
            </div>
            <div style="text-align:center;margin-bottom:32px;">
              ${ctaButton('https://app.thermodmr.com/auth', 'Accedi al Portale Rivenditore')}
            </div>
            <p style="font-size:14px;color:#6b7280;margin:0;">Per assistenza o domande, contatta il nostro team.<br/>Cordiali saluti,<br/><strong style="color:#111;">Il team ThermoDMR</strong></p>
          </td>
        </tr>`),
    },
  };

  return templates[template] ?? { subject: 'Notifica ThermoDMR', html: wrap(`<tr><td style="background:#fff;padding:32px 40px;border:1px solid #e5e7eb;border-top:none;"><p style="font-size:15px;color:#374151;">${JSON.stringify(data)}</p></td></tr>`) };
}
