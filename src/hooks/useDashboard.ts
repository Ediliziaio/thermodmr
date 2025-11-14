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
    da_consegnare: number;
    consegnato: number;
  };
  topDealers: Array<{
    id: string;
    ragione_sociale: string;
    totalRevenue: number;
    ordersCount: number;
  }>;
}

export const useDashboardKPIs = (startDate?: Date, endDate?: Date) => {
  return useQuery({
    queryKey: ["dashboard-kpis", startDate, endDate],
    queryFn: async (): Promise<DashboardKPIs> => {
      // Chiama la funzione SQL ottimizzata per KPI
      const { data: kpisData, error: kpisError } = await supabase.rpc(
        "get_dashboard_kpis",
        {
          p_start_date: startDate?.toISOString(),
          p_end_date: endDate?.toISOString(),
          p_commerciale_id: null,
        }
      );

      if (kpisError) throw kpisError;

      // Chiama la funzione per top dealers
      const { data: dealersData, error: dealersError } = await supabase.rpc(
        "get_top_dealers",
        {
          p_limit: 5,
          p_commerciale_id: null,
          p_start_date: startDate?.toISOString(),
          p_end_date: endDate?.toISOString(),
        }
      );

      if (dealersError) throw dealersError;

      const kpis = kpisData as any;
      const daSaldare = kpis.totalRevenue - kpis.totalIncassato;

      return {
        totalOrders: kpis.totalOrders,
        totalRevenue: kpis.totalRevenue,
        totalAcconti: kpis.totalAcconti,
        totalIncassato: kpis.totalIncassato,
        daSaldare,
        ordersByStatus: kpis.ordersByStatus,
        topDealers: (dealersData || []) as any[],
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minuti
    gcTime: 10 * 60 * 1000, // 10 minuti
  });
};

export const useRevenueData = (months: number = 6) => {
  return useQuery({
    queryKey: ["revenue-data", months],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_revenue_by_month", {
        p_months: months,
        p_commerciale_id: null,
      });

      if (error) throw error;

      return (data || []) as Array<{
        month: string;
        ricavi: number;
        acconti: number;
        incassato: number;
      }>;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
