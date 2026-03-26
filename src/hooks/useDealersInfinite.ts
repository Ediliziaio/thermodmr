import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { DealerWithStats } from "./useDealers";

const PAGE_SIZE = 30;

export interface DealerFilters {
  search?: string;
  provincia?: string;
  commerciale_id?: string;
  minRevenue?: number;
  maxRevenue?: number;
  sortBy?: "ragione_sociale" | "total_revenue" | "orders_count" | "created_at";
  sortOrder?: "asc" | "desc";
}

export const useDealersInfinite = (filters: DealerFilters = {}) => {
  return useInfiniteQuery({
    queryKey: ["dealers-infinite", filters],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("dealers_with_stats")
        .select("*", { count: "exact" });

      // Ricerca full-text
      if (filters.search) {
        query = query.or(
          `ragione_sociale.ilike.%${filters.search}%,` +
          `p_iva.ilike.%${filters.search}%,` +
          `email.ilike.%${filters.search}%,` +
          `telefono.ilike.%${filters.search}%`
        );
      }

      // Filtro provincia
      if (filters.provincia) {
        query = query.eq("provincia", filters.provincia);
      }

      // Filtro commerciale
      if (filters.commerciale_id) {
        query = query.eq("commerciale_owner_id", filters.commerciale_id);
      }

      // Filtro range fatturato
      if (filters.minRevenue !== undefined) {
        query = query.gte("total_revenue", filters.minRevenue);
      }
      if (filters.maxRevenue !== undefined) {
        query = query.lte("total_revenue", filters.maxRevenue);
      }

      // Sorting
      const sortBy = filters.sortBy || "ragione_sociale";
      const sortOrder = filters.sortOrder || "asc";
      query = query.order(sortBy, { ascending: sortOrder === "asc" });

      query = query.range(from, to);

      const { data: dealers, error, count } = await query;

      if (error) throw error;

      return {
        data: dealers as DealerWithStats[] || [],
        nextPage: dealers && dealers.length === PAGE_SIZE ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 2 * 60 * 1000,
  });
};