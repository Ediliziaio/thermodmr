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

const generateOrderId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD-${year}${month}${day}-${random}`;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: {
      dealer_id: string;
      cliente_nome?: string;
      cliente_cognome?: string;
      cliente_email?: string;
      cliente_telefono?: string;
      cliente_indirizzo?: string;
      data_consegna_prevista?: string;
      importo_acconto: number;
      note_rivenditore?: string;
      note_interna?: string;
      order_lines: Array<{
        categoria: string;
        descrizione: string;
        quantita: number;
        prezzo_unitario: number;
        sconto: number;
        iva: number;
      }>;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non autenticato");

      // Get dealer's commerciale_id
      const { data: dealer, error: dealerError } = await supabase
        .from("dealers")
        .select("commerciale_owner_id")
        .eq("id", orderData.dealer_id)
        .single();

      if (dealerError) throw dealerError;

      // Create client if provided
      let clienteFinaleId: string | null = null;
      if (orderData.cliente_nome && orderData.cliente_cognome) {
        const { data: client, error: clientError } = await supabase
          .from("clients")
          .insert([
            {
              dealer_id: orderData.dealer_id,
              nome: orderData.cliente_nome,
              cognome: orderData.cliente_cognome,
              email: orderData.cliente_email || null,
              telefono: orderData.cliente_telefono || null,
              indirizzo: orderData.cliente_indirizzo || null,
            },
          ])
          .select()
          .single();

        if (clientError) throw clientError;
        clienteFinaleId = client.id;
      }

      // Calculate total
      const importoTotale = orderData.order_lines.reduce((sum, line) => {
        const subtotal = line.quantita * line.prezzo_unitario;
        const afterDiscount = subtotal * (1 - line.sconto / 100);
        const total = afterDiscount * (1 + line.iva / 100);
        return sum + total;
      }, 0);

      // Create order
      const orderId = generateOrderId();
      const { error: orderError } = await supabase.from("orders").insert([
        {
          id: orderId,
          dealer_id: orderData.dealer_id,
          cliente_finale_id: clienteFinaleId,
          commerciale_id: dealer.commerciale_owner_id,
          creato_da_user_id: user.id,
          stato: "da_confermare",
          data_consegna_prevista: orderData.data_consegna_prevista || null,
          importo_totale: importoTotale,
          importo_acconto: orderData.importo_acconto,
          note_rivenditore: orderData.note_rivenditore || null,
          note_interna: orderData.note_interna || null,
        },
      ]);

      if (orderError) throw orderError;

      // Create order lines
      const orderLines = orderData.order_lines.map((line) => {
        const subtotal = line.quantita * line.prezzo_unitario;
        const afterDiscount = subtotal * (1 - line.sconto / 100);
        const totaleRiga = afterDiscount * (1 + line.iva / 100);

        return {
          ordine_id: orderId,
          categoria: line.categoria,
          descrizione: line.descrizione,
          quantita: line.quantita,
          prezzo_unitario: line.prezzo_unitario,
          sconto: line.sconto,
          iva: line.iva,
          totale_riga: totaleRiga,
        };
      });

      const { error: linesError } = await supabase
        .from("order_lines")
        .insert(orderLines);

      if (linesError) throw linesError;

      return orderId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Ordine creato",
        description: "L'ordine è stato creato con successo",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile creare l'ordine",
        variant: "destructive",
      });
      console.error("Error creating order:", error);
    },
  });
};
