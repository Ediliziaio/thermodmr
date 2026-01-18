import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { createAdminClient } from '../_shared/auth.ts';
import { createErrorResponse, createSuccessResponse, ApiError, HttpStatus } from '../_shared/errors.ts';
import { validateBody, z, CommonSchemas } from '../_shared/validation.ts';
import { sendEmailWithRetry, generateEmailTemplate } from '../_shared/email.ts';

// Input validation schema
const reassignmentSchema = z.object({
  dealerId: CommonSchemas.uuid,
  dealerName: z.string().trim().min(1).max(200),
  oldCommercialeId: CommonSchemas.uuid,
  oldCommercialeName: z.string().trim().min(1).max(200),
  newCommercialeId: CommonSchemas.uuid,
  newCommercialeName: z.string().trim().min(1).max(200),
  motivazione: z.string().trim().min(1).max(1000),
});

Deno.serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const supabaseAdmin = createAdminClient();

    // Validate input
    const data = await validateBody(req, reassignmentSchema);
    const {
      dealerName,
      oldCommercialeId,
      oldCommercialeName,
      newCommercialeId,
      newCommercialeName,
      motivazione,
    } = data;

    console.log(`Processing reassignment notification for dealer: ${dealerName}`);

    // Fetch email addresses
    const [oldProfile, newProfile] = await Promise.all([
      supabaseAdmin.from('profiles').select('email').eq('id', oldCommercialeId).single(),
      supabaseAdmin.from('profiles').select('email').eq('id', newCommercialeId).single(),
    ]);

    if (!oldProfile.data?.email || !newProfile.data?.email) {
      throw new ApiError('Could not fetch commerciale email addresses', HttpStatus.NOT_FOUND);
    }

    const motivazioneHtml = `
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #666;">Motivazione:</h3>
        <p style="margin-bottom: 0;">${motivazione}</p>
      </div>
    `;

    // Send emails in parallel with retry logic
    await Promise.all([
      // Email to old commerciale
      sendEmailWithRetry({
        to: [oldProfile.data.email],
        subject: `Dealer ${dealerName} riassegnato`,
        html: generateEmailTemplate(
          'Dealer Riassegnato',
          `Ciao <strong>${oldCommercialeName}</strong>,`,
          `<p>Il dealer <strong>${dealerName}</strong> è stato riassegnato da te a <strong>${newCommercialeName}</strong>.</p>${motivazioneHtml}`,
          'Se hai domande, contatta il tuo amministratore.'
        ),
      }),
      // Email to new commerciale
      sendEmailWithRetry({
        to: [newProfile.data.email],
        subject: `Nuovo dealer assegnato: ${dealerName}`,
        html: generateEmailTemplate(
          'Nuovo Dealer Assegnato',
          `Ciao <strong>${newCommercialeName}</strong>,`,
          `
            <p>Ti è stato assegnato un nuovo dealer: <strong>${dealerName}</strong></p>
            <p>Precedentemente gestito da: <strong>${oldCommercialeName}</strong></p>
            ${motivazioneHtml}
            <p>Puoi visualizzare i dettagli del dealer accedendo al sistema.</p>
          `,
          'Buon lavoro!'
        ),
      }),
    ]);

    console.log('Reassignment notification emails sent successfully');

    return createSuccessResponse({
      success: true,
      message: 'Notification emails sent successfully',
    });
  } catch (error) {
    return createErrorResponse(error);
  }
});
