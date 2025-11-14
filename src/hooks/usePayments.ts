import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type PaymentType = "acconto" | "saldo" | "parziale";

export interface NewPayment {
  ordineId: string;
  tipo: PaymentType;
  importo: number;
  dataPagamento: string;
  metodo: string;
  riferimento?: string;
}

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payment: NewPayment) => {
      const { data, error } = await supabase
        .from("payments")
        .insert({
          ordine_id: payment.ordineId,
          tipo: payment.tipo,
          importo: payment.importo,
          data_pagamento: payment.dataPagamento,
          metodo: payment.metodo,
          riferimento: payment.riferimento,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orderPayments"] });
      toast({
        title: "Pagamento registrato",
        description: "Il pagamento è stato registrato con successo.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile registrare il pagamento: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentId: string) => {
      const { error } = await supabase
        .from("payments")
        .delete()
        .eq("id", paymentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orderPayments"] });
      toast({
        title: "Pagamento eliminato",
        description: "Il pagamento è stato eliminato con successo.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile eliminare il pagamento: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};
