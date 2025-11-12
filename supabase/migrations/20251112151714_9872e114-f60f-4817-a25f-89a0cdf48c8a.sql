-- Fix search_path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add RLS policies for clients table
CREATE POLICY "Users can view clients for orders they can see"
  ON public.clients FOR SELECT
  USING (
    dealer_id IN (SELECT id FROM public.dealers)
  );

CREATE POLICY "Users can insert clients for their dealers"
  ON public.clients FOR INSERT
  WITH CHECK (
    dealer_id IN (
      SELECT id FROM public.dealers 
      WHERE commerciale_owner_id = auth.uid() 
      OR id IN (SELECT dealer_id FROM public.orders WHERE creato_da_user_id = auth.uid())
    )
  );

CREATE POLICY "Super admins can manage all clients"
  ON public.clients FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));