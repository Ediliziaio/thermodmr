import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Re-export tipo centralizzato
export type { OrderWithPaymentStats as OrderWithDetails } from "@/types/orders";
import type { OrderWithPaymentStats } from "@/types/orders";

const PAGE_SIZE = 50;

interface UseOrdersInfiniteParams {
  searchQuery?: string;
  dealerId?: string;
}

export const useOrdersInfinite = ({ searchQuery, dealerId }: UseOrdersInfiniteParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["orders-infinite", searchQuery, dealerId],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("orders_with_payment_stats")
        .select(
          `
          *,
          dealers (ragione_sociale, email),
          clients (nome, cognome)
        `,
          { count: "exact" }
        )
        .order("data_inserimento", { ascending: false });

      // Filtro per dealer specifico
      if (dealerId) {
        query = query.eq("dealer_id", dealerId);
      }

      // Ricerca solo su campi della tabella orders (evita errori con join)
      if (searchQuery && searchQuery.trim()) {
        const search = searchQuery.trim().toLowerCase();
        query = query.or(
          `id.ilike.%${search}%,note_interna.ilike.%${search}%,note_rivenditore.ilike.%${search}%`
        );
      }

      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      // Debug logging (solo in development)
      if (process.env.NODE_ENV === "development") {
        console.log("[useOrdersInfinite] Orders fetched:", {
          pageParam,
          ordersCount: data?.length,
          totalCount: count,
          searchQuery,
        });
      }

      return {
        data: data as OrderWithPaymentStats[],
        nextPage: data.length === PAGE_SIZE ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 2 * 60 * 1000, // 2 minuti per bilanciare freshness e performance
  });
};