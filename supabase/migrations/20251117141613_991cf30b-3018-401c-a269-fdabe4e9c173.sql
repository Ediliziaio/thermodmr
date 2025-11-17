-- Create settings table for system configuration
CREATE TABLE IF NOT EXISTS public.settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  category text NOT NULL CHECK (category IN ('commission', 'order_numbering', 'pdf_template', 'integration', 'system')),
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Only super admins can manage settings
CREATE POLICY "Super admins can manage all settings"
ON public.settings
FOR ALL
USING (has_role(auth.uid(), 'super_admin'));

-- Trigger for updated_at
CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.settings (key, value, category, description) VALUES
  ('default_commission_percentage', '3.0', 'commission', 'Percentuale commissione di default per i commerciali'),
  ('commission_calculation_base', '"totale"', 'commission', 'Base di calcolo: totale o margine'),
  ('order_number_format', '"ORD-{YYYY}-{####}"', 'order_numbering', 'Formato numerazione ordini'),
  ('order_number_counter', '1', 'order_numbering', 'Contatore progressivo ordini'),
  ('order_number_prefix', '"ORD"', 'order_numbering', 'Prefisso numero ordine'),
  ('pdf_template_logo_url', '""', 'pdf_template', 'URL logo per PDF'),
  ('pdf_template_company_name', '"Azienda Serramenti"', 'pdf_template', 'Nome azienda per PDF'),
  ('pdf_template_company_address', '""', 'pdf_template', 'Indirizzo azienda per PDF'),
  ('smtp_enabled', 'false', 'integration', 'SMTP abilitato'),
  ('smtp_host', '""', 'integration', 'SMTP host'),
  ('smtp_port', '587', 'integration', 'SMTP port'),
  ('smtp_username', '""', 'integration', 'SMTP username'),
  ('smtp_from_email', '""', 'integration', 'Email mittente'),
  ('webhook_enabled', 'false', 'integration', 'Webhook abilitato'),
  ('webhook_url', '""', 'integration', 'URL webhook per notifiche')
ON CONFLICT (key) DO NOTHING;