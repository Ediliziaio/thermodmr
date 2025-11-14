-- Fix critical RLS policy bypasses in clients, order_lines, payments, and attachments tables
-- These policies were checking if records exist instead of checking user permissions

-- 1. Fix clients table RLS policy
DROP POLICY IF EXISTS "Users can view clients for orders they can see" ON public.clients;

CREATE POLICY "Users can view clients for accessible dealers"
ON public.clients FOR SELECT
USING (
  dealer_id IN (
    SELECT id FROM public.dealers 
    WHERE commerciale_owner_id = auth.uid()
  )
  OR dealer_id IN (
    SELECT dealer_id FROM public.orders 
    WHERE creato_da_user_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'super_admin'::app_role)
);

-- 2. Fix order_lines table RLS policy
DROP POLICY IF EXISTS "Users can view order lines for orders they can see" ON public.order_lines;

CREATE POLICY "Users can view order lines for accessible orders"
ON public.order_lines FOR SELECT
USING (
  ordine_id IN (
    SELECT id FROM public.orders 
    WHERE commerciale_id = auth.uid() 
    OR creato_da_user_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'super_admin'::app_role)
);

-- 3. Fix payments table RLS policy
DROP POLICY IF EXISTS "Users can view payments for orders they can see" ON public.payments;

CREATE POLICY "Users can view payments for accessible orders"
ON public.payments FOR SELECT
USING (
  ordine_id IN (
    SELECT id FROM public.orders 
    WHERE commerciale_id = auth.uid() 
    OR creato_da_user_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'super_admin'::app_role)
);

-- 4. Fix attachments table RLS policy
DROP POLICY IF EXISTS "Users can view attachments for orders they can see" ON public.attachments;

CREATE POLICY "Users can view attachments for accessible orders"
ON public.attachments FOR SELECT
USING (
  ordine_id IN (
    SELECT id FROM public.orders 
    WHERE commerciale_id = auth.uid() 
    OR creato_da_user_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'super_admin'::app_role)
);