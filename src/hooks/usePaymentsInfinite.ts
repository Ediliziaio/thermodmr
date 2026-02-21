import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

const PAGE_SIZE = 50;

export interface PaymentWithDetails {
  id: string;
  tipo: string;
  importo: number;
  metodo: string;
  data_pagamento: string;
  riferimento: string | null;
  ricevuta_url: string | null;
  ordine_id: string;
  created_at: string;
  orders: {
    id: string;
    stato: string;
    importo_totale: number;
    dealer_id: string;
    dealers: {
      ragione_sociale: string;
    };
  };
}

interface UsePaymentsInfiniteParams {
  dateRange?: DateRange;
  tipoFilter: string;
  metodoFilter: string;
  searchQuery?: string;
  dealerId?: string;
}

export const usePaymentsInfinite = ({ dateRange, tipoFilter, metodoFilter, searchQuery, dealerId }: UsePaymentsInfiniteParams) => {
  return useInfiniteQuery({
    queryKey: ["payments-infinite", dateRange, tipoFilter, metodoFilter, searchQuery, dealerId],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("payments")
        .select(
          `
          *,
          orders!inner(
            id,
            stato,
            importo_totale,
            dealer_id,
            dealers!inner(
              ragione_sociale
            )
          )
        `,
          { count: "exact" }
        )
        .order("data_pagamento", { ascending: false })
        .range(from, to);

      // Filtro per dealer specifico
      if (dealerId) {
        query = query.eq("orders.dealer_id", dealerId);
      }

      if (dateRange?.from) {
        query = query.gte("data_pagamento", format(dateRange.from, "yyyy-MM-dd"));
      }
      if (dateRange?.to) {
        query = query.lte("data_pagamento", format(dateRange.to, "yyyy-MM-dd"));
      }
      if (tipoFilter !== "all") {
        query = query.eq("tipo", tipoFilter as "acconto" | "saldo" | "parziale");
      }
      if (metodoFilter !== "all") {
        query = query.eq("metodo", metodoFilter);
      }

      // Full-text search su riferimento, metodo, ragione sociale dealer
      if (searchQuery && searchQuery.trim()) {
        const search = searchQuery.trim().toLowerCase();
        query = query.or(
          `riferimento.ilike.%${search}%,` +
          `metodo.ilike.%${search}%,` +
          `orders.dealers.ragione_sociale.ilike.%${search}%`
        );
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: data as PaymentWithDetails[],
        nextPage: data.length === PAGE_SIZE ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 2 * 60 * 1000, // 2 minuti
  });
};
