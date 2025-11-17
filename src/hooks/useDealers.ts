import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

// DealerWithStats usa i campi della view dealers_with_stats
export interface DealerWithStats extends Tables<"dealers"> {
  orders_count?: number;
  total_revenue?: number;
}

export const useCreateDealer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dealerData: TablesInsert<"dealers">) => {
      const { data, error } = await supabase
        .from("dealers")
        .insert(dealerData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealers-infinite"] });
      toast({
        title: "Rivenditore creato",
        description: "Il rivenditore è stato creato con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile creare il rivenditore.",
        variant: "destructive",
      });
      console.error("Error creating dealer:", error);
    },
  });
};

export const useUpdateDealer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...dealerData
    }: { id: string } & Partial<TablesInsert<"dealers">>) => {
      const { data, error } = await supabase
        .from("dealers")
        .update(dealerData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealers-infinite"] });
      toast({
        title: "Rivenditore aggiornato",
        description: "Il rivenditore è stato aggiornato con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare il rivenditore.",
        variant: "destructive",
      });
      console.error("Error updating dealer:", error);
    },
  });
};

export const useDeleteDealer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("dealers")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealers-infinite"] });
      toast({
        title: "Rivenditore eliminato",
        description: "Il rivenditore è stato eliminato con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile eliminare il rivenditore.",
        variant: "destructive",
      });
      console.error("Error deleting dealer:", error);
    },
  });
};
