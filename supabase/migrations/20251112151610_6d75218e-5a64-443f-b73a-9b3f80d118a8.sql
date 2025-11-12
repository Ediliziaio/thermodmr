-- Create enum types
CREATE TYPE public.app_role AS ENUM ('super_admin', 'commerciale', 'rivenditore');
CREATE TYPE public.order_status AS ENUM ('da_confermare', 'da_pagare_acconto', 'in_lavorazione', 'da_consegnare', 'consegnato');
CREATE TYPE public.payment_type AS ENUM ('acconto', 'saldo', 'parziale');
CREATE TYPE public.commission_base AS ENUM ('totale', 'margine', 'personalizzata');
CREATE TYPE public.liquidation_status AS ENUM ('dovuta', 'liquidata');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create dealers table
CREATE TABLE public.dealers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ragione_sociale TEXT NOT NULL,
  p_iva TEXT NOT NULL,
  codice_fiscale TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  indirizzo TEXT NOT NULL,
  citta TEXT NOT NULL,
  cap TEXT NOT NULL,
  provincia TEXT NOT NULL,
  note TEXT,
  commerciale_owner_id UUID NOT NULL REFERENCES public.profiles(id),
  commissione_personalizzata DECIMAL(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;

-- Create clients table
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id UUID NOT NULL REFERENCES public.dealers(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cognome TEXT NOT NULL,
  email TEXT,
  telefono TEXT,
  indirizzo TEXT,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create orders table
CREATE TABLE public.orders (
  id TEXT PRIMARY KEY,
  dealer_id UUID NOT NULL REFERENCES public.dealers(id),
  commerciale_id UUID NOT NULL REFERENCES public.profiles(id),
  creato_da_user_id UUID NOT NULL REFERENCES public.profiles(id),
  cliente_finale_id UUID REFERENCES public.clients(id),
  stato order_status NOT NULL DEFAULT 'da_confermare',
  data_inserimento TIMESTAMPTZ NOT NULL DEFAULT now(),
  data_consegna_prevista DATE,
  importo_totale DECIMAL(12,2) NOT NULL DEFAULT 0,
  importo_acconto DECIMAL(12,2) NOT NULL DEFAULT 0,
  note_interna TEXT,
  note_rivenditore TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create order_lines table
CREATE TABLE public.order_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ordine_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  categoria TEXT NOT NULL,
  descrizione TEXT NOT NULL,
  quantita INTEGER NOT NULL DEFAULT 1,
  prezzo_unitario DECIMAL(12,2) NOT NULL,
  sconto DECIMAL(5,2) NOT NULL DEFAULT 0,
  iva DECIMAL(5,2) NOT NULL DEFAULT 22,
  totale_riga DECIMAL(12,2) NOT NULL,
  misure JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.order_lines ENABLE ROW LEVEL SECURITY;

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ordine_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  tipo payment_type NOT NULL,
  importo DECIMAL(12,2) NOT NULL,
  data_pagamento DATE NOT NULL,
  metodo TEXT NOT NULL,
  riferimento TEXT,
  ricevuta_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create attachments table
CREATE TABLE public.attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ordine_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  uploaded_by_user_id UUID NOT NULL REFERENCES public.profiles(id),
  nome_file TEXT NOT NULL,
  tipo_mime TEXT NOT NULL,
  url TEXT NOT NULL,
  dimensione INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;

-- Create commissions table
CREATE TABLE public.commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ordine_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  commerciale_id UUID NOT NULL REFERENCES public.profiles(id),
  base_calcolo commission_base NOT NULL DEFAULT 'totale',
  percentuale DECIMAL(5,2) NOT NULL DEFAULT 3.0,
  importo_calcolato DECIMAL(12,2) NOT NULL,
  stato_liquidazione liquidation_status NOT NULL DEFAULT 'dovuta',
  data_liquidazione DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

-- Create kpi_snapshots table
CREATE TABLE public.kpi_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  periodo TEXT NOT NULL,
  commerciale_id UUID REFERENCES public.profiles(id),
  dealer_id UUID REFERENCES public.dealers(id),
  ordini_count INTEGER NOT NULL DEFAULT 0,
  importo_totale DECIMAL(12,2) NOT NULL DEFAULT 0,
  acconti_totali DECIMAL(12,2) NOT NULL DEFAULT 0,
  incassato_totale DECIMAL(12,2) NOT NULL DEFAULT 0,
  consegnati_count INTEGER NOT NULL DEFAULT 0,
  tasso_conversione DECIMAL(5,2) NOT NULL DEFAULT 0,
  ticket_medio DECIMAL(12,2) NOT NULL DEFAULT 0,
  giorni_lead_2_consegna INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.kpi_snapshots ENABLE ROW LEVEL SECURITY;

-- Create audit_log table
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  azione TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$;

-- Trigger for auto-creating profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dealers_updated_at BEFORE UPDATE ON public.dealers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_commissions_updated_at BEFORE UPDATE ON public.commissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Super admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for dealers
CREATE POLICY "Super admins can view all dealers"
  ON public.dealers FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Commerciali can view their assigned dealers"
  ON public.dealers FOR SELECT
  USING (
    public.has_role(auth.uid(), 'commerciale') 
    AND commerciale_owner_id = auth.uid()
  );

CREATE POLICY "Rivenditori can view their own dealer"
  ON public.dealers FOR SELECT
  USING (
    public.has_role(auth.uid(), 'rivenditore')
    AND id IN (
      SELECT dealer_id FROM public.orders WHERE creato_da_user_id = auth.uid()
    )
  );

CREATE POLICY "Super admins can manage dealers"
  ON public.dealers FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Commerciali can insert dealers"
  ON public.dealers FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'commerciale')
    AND commerciale_owner_id = auth.uid()
  );

-- RLS Policies for orders
CREATE POLICY "Super admins can view all orders"
  ON public.orders FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Commerciali can view orders for their dealers"
  ON public.orders FOR SELECT
  USING (
    public.has_role(auth.uid(), 'commerciale')
    AND commerciale_id = auth.uid()
  );

CREATE POLICY "Rivenditori can view their own orders"
  ON public.orders FOR SELECT
  USING (
    public.has_role(auth.uid(), 'rivenditore')
    AND creato_da_user_id = auth.uid()
  );

CREATE POLICY "Super admins can manage all orders"
  ON public.orders FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Commerciali and Rivenditori can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (
    (public.has_role(auth.uid(), 'commerciale') OR public.has_role(auth.uid(), 'rivenditore'))
    AND creato_da_user_id = auth.uid()
  );

CREATE POLICY "Commerciali can update their dealers' orders"
  ON public.orders FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'commerciale')
    AND commerciale_id = auth.uid()
  );

-- RLS Policies for order_lines
CREATE POLICY "Users can view order lines for orders they can see"
  ON public.order_lines FOR SELECT
  USING (
    ordine_id IN (SELECT id FROM public.orders)
  );

CREATE POLICY "Users can manage order lines for orders they created"
  ON public.order_lines FOR ALL
  USING (
    ordine_id IN (
      SELECT id FROM public.orders WHERE creato_da_user_id = auth.uid()
    )
  );

CREATE POLICY "Super admins can manage all order lines"
  ON public.order_lines FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for payments
CREATE POLICY "Users can view payments for orders they can see"
  ON public.payments FOR SELECT
  USING (
    ordine_id IN (SELECT id FROM public.orders)
  );

CREATE POLICY "Super admins can manage payments"
  ON public.payments FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Commerciali can insert payments for their orders"
  ON public.payments FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'commerciale')
    AND ordine_id IN (SELECT id FROM public.orders WHERE commerciale_id = auth.uid())
  );

-- RLS Policies for attachments
CREATE POLICY "Users can view attachments for orders they can see"
  ON public.attachments FOR SELECT
  USING (
    ordine_id IN (SELECT id FROM public.orders)
  );

CREATE POLICY "Users can upload attachments to their orders"
  ON public.attachments FOR INSERT
  WITH CHECK (
    uploaded_by_user_id = auth.uid()
    AND ordine_id IN (SELECT id FROM public.orders WHERE creato_da_user_id = auth.uid())
  );

CREATE POLICY "Super admins can manage all attachments"
  ON public.attachments FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for commissions
CREATE POLICY "Commerciali can view their own commissions"
  ON public.commissions FOR SELECT
  USING (
    public.has_role(auth.uid(), 'commerciale')
    AND commerciale_id = auth.uid()
  );

CREATE POLICY "Super admins can view all commissions"
  ON public.commissions FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can manage commissions"
  ON public.commissions FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for KPI snapshots
CREATE POLICY "Commerciali can view their KPIs"
  ON public.kpi_snapshots FOR SELECT
  USING (
    public.has_role(auth.uid(), 'commerciale')
    AND commerciale_id = auth.uid()
  );

CREATE POLICY "Super admins can view all KPIs"
  ON public.kpi_snapshots FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for audit log
CREATE POLICY "Super admins can view audit log"
  ON public.audit_log FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users can view their own audit entries"
  ON public.audit_log FOR SELECT
  USING (auth.uid() = user_id);

-- Storage bucket for attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('order-attachments', 'order-attachments', false);

-- Storage policies
CREATE POLICY "Users can view attachments for their orders"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'order-attachments'
    AND (storage.foldername(name))[1] IN (
      SELECT ordine_id FROM public.attachments 
      WHERE ordine_id IN (SELECT id FROM public.orders)
    )
  );

CREATE POLICY "Users can upload attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'order-attachments'
    AND auth.uid() IS NOT NULL
  );

-- Create indexes for performance
CREATE INDEX idx_dealers_commerciale ON public.dealers(commerciale_owner_id);
CREATE INDEX idx_orders_dealer ON public.orders(dealer_id);
CREATE INDEX idx_orders_commerciale ON public.orders(commerciale_id);
CREATE INDEX idx_orders_stato ON public.orders(stato);
CREATE INDEX idx_order_lines_ordine ON public.order_lines(ordine_id);
CREATE INDEX idx_payments_ordine ON public.payments(ordine_id);
CREATE INDEX idx_attachments_ordine ON public.attachments(ordine_id);
CREATE INDEX idx_commissions_commerciale ON public.commissions(commerciale_id);
CREATE INDEX idx_commissions_ordine ON public.commissions(ordine_id);