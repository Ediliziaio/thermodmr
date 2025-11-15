import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface CommercialeStats {
  id: string;
  display_name: string;
  email: string;
  is_active: boolean;
  dealers_count: number;
  ordini_count: number;
  fatturato_totale: number;
  provvigioni_dovute: number;
  provvigioni_liquidate: number;
}

export const useCommercialeById = (commercialeId?: string) => {
  return useQuery({
    queryKey: ["commerciale", commercialeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id,
          display_name,
          email,
          is_active,
          user_roles!inner(role)
        `)
        .eq("id", commercialeId!)
        .eq("user_roles.role", "commerciale")
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!commercialeId,
  });
};

export const useUpdateCommercialeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commercialeId,
      isActive,
    }: {
      commercialeId: string;
      isActive: boolean;
    }) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ is_active: isActive })
        .eq("id", commercialeId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commerciali-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["commerciale"] });
      toast({
        title: "Stato aggiornato",
        description: "Lo stato del commerciale è stato aggiornato con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare lo stato del commerciale.",
        variant: "destructive",
      });
      console.error("Error updating commerciale status:", error);
    },
  });
};

export const useAssignDealerToCommerciale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      dealerId,
      commercialeId,
    }: {
      dealerId: string;
      commercialeId: string;
    }) => {
      const { data, error } = await supabase
        .from("dealers")
        .update({ commerciale_owner_id: commercialeId })
        .eq("id", dealerId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealers-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["commerciali-infinite"] });
      toast({
        title: "Assegnazione completata",
        description: "Il rivenditore è stato assegnato con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile assegnare il rivenditore.",
        variant: "destructive",
      });
      console.error("Error assigning dealer:", error);
    },
  });
};

export const useCreateCommerciale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      display_name: string;
    }) => {
      const { data: result, error } = await supabase.functions.invoke(
        "create-commerciale",
        { body: data }
      );

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commerciali-infinite"] });
      toast({
        title: "Commerciale creato",
        description: "Il commerciale è stato creato con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile creare il commerciale.",
        variant: "destructive",
      });
      console.error("Error creating commerciale:", error);
    },
  });
};

export const useUpdateCommerciale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      commerciale_id: string;
      email?: string;
      display_name?: string;
      password?: string;
    }) => {
      const { data: result, error } = await supabase.functions.invoke(
        "update-commerciale",
        { body: data }
      );

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commerciali-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["commerciale"] });
      toast({
        title: "Commerciale aggiornato",
        description: "Il commerciale è stato aggiornato con successo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare il commerciale.",
        variant: "destructive",
      });
      console.error("Error updating commerciale:", error);
    },
  });
};

export const useDeleteCommerciale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      commerciale_id: string;
      transfer_to_commerciale_id: string;
    }) => {
      const { data: result, error } = await supabase.functions.invoke(
        "delete-commerciale",
        { body: data }
      );

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commerciali-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["dealers-infinite"] });
      toast({
        title: "Commerciale eliminato",
        description: "Il commerciale è stato eliminato e i rivenditori trasferiti.",
      });
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: "Impossibile eliminare il commerciale.",
        variant: "destructive",
      });
      console.error("Error deleting commerciale:", error);
    },
  });
};
