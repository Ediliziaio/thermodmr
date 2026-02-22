
CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  azienda TEXT,
  email TEXT NOT NULL,
  telefono TEXT,
  messaggio TEXT NOT NULL,
  letto BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact request (public form)
CREATE POLICY "Anyone can insert contact requests"
ON public.contact_requests
FOR INSERT
WITH CHECK (true);

-- Only super admins can view contact requests
CREATE POLICY "Super admins can view contact requests"
ON public.contact_requests
FOR SELECT
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Only super admins can update contact requests
CREATE POLICY "Super admins can update contact requests"
ON public.contact_requests
FOR UPDATE
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Only super admins can delete contact requests
CREATE POLICY "Super admins can delete contact requests"
ON public.contact_requests
FOR DELETE
USING (has_role(auth.uid(), 'super_admin'::app_role));
