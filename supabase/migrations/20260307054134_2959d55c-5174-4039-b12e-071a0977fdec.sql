
-- Tabella ticket assistenza
CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ordine_id text NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  creato_da_user_id uuid NOT NULL,
  oggetto text NOT NULL,
  stato text NOT NULL DEFAULT 'aperto',
  priorita text NOT NULL DEFAULT 'normale',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Messaggi/risposte nel ticket
CREATE TABLE public.ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  messaggio text NOT NULL,
  allegato_url text,
  allegato_nome text,
  allegato_tipo text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;

-- Ticket policies
CREATE POLICY "Super admins can manage all tickets" ON public.support_tickets FOR ALL TO authenticated USING (has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Users can view their own tickets" ON public.support_tickets FOR SELECT TO authenticated USING (creato_da_user_id = auth.uid());
CREATE POLICY "Users can create tickets" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (creato_da_user_id = auth.uid());

-- Message policies
CREATE POLICY "Super admins can manage all messages" ON public.ticket_messages FOR ALL TO authenticated USING (has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Users can view messages for their tickets" ON public.ticket_messages FOR SELECT TO authenticated USING (
  ticket_id IN (SELECT id FROM public.support_tickets WHERE creato_da_user_id = auth.uid())
);
CREATE POLICY "Users can insert messages in their tickets" ON public.ticket_messages FOR INSERT TO authenticated WITH CHECK (
  user_id = auth.uid() AND (
    ticket_id IN (SELECT id FROM public.support_tickets WHERE creato_da_user_id = auth.uid())
    OR has_role(auth.uid(), 'super_admin')
  )
);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.support_tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ticket_messages;

-- Trigger updated_at
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
