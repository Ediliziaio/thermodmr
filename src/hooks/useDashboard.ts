import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DashboardKPIs {
  totalOrders: number;
  totalRevenue: number;
  totalAcconti: number;
  totalIncassato: number;
  daSaldare: number;
  ordersByStatus: {
    da_confermare: number;
    da_pagare_acconto: number;
    in_lavorazione: number;
    da_saldare: number;
    da_consegnare: number;
    consegnato: number;
  };
  topDealers: Array<{
    id: string;
    ragione_sociale: string;
    totalRevenue: number;
    ordersCount: number;
  }>;
  // Delta % vs previous period
  deltas: {
    revenue: number;
    acconti: number;
    incassato: number;
    orders: number;
  };
}

const calcDelta = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

export const useDashboardKPIs = (startDate?: Date, endDate?: Date) => {
  return useQuery({
    queryKey: ["dashboard-kpis", startDate, endDate],
    queryFn: async (): Promise<DashboardKPIs> => {
      const [kpisResult, dealersResult] = await Promise.all([
        supabase.rpc("get_dashboard_kpis", {
          p_start_date: startDate?.toISOString(),
          p_end_date: endDate?.toISOString(),
          p_commerciale_id: null,
        }),
        supabase.rpc("get_top_dealers", {
          p_limit: 5,
          p_commerciale_id: null,
          p_start_date: startDate?.toISOString(),
          p_end_date: endDate?.toISOString(),
        }),
      ]);

      // Fetch comparison separately to avoid blocking main KPIs
      let comparisonResult: any = { error: null, data: null };
      try {
        comparisonResult = await supabase.rpc("get_dashboard_kpis_comparison", {
          p_start_date: startDate?.toISOString() ?? null,
          p_end_date: endDate?.toISOString() ?? null,
          p_commerciale_id: null,
        });
      } catch (_) {
        // Silently ignore comparison errors
      }

      if (kpisResult.error) throw kpisResult.error;
      if (dealersResult.error) throw dealersResult.error;

      const kpis = kpisResult.data as any;
      const daSaldare = kpis.totalRevenue - kpis.totalIncassato;

      // Compute deltas from comparison
      let deltas = { revenue: 0, acconti: 0, incassato: 0, orders: 0 };
      if (!comparisonResult.error && comparisonResult.data) {
        const comp = comparisonResult.data as any;
        const curr = comp.current || {};
        const prev = comp.previous || {};
        deltas = {
          revenue: calcDelta(curr.totalRevenue || 0, prev.totalRevenue || 0),
          acconti: calcDelta(curr.totalAcconti || 0, prev.totalAcconti || 0),
          incassato: calcDelta(curr.totalIncassato || 0, prev.totalIncassato || 0),
          orders: calcDelta(curr.totalOrders || 0, prev.totalOrders || 0),
        };
      }

      return {
        totalOrders: kpis.totalOrders,
        totalRevenue: kpis.totalRevenue,
        totalAcconti: kpis.totalAcconti,
        totalIncassato: kpis.totalIncassato,
        daSaldare,
        ordersByStatus: kpis.ordersByStatus,
        topDealers: (dealersResult.data || []) as any[],
        deltas,
      };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useRevenueData = (startDate?: Date, endDate?: Date) => {
  const months = startDate && endDate 
    ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)))
    : 6;

  return useQuery({
    queryKey: ["revenue-data", startDate, endDate, months],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_revenue_by_month", {
        p_months: months,
        p_commerciale_id: null,
      });

      if (error) throw error;

      let result = (data || []) as Array<{
        month: string;
        ricavi: number;
        acconti: number;
        incassato: number;
      }>;

      if (startDate && endDate) {
        result = result.filter(item => {
          // Parse "Mon YYYY" format (e.g. "Mar 2026") using month_date if available,
          // otherwise parse the label safely
          const parts = item.month.split(' ');
          if (parts.length === 2) {
            const monthNames: Record<string, number> = {
              'Gen': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mag': 4, 'Giu': 5,
              'Lug': 6, 'Ago': 7, 'Set': 8, 'Ott': 9, 'Nov': 10, 'Dic': 11,
              'Jan': 0, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Dec': 11
            };
            const monthIdx = monthNames[parts[0]];
            const year = parseInt(parts[1]);
            if (monthIdx !== undefined && !isNaN(year)) {
              const itemDate = new Date(year, monthIdx, 1);
              return itemDate >= startDate && itemDate <= endDate;
            }
          }
          return true;
        });
      }

      return result;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export interface RecentOrder {
  id: string;
  dealer_name: string;
  stato: string;
  importo_totale: number;
  updated_at: string;
}

export const useRecentOrders = (limit = 5) => {
  return useQuery({
    queryKey: ["recent-orders", limit],
    queryFn: async (): Promise<RecentOrder[]> => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, stato, importo_totale, updated_at, dealers(ragione_sociale)")
        .order("updated_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      return (data || []).map((o: any) => ({
        id: o.id,
        dealer_name: o.dealers?.ragione_sociale || "—",
        stato: o.stato,
        importo_totale: o.importo_totale,
        updated_at: o.updated_at,
      }));
    },
    staleTime: 2 * 60 * 1000,
  });
};
