import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Re-export tipo centralizzato
export type { OrderWithPaymentStats as OrderWithDetails } from "@/types/orders";
import type { OrderWithPaymentStats } from "@/types/orders";

const PAGE_SIZE = 50;

interface UseOrdersInfiniteParams {
  searchQuery?: string;
  dealerId?: string;
  stato?: string;
  dataFrom?: string;
  dataTo?: string;
  statoPagamento?: string;
  quickFilter?: string;
  importoMin?: number;
  importoMax?: number;
}

export const useOrdersInfinite = ({
  searchQuery,
  dealerId,
  stato,
  dataFrom,
  dataTo,
  statoPagamento,
  quickFilter,
  importoMin,
  importoMax,
}: UseOrdersInfiniteParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["orders-infinite", searchQuery, dealerId, stato, dataFrom, dataTo, statoPagamento, quickFilter, importoMin, importoMax],
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
        .order("data_inserimento", { ascending: false })
        .neq("stato", "preventivo");

      // Filtro per dealer specifico
      if (dealerId) {
        query = query.eq("dealer_id", dealerId);
      }

      // Filtro per stato
      if (stato) {
        query = query.eq("stato", stato);
      }

      // Filtro per date
      if (dataFrom) {
        query = query.gte("data_inserimento", dataFrom);
      }
      if (dataTo) {
        query = query.lte("data_inserimento", `${dataTo}T23:59:59.999Z`);
      }

      // Filtro per importo
      if (importoMin !== undefined && importoMin !== null) {
        query = query.gte("importo_totale", importoMin);
      }
      if (importoMax !== undefined && importoMax !== null) {
        query = query.lte("importo_totale", importoMax);
      }

      // Filtro per stato pagamento
      if (statoPagamento === "pagato") {
        query = query.eq("importo_da_pagare", 0);
      } else if (statoPagamento === "non_pagato") {
        query = query.eq("importo_pagato", 0);
      } else if (statoPagamento === "parziale") {
        query = query.gt("importo_pagato", 0).gt("importo_da_pagare", 0);
      }

      // Quick filters
      if (quickFilter === "saldo") {
        query = query.gt("importo_da_pagare", 0);
      } else if (quickFilter === "ritardo") {
        query = query.lt("data_consegna_prevista", new Date().toISOString().split("T")[0]).neq("stato", "consegnato");
      } else if (quickFilter === "urgenti") {
        // Urgenti = overdue OR (has balance AND not delivered) — handled via OR filter
        query = query.neq("stato", "consegnato");
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

      return {
        data: data as OrderWithPaymentStats[],
        nextPage: data.length === PAGE_SIZE ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 2 * 60 * 1000,
  });
};
