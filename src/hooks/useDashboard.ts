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

export const useDashboardKPIs = (startDate?: Date, endDate?: Date, commercialeId?: string | null) => {
  return useQuery({
    queryKey: ["dashboard-kpis", startDate, endDate, commercialeId],
    queryFn: async (): Promise<DashboardKPIs> => {
      const [kpisResult, dealersResult] = await Promise.all([
        supabase.rpc("get_dashboard_kpis", {
          p_start_date: startDate?.toISOString() ?? null,
          p_end_date: endDate?.toISOString() ?? null,
          p_commerciale_id: commercialeId ?? null,
        }),
        supabase.rpc("get_top_dealers", {
          p_limit: 5,
          p_commerciale_id: commercialeId ?? null,
          p_start_date: startDate?.toISOString() ?? null,
          p_end_date: endDate?.toISOString() ?? null,
        }),
      ]);

      // Fetch comparison separately to avoid blocking main KPIs
      let comparisonResult: any = { error: null, data: null };
      try {
        comparisonResult = await supabase.rpc("get_dashboard_kpis_comparison", {
          p_start_date: startDate?.toISOString() ?? null,
          p_end_date: endDate?.toISOString() ?? null,
          p_commerciale_id: commercialeId ?? null,
        });
        if (comparisonResult.error) {
          console.warn("[Dashboard] comparison RPC error:", comparisonResult.error.message);
        }
      } catch (err) {
        console.warn("[Dashboard] comparison RPC failed:", err);
      }

      if (kpisResult.error) throw kpisResult.error;
      if (dealersResult.error) throw dealersResult.error;

      const kpis = kpisResult.data as any;
      const daSaldare = Math.max(0, kpis.totalRevenue - kpis.totalIncassato);

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
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useRevenueData = (startDate?: Date, endDate?: Date, commercialeId?: string | null) => {
  return useQuery({
    queryKey: ["revenue-data", startDate, endDate, commercialeId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_revenue_by_date_range", {
        p_start_date: startDate?.toISOString() ?? null,
        p_end_date: endDate?.toISOString() ?? null,
        p_commerciale_id: commercialeId ?? null,
      });

      if (error) throw error;

      return (data || []) as Array<{
        month: string;
        month_iso: string;
        ricavi: number;
        acconti: number;
        incassato: number;
      }>;
    },
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
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
