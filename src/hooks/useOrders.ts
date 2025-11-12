import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface OrderWithDetails {
  id: string;
  dealer_id: string;
  cliente_finale_id: string | null;
  commerciale_id: string;
  creato_da_user_id: string;
  stato: string;
  data_inserimento: string;
  data_consegna_prevista: string | null;
  importo_totale: number;
  importo_acconto: number;
  note_rivenditore: string | null;
  note_interna: string | null;
  created_at: string;
  updated_at: string;
  dealers: {
    ragione_sociale: string;
    email: string;
  } | null;
  clients: {
    nome: string;
    cognome: string;
  } | null;
}

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          dealers (ragione_sociale, email),
          clients (nome, cognome)
        `)
        .order("data_inserimento", { ascending: false });

      if (error) throw error;
      return data as OrderWithDetails[];
    },
  });
};

export const useOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          dealers (
            id,
            ragione_sociale,
            p_iva,
            email,
            telefono,
            indirizzo,
            citta,
            provincia
          ),
          clients (
            id,
            nome,
            cognome,
            email,
            telefono,
            indirizzo
          )
        `)
        .eq("id", orderId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
  });
};

export const useOrderLines = (orderId: string) => {
  return useQuery({
    queryKey: ["order-lines", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order_lines")
        .select("*")
        .eq("ordine_id", orderId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
  });
};

export const useOrderPayments = (orderId: string) => {
  return useQuery({
    queryKey: ["payments", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("ordine_id", orderId)
        .order("data_pagamento", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
  });
};

export const useOrderAttachments = (orderId: string) => {
  return useQuery({
    queryKey: ["attachments", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("attachments")
        .select("*")
        .eq("ordine_id", orderId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from("orders")
        .update({ stato: status })
        .eq("id", orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Stato aggiornato",
        description: "Lo stato dell'ordine è stato aggiornato con successo",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare lo stato dell'ordine",
        variant: "destructive",
      });
      console.error("Error updating order status:", error);
    },
  });
};

export const useUpdateOrderNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      noteInterna,
      noteRivenditore,
    }: {
      orderId: string;
      noteInterna?: string;
      noteRivenditore?: string;
    }) => {
      const updates: any = {};
      if (noteInterna !== undefined) updates.note_interna = noteInterna;
      if (noteRivenditore !== undefined) updates.note_rivenditore = noteRivenditore;

      const { error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", orderId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders", variables.orderId] });
      toast({
        title: "Note aggiornate",
        description: "Le note sono state salvate con successo",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile salvare le note",
        variant: "destructive",
      });
      console.error("Error updating order notes:", error);
    },
  });
};
