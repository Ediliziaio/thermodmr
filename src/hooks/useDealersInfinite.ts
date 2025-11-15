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

      const { data: dealers, error, count } = await supabase
        .from("dealers")
        .select("*", { count: "exact" })
        .order("ragione_sociale", { ascending: true })
        .range(from, to);

      if (error) throw error;

      // Ottieni statistiche per i dealers di questa pagina
      const dealersWithStats = await Promise.all(
        (dealers || []).map(async (dealer) => {
          const { data: orders } = await supabase
            .from("orders")
            .select("importo_totale")
            .eq("dealer_id", dealer.id);

          const ordersCount = orders?.length || 0;
          const totalRevenue =
            orders?.reduce((sum, order) => sum + (order.importo_totale || 0), 0) || 0;

          return {
            ...dealer,
            ordersCount,
            totalRevenue,
          };
        })
      );

      return {
        data: dealersWithStats as DealerWithStats[],
        nextPage: dealers.length === PAGE_SIZE ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 10 * 60 * 1000, // 10 minuti per dati più statici
  });
};