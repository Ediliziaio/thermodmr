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

      const { data: commerciali, error, count } = await supabase
        .from("profiles")
        .select(
          `
          id,
          display_name,
          email,
          is_active,
          user_roles!inner(role)
        `,
          { count: "exact" }
        )
        .eq("user_roles.role", "commerciale")
        .range(from, to);

      if (error) throw error;

      // Ottieni statistiche per i commerciali di questa pagina
      const commercialiWithStats = await Promise.all(
        commerciali.map(async (commerciale) => {
          const { count: dealersCount } = await supabase
            .from("dealers")
            .select("*", { count: "exact", head: true })
            .eq("commerciale_owner_id", commerciale.id);

          const { data: orders } = await supabase
            .from("orders")
            .select("importo_totale")
            .eq("commerciale_id", commerciale.id);

          const ordiniCount = orders?.length || 0;
          const fatturatoTotale =
            orders?.reduce((sum, o) => sum + Number(o.importo_totale), 0) || 0;

          const { data: commissions } = await supabase
            .from("commissions")
            .select("importo_calcolato, stato_liquidazione")
            .eq("commerciale_id", commerciale.id);

          const provvigioniDovute =
            commissions
              ?.filter((c) => c.stato_liquidazione === "dovuta")
              .reduce((sum, c) => sum + Number(c.importo_calcolato), 0) || 0;

          const provvigioniLiquidate =
            commissions
              ?.filter((c) => c.stato_liquidazione === "liquidata")
              .reduce((sum, c) => sum + Number(c.importo_calcolato), 0) || 0;

          return {
            id: commerciale.id,
            display_name: commerciale.display_name,
            email: commerciale.email,
            is_active: commerciale.is_active,
            dealers_count: dealersCount || 0,
            ordini_count: ordiniCount,
            fatturato_totale: fatturatoTotale,
            provvigioni_dovute: provvigioniDovute,
            provvigioni_liquidate: provvigioniLiquidate,
          } as CommercialeStats;
        })
      );

      return {
        data: commercialiWithStats,
        nextPage: commerciali.length === PAGE_SIZE ? pageParam + 1 : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 10 * 60 * 1000, // 10 minuti
  });
};