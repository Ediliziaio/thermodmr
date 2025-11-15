import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { DealerWithStats } from "./useDealers";

const PAGE_SIZE = 30;

export const useDealersInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["dealers-infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      // Query ottimizzata: usa la view con statistiche pre-aggregate
      const { data: dealers, error, count } = await supabase
        .from("dealers_with_stats")
        .select("*", { count: "exact" })
        .order("ragione_sociale", { ascending: true })
        .range(from, to);

      if (error) throw error;

      // La view contiene già orders_count e total_revenue
      const dealersWithStats = (dealers || []).map((dealer) => ({
        ...dealer,
        ordersCount: dealer.orders_count,
        totalRevenue: dealer.total_revenue,
      }));

      return {
        data: dealersWithStats as DealerWithStats[],
        nextPage: dealers && dealers.length === PAGE_SIZE ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 10 * 60 * 1000, // 10 minuti per dati più statici
  });
};