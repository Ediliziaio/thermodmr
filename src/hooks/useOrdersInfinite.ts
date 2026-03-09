import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
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
        query = query.eq("stato", stato as any);
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
        // Urgenti = overdue OR has balance, excludes delivered
        const today = new Date().toISOString().split("T")[0];
        query = query.neq("stato", "consegnato")
          .or(`data_consegna_prevista.lt.${today},importo_da_pagare.gt.0`);
      }

      // Ricerca su campi ordine + dealer/cliente tramite pre-query
      if (searchQuery && searchQuery.trim()) {
        const search = searchQuery.trim().toLowerCase();
        
        // Pre-query: trova dealer e clienti che matchano la ricerca
        const [dealerRes, clientRes] = await Promise.all([
          supabase.from("dealers").select("id").ilike("ragione_sociale", `%${search}%`),
          supabase.from("clients").select("id").or(`nome.ilike.%${search}%,cognome.ilike.%${search}%`),
        ]);
        
        const dealerIds = (dealerRes.data || []).map(d => d.id);
        const clientIds = (clientRes.data || []).map(c => c.id);
        
        // Build OR filter combining order fields + matched dealer/client IDs
        const orParts = [
          `id.ilike.%${search}%`,
          `note_interna.ilike.%${search}%`,
          `note_rivenditore.ilike.%${search}%`,
        ];
        if (dealerIds.length > 0) {
          orParts.push(`dealer_id.in.(${dealerIds.join(",")})`);
        }
        if (clientIds.length > 0) {
          orParts.push(`cliente_finale_id.in.(${clientIds.join(",")})`);
        }
        
        query = query.or(orParts.join(","));
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

/**
 * Hook per KPI ordini calcolati server-side (usa RPC get_orders_kpi_filtered)
 */
export const useOrdersKpi = (params: UseOrdersInfiniteParams = {}) => {
  return useQuery({
    queryKey: ["orders-kpi", params.searchQuery, params.dealerId, params.stato, params.dataFrom, params.dataTo, params.statoPagamento, params.quickFilter, params.importoMin, params.importoMax],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_orders_kpi_filtered", {
        p_dealer_id: params.dealerId || null,
        p_stato: params.stato || null,
        p_data_from: params.dataFrom || null,
        p_data_to: params.dataTo ? `${params.dataTo}T23:59:59.999Z` : null,
        p_stato_pagamento: params.statoPagamento || null,
        p_quick_filter: params.quickFilter || null,
        p_importo_min: params.importoMin ?? null,
        p_importo_max: params.importoMax ?? null,
        p_search: params.searchQuery?.trim() || null,
      });
      if (error) throw error;
      return data as {
        total_orders: number;
        total_value: number;
        total_to_collect: number;
        orders_with_balance: number;
      };
    },
    staleTime: 2 * 60 * 1000,
  });
};
