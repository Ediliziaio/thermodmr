import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CommercialeStats } from "./useCommerciali";

const PAGE_SIZE = 20;

export const useCommercialiInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["commerciali-infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      // Query ottimizzata: usa la view con statistiche pre-aggregate
      const { data: commerciali, error, count } = await supabase
        .from("commerciali_with_stats")
        .select("*", { count: "exact" })
        .range(from, to);

      if (error) throw error;

      // La view contiene già tutte le statistiche aggregate
      const commercialiWithStats = (commerciali || []).map((commerciale) => ({
        id: commerciale.id,
        display_name: commerciale.display_name,
        email: commerciale.email,
        is_active: commerciale.is_active,
        dealers_count: commerciale.dealers_count,
        ordini_count: commerciale.ordini_count,
        fatturato_totale: commerciale.fatturato_totale,
        provvigioni_dovute: commerciale.provvigioni_dovute,
        provvigioni_liquidate: commerciale.provvigioni_liquidate,
      })) as CommercialeStats[];

      return {
        data: commercialiWithStats,
        nextPage: commerciali && commerciali.length === PAGE_SIZE ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 10 * 60 * 1000, // 10 minuti
  });
};