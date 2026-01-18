import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UpcomingDeadline {
  order_id: string;
  dealer_name: string;
  data_consegna: string;
  giorni_rimanenti: number;
  stato: string;
  importo_residuo: number;
}

interface UseUpcomingDeadlinesOptions {
  daysAhead?: number;
  limit?: number;
  commercialeId?: string | null;
}

export const useUpcomingDeadlines = (options: UseUpcomingDeadlinesOptions = {}) => {
  const { daysAhead = 7, limit = 10, commercialeId = null } = options;

  return useQuery({
    queryKey: ["upcoming-deadlines", daysAhead, limit, commercialeId],
    queryFn: async (): Promise<UpcomingDeadline[]> => {
      const { data, error } = await supabase.rpc("get_upcoming_deadlines", {
        p_days_ahead: daysAhead,
        p_limit: limit,
        p_commerciale_id: commercialeId,
      });

      if (error) throw error;

      // La funzione RPC ritorna un jsonb_agg che può essere null se non ci sono risultati
      if (!data) return [];
      return data as unknown as UpcomingDeadline[];
    },
    staleTime: 5 * 60 * 1000, // 5 minuti
    gcTime: 10 * 60 * 1000, // 10 minuti
  });
};
