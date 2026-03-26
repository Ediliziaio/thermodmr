import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { TablesInsert } from "@/integrations/supabase/types";
import { useAuth } from "@/contexts/AuthContext";
import { calcLineTotal } from "@/lib/orderConstants";

// Re-export tipi centralizzati per retrocompatibilità
export type { OrderWithDetails, OrderWithPaymentStats } from "@/types/orders";

export const useOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          dealers (ragione_sociale, email, p_iva, telefono, indirizzo, citta, provincia, cap),
          clients (nome, cognome, email, telefono, indirizzo)
        `)
        .eq("id", orderId)
        .single();

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
    queryKey: ["order-payments", orderId],
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
    queryKey: ["order-attachments", orderId],
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
    mutationFn: async ({ orderId, stato }: { orderId: string; stato: string }) => {
      const { data, error } = await supabase
        .from("orders")
        .update({ stato: stato as any })
        .eq("id", orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
      queryClient.invalidateQueries({ queryKey: ["dealer-order-stats"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-deadlines"] });
      queryClient.invalidateQueries({ queryKey: ["orders-kpi"] });
      toast({
        title: "Stato aggiornato",
        description: "Lo stato dell'ordine è stato aggiornato con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare lo stato dell'ordine.",
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
      const { data, error } = await supabase
        .from("orders")
        .update({
          note_interna: noteInterna,
          note_rivenditore: noteRivenditore,
        })
        .eq("id", orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      toast({
        title: "Note aggiornate",
        description: "Le note dell'ordine sono state aggiornate con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare le note dell'ordine.",
        variant: "destructive",
      });
      console.error("Error updating order notes:", error);
    },
  });
};

export const useBulkUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderIds,
      stato
    }: {
      orderIds: string[];
      stato: string;
    }) => {
      if (orderIds.length === 0) return { success: 0, failed: 0 };

      const { error } = await supabase
        .from("orders")
        .update({ stato: stato as any })
        .in("id", orderIds);

      if (error) throw new Error(error.message);

      return { success: orderIds.length, failed: 0 };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders-kpi"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
      toast({
        title: "Aggiornamento completato",
        description: `${data.success} ${data.success === 1 ? 'ordine aggiornato' : 'ordini aggiornati'} con successo.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Impossibile aggiornare gli ordini.",
        variant: "destructive",
      });
    },
  });
};

export const useBulkDeleteOrders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderIds
    }: {
      orderIds: string[];
    }) => {
      if (orderIds.length === 0) return { success: 0, failed: 0 };

      const { error } = await supabase
        .from("orders")
        .delete()
        .in("id", orderIds);

      if (error) throw new Error(error.message);

      return { success: orderIds.length, failed: 0 };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders-kpi"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
      toast({
        title: "Eliminazione completata",
        description: `${data.success} ${data.success === 1 ? 'ordine eliminato' : 'ordini eliminati'} con successo.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Impossibile eliminare gli ordini.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateOrderId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ oldId, newId }: { oldId: string; newId: string }) => {
      const idRegex = /^ORD-\d{4}-\d{4}$/;
      if (!idRegex.test(newId)) {
        throw new Error("Formato ID non valido. Usa: ORD-YYYY-NNNN");
      }

      const { data: existing } = await supabase
        .from("orders")
        .select("id")
        .eq("id", newId)
        .single();

      if (existing) {
        throw new Error("Questo ID ordine esiste già");
      }

      const { data, error } = await supabase
        .from("orders")
        .update({ id: newId })
        .eq("id", oldId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
      toast({
        title: "ID aggiornato",
        description: `ID ordine aggiornato con successo a ${data.id}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Atomic ID generation via server-side sequence
export const generateOrderId = async (): Promise<string> => {
  const { data, error } = await supabase.rpc("generate_next_order_id", { p_prefix: "ORD" });
  if (error) throw error;
  return data as string;
};

const generatePreventivoId = async (): Promise<string> => {
  const { data, error } = await supabase.rpc("generate_next_order_id", { p_prefix: "PRV" });
  if (error) throw error;
  return data as string;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (values: any) => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data: dealer } = await supabase
        .from("dealers")
        .select("commerciale_owner_id")
        .eq("id", values.dealer_id)
        .single();

      if (!dealer) throw new Error("Dealer not found");

      let clienteFinaleId: string | null = null;
      const nomeCliente = values.cliente_nome?.trim();
      const cognomeCliente = values.cliente_cognome?.trim();
      if (nomeCliente && cognomeCliente) {
        const { data: newClient, error: clientError } = await supabase
          .from("clients")
          .insert({
            dealer_id: values.dealer_id,
            nome: nomeCliente,
            cognome: cognomeCliente,
            email: values.cliente_email?.trim() || null,
            telefono: values.cliente_telefono?.trim() || null,
            indirizzo: values.cliente_indirizzo?.trim() || null,
          })
          .select()
          .single();

        if (clientError) throw clientError;
        clienteFinaleId = newClient.id;
      }

      const orderId = await generateOrderId();
      const importoTotale = values.order_lines.reduce(
        (sum: number, line: any) => sum + calcLineTotal(line),
        0
      );

      const orderData: TablesInsert<"orders"> = {
        id: orderId,
        dealer_id: values.dealer_id,
        commerciale_id: dealer.commerciale_owner_id,
        creato_da_user_id: user.id,
        cliente_finale_id: clienteFinaleId,
        data_consegna_prevista: values.data_consegna_prevista || null,
        importo_acconto: values.importo_acconto || 0,
        importo_totale: importoTotale,
        note_rivenditore: values.note_rivenditore || null,
        note_interna: values.note_interna || null,
        modalita_pagamento: values.modalita_pagamento || null,
        stato: "da_confermare",
      };

      const { data: newOrder, error: orderError } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderLinesData = values.order_lines.map((line: any) => ({
        ordine_id: newOrder.id,
        categoria: line.categoria,
        descrizione: line.descrizione,
        quantita: line.quantita,
        prezzo_unitario: line.prezzo_unitario,
        sconto: line.sconto,
        iva: line.iva,
        totale_riga: calcLineTotal(line),
      }));

      const { error: linesError } = await supabase
        .from("order_lines")
        .insert(orderLinesData);

      if (linesError) throw linesError;

      return newOrder;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["orders-kpi"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
      toast({
        title: "Ordine creato",
        description: `Ordine ${data.id} creato con successo`,
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

// Atomic order lines update via server-side RPC
export const useUpdateOrderLines = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, lines }: { orderId: string; lines: any[] }) => {
      const linesJsonb = lines.map((line: any) => ({
        categoria: line.categoria || "Finestra",
        descrizione: line.descrizione || "",
        quantita: line.quantita || 1,
        prezzo_unitario: line.prezzoUnitario || 0,
        sconto: line.sconto || 0,
        iva: line.iva || 0,
      }));

      const { data, error } = await supabase.rpc("update_order_lines_atomic", {
        p_order_id: orderId,
        p_lines: linesJsonb,
      });

      if (error) throw error;
      return { orderId, importoTotale: (data as any)?.importo_totale };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["order", data.orderId] });
      queryClient.invalidateQueries({ queryKey: ["order-lines", data.orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      toast({
        title: "Righe aggiornate",
        description: "Le righe del preventivo sono state salvate con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile salvare le righe.",
        variant: "destructive",
      });
      console.error("Error updating order lines:", error);
    },
  });
};

export const useUpdateOrderDates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      dataFineProduzione,
      settimanaConsegna,
      dataConsegnaPrevista,
      modalitaPagamento,
    }: {
      orderId: string;
      dataFineProduzione?: string | null;
      settimanaConsegna?: number | null;
      dataConsegnaPrevista?: string | null;
      modalitaPagamento?: string | null;
    }) => {
      const updateData: Record<string, any> = {};
      if (dataFineProduzione !== undefined) updateData.data_fine_produzione = dataFineProduzione;
      if (settimanaConsegna !== undefined) updateData.settimana_consegna = settimanaConsegna;
      if (dataConsegnaPrevista !== undefined) updateData.data_consegna_prevista = dataConsegnaPrevista;
      if (modalitaPagamento !== undefined) updateData.modalita_pagamento = modalitaPagamento;

      const { data, error } = await supabase
        .from("orders")
        .update(updateData)
        .eq("id", orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-deadlines"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
      toast({
        title: "Date aggiornate",
        description: "Le date dell'ordine sono state aggiornate con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare le date dell'ordine.",
        variant: "destructive",
      });
      console.error("Error updating order dates:", error);
    },
  });
};

export const useCreatePreventivo = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (values: any) => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data: dealer } = await supabase
        .from("dealers")
        .select("commerciale_owner_id")
        .eq("id", values.dealer_id)
        .single();

      if (!dealer) throw new Error("Dealer not found");

      let clienteFinaleId: string | null = null;
      const nomeClientePrv = values.cliente_nome?.trim();
      const cognomeClientePrv = values.cliente_cognome?.trim();
      if (nomeClientePrv && cognomeClientePrv) {
        const { data: newClient, error: clientError } = await supabase
          .from("clients")
          .insert({
            dealer_id: values.dealer_id,
            nome: nomeClientePrv,
            cognome: cognomeClientePrv,
            email: values.cliente_email?.trim() || null,
            telefono: values.cliente_telefono?.trim() || null,
            indirizzo: values.cliente_indirizzo?.trim() || null,
          })
          .select()
          .single();

        if (clientError) throw clientError;
        clienteFinaleId = newClient.id;
      }

      const preventivoId = await generatePreventivoId();
      const importoTotale = values.order_lines.reduce(
        (sum: number, line: any) => sum + calcLineTotal(line),
        0
      );

      const orderData: TablesInsert<"orders"> = {
        id: preventivoId,
        dealer_id: values.dealer_id,
        commerciale_id: dealer.commerciale_owner_id,
        creato_da_user_id: user.id,
        cliente_finale_id: clienteFinaleId,
        data_scadenza_preventivo: values.data_scadenza_preventivo || null,
        riferimento_preventivo: values.riferimento_preventivo || null,
        importo_acconto: 0,
        importo_totale: importoTotale,
        note_rivenditore: values.note_rivenditore || null,
        note_interna: values.note_interna || null,
        modalita_pagamento: values.modalita_pagamento || null,
        stato: "preventivo",
      };

      const { data: newOrder, error: orderError } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderLinesData = values.order_lines.map((line: any) => ({
        ordine_id: newOrder.id,
        categoria: line.categoria,
        descrizione: line.descrizione,
        quantita: line.quantita,
        prezzo_unitario: line.prezzo_unitario,
        sconto: line.sconto,
        iva: line.iva,
        totale_riga: calcLineTotal(line),
      }));

      const { error: linesError } = await supabase
        .from("order_lines")
        .insert(orderLinesData);

      if (linesError) throw linesError;

      return newOrder;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["dealer-preventivi"] });
      toast({
        title: "Preventivo creato",
        description: `Preventivo ${data.id} creato con successo`,
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile creare il preventivo",
        variant: "destructive",
      });
      console.error("Error creating preventivo:", error);
    },
  });
};
