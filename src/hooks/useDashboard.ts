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

export const useDashboardKPIs = () => {
  return useQuery({
    queryKey: ["dashboard-kpis"],
    queryFn: async (): Promise<DashboardKPIs> => {
      // Ottieni tutti gli ordini
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("*, dealers(id, ragione_sociale)");

      if (ordersError) throw ordersError;

      // Ottieni tutti i pagamenti
      const { data: payments, error: paymentsError } = await supabase
        .from("payments")
        .select("importo");

      if (paymentsError) throw paymentsError;

      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.reduce((sum, order) => sum + (order.importo_totale || 0), 0) || 0;
      const totalAcconti = orders?.reduce((sum, order) => sum + (order.importo_acconto || 0), 0) || 0;
      const totalIncassato = payments?.reduce((sum, payment) => sum + (payment.importo || 0), 0) || 0;
      const daSaldare = totalRevenue - totalIncassato;

      // Conta ordini per stato
      const ordersByStatus = {
        da_confermare: orders?.filter(o => o.stato === 'da_confermare').length || 0,
        da_pagare_acconto: orders?.filter(o => o.stato === 'da_pagare_acconto').length || 0,
        in_lavorazione: orders?.filter(o => o.stato === 'in_lavorazione').length || 0,
        da_consegnare: orders?.filter(o => o.stato === 'da_consegnare').length || 0,
        consegnato: orders?.filter(o => o.stato === 'consegnato').length || 0,
      };

      // Calcola top dealers
      const dealerStats = new Map<string, { ragione_sociale: string; totalRevenue: number; ordersCount: number }>();
      
      orders?.forEach(order => {
        if (order.dealers) {
          const dealerId = order.dealers.id;
          const existing = dealerStats.get(dealerId) || {
            ragione_sociale: order.dealers.ragione_sociale,
            totalRevenue: 0,
            ordersCount: 0,
          };
          
          existing.totalRevenue += order.importo_totale || 0;
          existing.ordersCount += 1;
          dealerStats.set(dealerId, existing);
        }
      });

      const topDealers = Array.from(dealerStats.entries())
        .map(([id, stats]) => ({ id, ...stats }))
        .sort((a, b) => b.totalRevenue - a.totalRevenue)
        .slice(0, 5);

      return {
        totalOrders,
        totalRevenue,
        totalAcconti,
        totalIncassato,
        daSaldare,
        ordersByStatus,
        topDealers,
      };
    },
  });
};
