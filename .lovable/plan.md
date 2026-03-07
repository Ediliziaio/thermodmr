

# Sistema Ticket Assistenza per Ordini

## Panoramica
Aggiungere un sistema di ticket assistenza collegato agli ordini. I rivenditori possono aprire ticket dall'ordine, allegando foto/file. Il Super Admin vede tutti i ticket in una sezione dedicata nella sidebar e li gestisce (risponde, cambia stato, chiude).

## Modifiche

### 1. Migrazione DB — Tabelle `support_tickets` e `ticket_messages`

```sql
-- Tabella ticket
CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ordine_id text NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  creato_da_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  oggetto text NOT NULL,
  stato text NOT NULL DEFAULT 'aperto', -- aperto, in_gestione, chiuso
  priorita text NOT NULL DEFAULT 'normale', -- bassa, normale, alta, urgente
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Messaggi/risposte nel ticket (chat-like)
CREATE TABLE public.ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  messaggio text NOT NULL,
  allegato_url text,
  allegato_nome text,
  allegato_tipo text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;

-- RLS: super_admin vede tutto, rivenditore vede i propri
CREATE POLICY "Super admins can manage all tickets" ON support_tickets FOR ALL USING (has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Users can view their own tickets" ON support_tickets FOR SELECT USING (creato_da_user_id = auth.uid());
CREATE POLICY "Users can create tickets" ON support_tickets FOR INSERT WITH CHECK (creato_da_user_id = auth.uid());

CREATE POLICY "Super admins can manage all messages" ON ticket_messages FOR ALL USING (has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Users can view messages for their tickets" ON ticket_messages FOR SELECT USING (
  ticket_id IN (SELECT id FROM support_tickets WHERE creato_da_user_id = auth.uid())
  OR has_role(auth.uid(), 'super_admin')
);
CREATE POLICY "Users can insert messages in their tickets" ON ticket_messages FOR INSERT WITH CHECK (
  user_id = auth.uid() AND (
    ticket_id IN (SELECT id FROM support_tickets WHERE creato_da_user_id = auth.uid())
    OR has_role(auth.uid(), 'super_admin')
  )
);

-- Realtime per notifiche
ALTER PUBLICATION supabase_realtime ADD TABLE public.support_tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ticket_messages;

-- Trigger updated_at
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

Storage: riutilizzare il bucket `order-attachments` esistente con sotto-path `tickets/`.

### 2. Hook `src/hooks/useTickets.ts`
- `useTicketsByOrder(orderId)` — lista ticket per un ordine
- `useAllTickets()` — tutti i ticket (per super_admin), con join su orders e dealers
- `useTicketMessages(ticketId)` — messaggi di un ticket
- `useCreateTicket()` — mutation per creare ticket
- `useCreateTicketMessage()` — mutation per aggiungere messaggio/allegato
- `useUpdateTicketStatus()` — mutation per cambiare stato (super_admin)

### 3. Componente `src/components/orders/TicketsSection.tsx`
- Sezione nell'OrderDetail (sotto Allegati), mostra lista ticket dell'ordine
- Pulsante "Nuovo Ticket" per rivenditori e super_admin
- Dialog per creare ticket con oggetto, priorità, messaggio iniziale e upload foto
- Click su ticket apre il dettaglio con chat

### 4. Componente `src/components/tickets/TicketDetailDialog.tsx`
- Dialog modale con conversazione tipo chat (messaggi ordinati cronologicamente)
- Ogni messaggio mostra: autore, data, testo, eventuale allegato (immagine inline o link download)
- Input in basso per rispondere + upload file
- Super Admin può cambiare stato del ticket (aperto → in_gestione → chiuso)

### 5. Pagina `src/pages/Assistenza.tsx`
- Tabella con tutti i ticket: ID ordine, oggetto, stato, priorità, rivenditore, data apertura
- Filtri per stato e priorità
- Badge con contatore ticket aperti
- Click su riga apre il TicketDetailDialog

### 6. `src/components/Layout.tsx` — Voce sidebar
- Aggiungere `{ name: "Assistenza", href: "/assistenza", icon: HeadphonesIcon, roles: ["super_admin"] }` nella navigation
- Badge con contatore ticket aperti (realtime)

### 7. `src/pages/OrderDetail.tsx`
- Aggiungere `<TicketsSection>` come nuovo tab o sezione dopo Allegati, sia per ordini che preventivi

### 8. `src/App.tsx` — Route
- Aggiungere route `/assistenza` protetta con Layout

### 9. Constants `src/lib/ticketConstants.ts`
- Stati ticket: `aperto`, `in_gestione`, `chiuso`
- Priorità: `bassa`, `normale`, `alta`, `urgente`
- Label e colori per badge

