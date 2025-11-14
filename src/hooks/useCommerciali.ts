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

export const useCommerciali = () => {
  return useQuery({
    queryKey: ["commerciali"],
    queryFn: async () => {
      // Fetch commerciali with their roles
      const { data: commerciali, error: commercialiError } = await supabase
        .from("profiles")
        .select(`
          id,
          display_name,
          email,
          is_active,
          user_roles!inner(role)
        `)
        .eq("user_roles.role", "commerciale");

      if (commercialiError) throw commercialiError;

      // For each commerciale, fetch statistics
      const commercialiWithStats = await Promise.all(
        commerciali.map(async (commerciale) => {
          // Count dealers
          const { count: dealersCount } = await supabase
            .from("dealers")
            .select("*", { count: "exact", head: true })
            .eq("commerciale_owner_id", commerciale.id);

          // Get orders statistics
          const { data: orders } = await supabase
            .from("orders")
            .select("importo_totale")
            .eq("commerciale_id", commerciale.id);

          const ordiniCount = orders?.length || 0;
          const fatturatoTotale = orders?.reduce((sum, o) => sum + Number(o.importo_totale), 0) || 0;

          // Get commissions statistics
          const { data: commissions } = await supabase
            .from("commissions")
            .select("importo_calcolato, stato_liquidazione")
            .eq("commerciale_id", commerciale.id);

          const provvigioniDovute = commissions
            ?.filter((c) => c.stato_liquidazione === "dovuta")
            .reduce((sum, c) => sum + Number(c.importo_calcolato), 0) || 0;

          const provvigioniLiquidate = commissions
            ?.filter((c) => c.stato_liquidazione === "liquidata")
            .reduce((sum, c) => sum + Number(c.importo_calcolato), 0) || 0;

          return {
            id: commerciale.id,
            display_name: commerciale.display_name,
            email: commerciale.email,
            is_active: commerciale.is_active,
            dealers_count: dealersCount || 0,
            ordini_count: ordiniCount,
            fatturato_totale: fatturatoTotale,
            provvigioni_dovute: provvigioniDovute,
            provvigioni_liquidate: provvigioniLiquidate,
          } as CommercialeStats;
        })
      );

      return commercialiWithStats;
    },
  });
};

export const useCommercialeById = (commercialeId?: string) => {
  return useQuery({
    queryKey: ["commerciale", commercialeId],
    queryFn: async () => {
      if (!commercialeId) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", commercialeId)
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
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ is_active })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commerciali"] });
      toast({
        title: "Stato aggiornato",
        description: "Lo stato del commerciale è stato aggiornato con successo.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile aggiornare lo stato: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useAssignDealerToCommerciale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      dealerId, 
      commercialeId 
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
      queryClient.invalidateQueries({ queryKey: ["commerciali"] });
      queryClient.invalidateQueries({ queryKey: ["dealers"] });
      toast({
        title: "Dealer riassegnato",
        description: "Il dealer è stato riassegnato con successo.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile riassegnare il dealer: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};
