-- Drop and recreate foreign keys with ON UPDATE CASCADE for tables referencing orders.id

-- order_lines
ALTER TABLE public.order_lines DROP CONSTRAINT order_lines_ordine_id_fkey;
ALTER TABLE public.order_lines ADD CONSTRAINT order_lines_ordine_id_fkey
  FOREIGN KEY (ordine_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- payments
ALTER TABLE public.payments DROP CONSTRAINT payments_ordine_id_fkey;
ALTER TABLE public.payments ADD CONSTRAINT payments_ordine_id_fkey
  FOREIGN KEY (ordine_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- attachments
ALTER TABLE public.attachments DROP CONSTRAINT attachments_ordine_id_fkey;
ALTER TABLE public.attachments ADD CONSTRAINT attachments_ordine_id_fkey
  FOREIGN KEY (ordine_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- commissions
ALTER TABLE public.commissions DROP CONSTRAINT commissions_ordine_id_fkey;
ALTER TABLE public.commissions ADD CONSTRAINT commissions_ordine_id_fkey
  FOREIGN KEY (ordine_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- support_tickets
ALTER TABLE public.support_tickets DROP CONSTRAINT support_tickets_ordine_id_fkey;
ALTER TABLE public.support_tickets ADD CONSTRAINT support_tickets_ordine_id_fkey
  FOREIGN KEY (ordine_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;