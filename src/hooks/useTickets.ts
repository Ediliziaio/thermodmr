import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface SupportTicket {
  id: string;
  ordine_id: string;
  creato_da_user_id: string;
  oggetto: string;
  stato: string;
  priorita: string;
  created_at: string;
  updated_at: string;
  profiles?: { display_name: string; email: string } | null;
  orders?: { dealer_id: string; dealers?: { ragione_sociale: string } | null } | null;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  user_id: string;
  messaggio: string;
  allegato_url: string | null;
  allegato_nome: string | null;
  allegato_tipo: string | null;
  created_at: string;
  profiles?: { display_name: string; email: string } | null;
}

export function useTicketsByOrder(orderId: string) {
  return useQuery({
    queryKey: ["tickets", "order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*, profiles:creato_da_user_id(display_name, email)")
        .eq("ordine_id", orderId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as SupportTicket[];
    },
    enabled: !!orderId,
  });
}

export function useAllTickets(filters?: { stato?: string; priorita?: string }) {
  return useQuery({
    queryKey: ["tickets", "all", filters],
    queryFn: async () => {
      let query = supabase
        .from("support_tickets")
        .select("*, profiles:creato_da_user_id(display_name, email), orders!inner(dealer_id, dealers(ragione_sociale))")
        .order("created_at", { ascending: false });

      if (filters?.stato) query = query.eq("stato", filters.stato);
      if (filters?.priorita) query = query.eq("priorita", filters.priorita);

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as SupportTicket[];
    },
  });
}

export function useOpenTicketsCount() {
  return useQuery({
    queryKey: ["tickets", "open-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("support_tickets")
        .select("*", { count: "exact", head: true })
        .neq("stato", "chiuso");
      if (error) throw error;
      return count || 0;
    },
    refetchInterval: 30000,
  });
}

export function useTicketMessages(ticketId: string) {
  return useQuery({
    queryKey: ["ticket-messages", ticketId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ticket_messages")
        .select("*, profiles:user_id(display_name, email)")
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as unknown as TicketMessage[];
    },
    enabled: !!ticketId,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ticket: {
      ordine_id: string;
      creato_da_user_id: string;
      oggetto: string;
      priorita: string;
      messaggio_iniziale: string;
      allegato?: { url: string; nome: string; tipo: string } | null;
    }) => {
      const { data: newTicket, error: ticketError } = await supabase
        .from("support_tickets")
        .insert({
          ordine_id: ticket.ordine_id,
          creato_da_user_id: ticket.creato_da_user_id,
          oggetto: ticket.oggetto,
          priorita: ticket.priorita,
        })
        .select()
        .single();
      if (ticketError) throw ticketError;

      const msgData: any = {
        ticket_id: newTicket.id,
        user_id: ticket.creato_da_user_id,
        messaggio: ticket.messaggio_iniziale,
      };
      if (ticket.allegato) {
        msgData.allegato_url = ticket.allegato.url;
        msgData.allegato_nome = ticket.allegato.nome;
        msgData.allegato_tipo = ticket.allegato.tipo;
      }
      const { error: msgError } = await supabase.from("ticket_messages").insert(msgData);
      if (msgError) throw msgError;

      return newTicket;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast({ title: "Ticket creato con successo" });
    },
    onError: () => {
      toast({ title: "Errore nella creazione del ticket", variant: "destructive" });
    },
  });
}

export function useCreateTicketMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (msg: {
      ticket_id: string;
      user_id: string;
      messaggio: string;
      allegato?: { url: string; nome: string; tipo: string } | null;
    }) => {
      const data: any = {
        ticket_id: msg.ticket_id,
        user_id: msg.user_id,
        messaggio: msg.messaggio,
      };
      if (msg.allegato) {
        data.allegato_url = msg.allegato.url;
        data.allegato_nome = msg.allegato.nome;
        data.allegato_tipo = msg.allegato.tipo;
      }
      const { error } = await supabase.from("ticket_messages").insert(data);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["ticket-messages", vars.ticket_id] });
    },
    onError: () => {
      toast({ title: "Errore nell'invio del messaggio", variant: "destructive" });
    },
  });
}

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ticketId, stato }: { ticketId: string; stato: string }) => {
      const { error } = await supabase
        .from("support_tickets")
        .update({ stato })
        .eq("id", ticketId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast({ title: "Stato ticket aggiornato" });
    },
    onError: () => {
      toast({ title: "Errore nell'aggiornamento dello stato", variant: "destructive" });
    },
  });
}
