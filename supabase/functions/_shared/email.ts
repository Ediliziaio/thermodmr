import { Resend } from 'https://esm.sh/resend@2.0.0';
import { ApiError, HttpStatus } from './errors.ts';

export interface EmailOptions {
  to: string[];
  subject: string;
  html: string;
  from?: string;
}

const DEFAULT_FROM = 'Sistema Gestione <onboarding@resend.dev>';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

/**
 * Send email with retry logic
 */
export const sendEmailWithRetry = async (
  options: EmailOptions,
  maxRetries: number = MAX_RETRIES
): Promise<void> => {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  
  if (!apiKey) {
    throw new ApiError('RESEND_API_KEY not configured', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  const resend = new Resend(apiKey);
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Sending email attempt ${attempt}/${maxRetries} to: ${options.to.join(', ')}`);
      
      const { error } = await resend.emails.send({
        from: options.from || DEFAULT_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('Email sent successfully');
      return;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown email error');
      console.error(`Email attempt ${attempt} failed:`, lastError.message);

      if (attempt < maxRetries) {
        const delay = RETRY_DELAY_MS * attempt;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new ApiError(
    `Failed to send email after ${maxRetries} attempts: ${lastError?.message}`,
    HttpStatus.INTERNAL_SERVER_ERROR
  );
};

/**
 * Generate HTML email template
 */
export const generateEmailTemplate = (
  title: string,
  greeting: string,
  content: string,
  footer?: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">${title}</h2>
      <p>${greeting}</p>
      ${content}
      ${footer ? `<p style="color: #666; font-size: 14px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">${footer}</p>` : ''}
    </div>
  `;
};
