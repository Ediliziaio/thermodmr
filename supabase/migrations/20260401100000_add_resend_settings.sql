-- Add Resend email integration settings
INSERT INTO public.settings (key, value, category, description) VALUES
  ('resend_api_key', '""', 'integration', 'Resend API key per invio email transazionali'),
  ('resend_from_name', '"ThermoDMR"', 'integration', 'Nome mittente per email Resend'),
  ('resend_from_email', '"noreply@thermodmr.com"', 'integration', 'Indirizzo mittente per email Resend')
ON CONFLICT (key) DO NOTHING;
