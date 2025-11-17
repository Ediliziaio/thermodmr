import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

const PAGE_SIZE = 50;

export interface OrderWithDetails extends Tables<"orders"> {
  dealers: { ragione_sociale: string; email: string } | null;
  clients: { nome: string; cognome: string } | null;
  importo_pagato: number;
  importo_da_pagare: number;
  percentuale_pagata: number;
  numero_pagamenti: number;
  data_ultimo_pagamento: string | null;
}

interface UseOrdersInfiniteParams {
  searchQuery?: string;
}

export const useOrdersInfinite = ({ searchQuery }: UseOrdersInfiniteParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["orders-infinite", searchQuery],
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

      // Full-text search su ID, dealer, cliente, note
      if (searchQuery && searchQuery.trim()) {
        const search = searchQuery.trim().toLowerCase();
        query = query.or(
          `id.ilike.%${search}%,` +
          `dealers.ragione_sociale.ilike.%${search}%,` +
          `clients.nome.ilike.%${search}%,` +
          `clients.cognome.ilike.%${search}%,` +
          `note_interna.ilike.%${search}%,` +
          `note_rivenditore.ilike.%${search}%`
        );
      }

      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      // Debug logging
      console.log("[useOrdersInfinite] Orders fetched:", {
        pageParam,
        ordersCount: data?.length,
        totalCount: count,
        searchQuery,
        ordersByStatus: data?.reduce((acc, o) => {
          acc[o.stato!] = (acc[o.stato!] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      });

      return {
        data: data as OrderWithDetails[],
        nextPage: data.length === PAGE_SIZE ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 30 * 1000, // 30 secondi per avere dati più freschi
  });
};