import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { OrderWithDetails } from "./useOrders";

const PAGE_SIZE = 50;

export const useOrdersInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["orders-infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await supabase
        .from("orders")
        .select(
          `
          *,
          dealers (ragione_sociale, email),
          clients (nome, cognome)
        `,
          { count: "exact" }
        )
        .order("data_inserimento", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        data: data as OrderWithDetails[],
        nextPage: data.length === PAGE_SIZE ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 2 * 60 * 1000, // 2 minuti per dati che cambiano spesso
  });
};