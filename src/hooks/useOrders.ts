import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { TablesInsert } from "@/integrations/supabase/types";
import { useAuth } from "@/contexts/AuthContext";

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
      // Aggiorna tutti gli ordini in parallelo
      const updates = orderIds.map(orderId =>
        supabase
          .from("orders")
          .update({ stato: stato as any })
          .eq("id", orderId)
      );

      const results = await Promise.all(updates);
      
      // Controlla se ci sono errori
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw new Error(`${errors.length} ordini non sono stati aggiornati`);
      }

      return {
        success: results.length - errors.length,
        failed: errors.length,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
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
      // Elimina tutti gli ordini in parallelo
      // Le righe, pagamenti, allegati e provvigioni verranno eliminati automaticamente
      // grazie alle foreign key con ON DELETE CASCADE
      const deletes = orderIds.map(orderId =>
        supabase
          .from("orders")
          .delete()
          .eq("id", orderId)
      );

      const results = await Promise.all(deletes);
      
      // Controlla se ci sono errori
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw new Error(`${errors.length} ordini non sono stati eliminati`);
      }

      return {
        success: results.length - errors.length,
        failed: errors.length,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
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

const generatePreventivoId = async (): Promise<string> => {
  const year = new Date().getFullYear();
  const { data: last } = await supabase
    .from("orders")
    .select("id")
    .ilike("id", `PRV-${year}-%`)
    .order("id", { ascending: false })
    .limit(1)
    .single();

  let nextNumber = 1;
  if (last?.id) {
    const match = last.id.match(/PRV-\d{4}-(\d{4})/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }

  return `PRV-${year}-${nextNumber.toString().padStart(4, "0")}`;
};

const generateOrderId = async (): Promise<string> => {
  const year = new Date().getFullYear();
  const { data: lastOrder } = await supabase
    .from("orders")
    .select("id")
    .ilike("id", `ORD-${year}-%`)
    .order("id", { ascending: false })
    .limit(1)
    .single();

  let nextNumber = 1;
  if (lastOrder?.id) {
    const match = lastOrder.id.match(/ORD-\d{4}-(\d{4})/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }

  return `ORD-${year}-${nextNumber.toString().padStart(4, "0")}`;
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
      if (values.cliente_nome && values.cliente_cognome) {
        const { data: newClient, error: clientError } = await supabase
          .from("clients")
          .insert({
            dealer_id: values.dealer_id,
            nome: values.cliente_nome,
            cognome: values.cliente_cognome,
            email: values.cliente_email || null,
            telefono: values.cliente_telefono || null,
            indirizzo: values.cliente_indirizzo || null,
          })
          .select()
          .single();

        if (clientError) throw clientError;
        clienteFinaleId = newClient.id;
      }

      const orderId = await generateOrderId();
      const importoTotale = values.order_lines.reduce(
        (sum: number, line: any) => {
          const subtotal = line.quantita * line.prezzo_unitario;
          const afterDiscount = subtotal * (1 - line.sconto / 100);
          const total = afterDiscount * (1 + line.iva / 100);
          return sum + total;
        },
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
        stato: "da_confermare",
      };

      const { data: newOrder, error: orderError } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderLinesData = values.order_lines.map((line: any) => {
        const subtotal = line.quantita * line.prezzo_unitario;
        const afterDiscount = subtotal * (1 - line.sconto / 100);
        const total = afterDiscount * (1 + line.iva / 100);

        return {
          ordine_id: newOrder.id,
          categoria: line.categoria,
          descrizione: line.descrizione,
          quantita: line.quantita,
          prezzo_unitario: line.prezzo_unitario,
          sconto: line.sconto,
          iva: line.iva,
          totale_riga: total,
        };
      });

      const { error: linesError } = await supabase
        .from("order_lines")
        .insert(orderLinesData);

      if (linesError) throw linesError;

      return newOrder;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
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

export const useUpdateOrderLines = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, lines }: { orderId: string; lines: any[] }) => {
      // 1. Delete existing lines
      const { error: deleteError } = await supabase
        .from("order_lines")
        .delete()
        .eq("ordine_id", orderId);

      if (deleteError) throw deleteError;

      // 2. Insert new lines and calculate total
      let importoTotale = 0;
      const orderLinesData = lines.map((line: any) => {
        const subtotal = (line.quantita || 1) * (line.prezzoUnitario || 0);
        const afterDiscount = subtotal * (1 - (line.sconto || 0) / 100);
        const withIva = afterDiscount * (1 + (line.iva || 0) / 100);
        importoTotale += withIva;

        return {
          ordine_id: orderId,
          categoria: line.categoria || "Finestra",
          descrizione: line.descrizione || "",
          quantita: line.quantita || 1,
          prezzo_unitario: line.prezzoUnitario || 0,
          sconto: line.sconto || 0,
          iva: line.iva || 0,
          totale_riga: withIva,
        };
      });

      if (orderLinesData.length > 0) {
        const { error: insertError } = await supabase
          .from("order_lines")
          .insert(orderLinesData);

        if (insertError) throw insertError;
      }

      // 3. Update order total
      const { error: updateError } = await supabase
        .from("orders")
        .update({ importo_totale: importoTotale })
        .eq("id", orderId);

      if (updateError) throw updateError;

      return { orderId, importoTotale };
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
    }: {
      orderId: string;
      dataFineProduzione?: string | null;
      settimanaConsegna?: number | null;
      dataConsegnaPrevista?: string | null;
    }) => {
      const updateData: Record<string, any> = {};
      if (dataFineProduzione !== undefined) updateData.data_fine_produzione = dataFineProduzione;
      if (settimanaConsegna !== undefined) updateData.settimana_consegna = settimanaConsegna;
      if (dataConsegnaPrevista !== undefined) updateData.data_consegna_prevista = dataConsegnaPrevista;

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
      if (values.cliente_nome && values.cliente_cognome) {
        const { data: newClient, error: clientError } = await supabase
          .from("clients")
          .insert({
            dealer_id: values.dealer_id,
            nome: values.cliente_nome,
            cognome: values.cliente_cognome,
            email: values.cliente_email || null,
            telefono: values.cliente_telefono || null,
            indirizzo: values.cliente_indirizzo || null,
          })
          .select()
          .single();

        if (clientError) throw clientError;
        clienteFinaleId = newClient.id;
      }

      const preventivoId = await generatePreventivoId();
      const importoTotale = values.order_lines.reduce(
        (sum: number, line: any) => {
          const subtotal = line.quantita * line.prezzo_unitario;
          const afterDiscount = subtotal * (1 - line.sconto / 100);
          return sum + afterDiscount;
        },
        0
      );

      const orderData: TablesInsert<"orders"> = {
        id: preventivoId,
        dealer_id: values.dealer_id,
        commerciale_id: dealer.commerciale_owner_id,
        creato_da_user_id: user.id,
        cliente_finale_id: clienteFinaleId,
        data_scadenza_preventivo: values.data_scadenza_preventivo || null,
        importo_acconto: 0,
        importo_totale: importoTotale,
        note_rivenditore: values.note_rivenditore || null,
        note_interna: values.note_interna || null,
        stato: "preventivo",
      };

      const { data: newOrder, error: orderError } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderLinesData = values.order_lines.map((line: any) => {
        const subtotal = line.quantita * line.prezzo_unitario;
        const afterDiscount = subtotal * (1 - line.sconto / 100);

        return {
          ordine_id: newOrder.id,
          categoria: line.categoria,
          descrizione: line.descrizione,
          quantita: line.quantita,
          prezzo_unitario: line.prezzo_unitario,
          sconto: line.sconto,
          iva: line.iva,
          totale_riga: afterDiscount,
        };
      });

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
