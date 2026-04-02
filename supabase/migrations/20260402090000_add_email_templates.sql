-- Email template builder: persiste design Unlayer + HTML compilato
CREATE TABLE IF NOT EXISTS public.email_templates (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_key TEXT UNIQUE NOT NULL,
  name         TEXT NOT NULL,
  subject      TEXT NOT NULL DEFAULT '',
  design       JSONB,                     -- JSON design Unlayer (per re-caricare l'editor)
  html         TEXT,                      -- HTML compilato con {{variabili}}
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Aggiorna updated_at automaticamente
CREATE OR REPLACE FUNCTION public.set_email_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS email_templates_updated_at ON public.email_templates;
CREATE TRIGGER email_templates_updated_at
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW EXECUTE FUNCTION public.set_email_templates_updated_at();

-- RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_read_email_templates"
  ON public.email_templates FOR SELECT
  TO authenticated USING (true);

-- Usa public.has_role() con cast esplicito a app_role (enum del progetto)
CREATE POLICY "super_admin_write_email_templates"
  ON public.email_templates FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'::app_role));
