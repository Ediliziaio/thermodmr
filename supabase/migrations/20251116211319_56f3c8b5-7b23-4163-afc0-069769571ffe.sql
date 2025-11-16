-- Abilita realtime per le tabelle principali della dashboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.commissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.dealers;