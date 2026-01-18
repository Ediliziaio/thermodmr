import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CommercialeStats {
  totalOrders: number;
  totalRevenue: number;
  totalAcconti: number;
  totalIncassato: number;
  commissionsDovute: number;
  commissionsLiquidate: number;
  activeDealers: number;
  ordersByStatus: Record<string, number>;
  revenueByMonth: Array<{
    month: string;
    ricavi: number;
    acconti: number;
    incassato: number;
  }>;
  commissionsByMonth: Array<{
    month: string;
    dovute: number;
    liquidate: number;
  }>;
  topDealers: Array<{
    dealer_id: string;
    dealer_name: string;
    total_orders: number;
    total_revenue: number;
  }>;
  latestOrders: Array<{
    id: string;
    importo_totale: number;
    stato: string;
    data_inserimento: string;
    dealer_name: string;
  }>;
}

interface RPCStats {
  totalOrders: number;
  totalRevenue: number;
  totalAcconti: number;
  totalIncassato: number;
  commissionsDovute: number;
  commissionsLiquidate: number;
  activeDealers: number;
  ordersByStatus: Record<string, number>;
}

export const useCommercialeDashboard = (commercialeId?: string) => {
  return useQuery({
    queryKey: ["commerciale-dashboard", commercialeId],
    queryFn: async (): Promise<CommercialeStats> => {
      if (!commercialeId) throw new Error("Commerciale ID is required");

      // Usa la funzione RPC ottimizzata get_commerciale_stats
      const { data: stats, error: statsError } = await supabase.rpc(
        "get_commerciale_stats",
        { p_commerciale_id: commercialeId }
      );

      if (statsError) throw statsError;

      // Usa get_revenue_by_month per i dati mensili
      const { data: revenueData, error: revenueError } = await supabase.rpc(
        "get_revenue_by_month",
        { 
          p_months: 6, 
          p_commerciale_id: commercialeId 
        }
      );

      if (revenueError) throw revenueError;

      // Usa get_top_dealers per i top dealers
      const { data: topDealersData, error: topDealersError } = await supabase.rpc(
        "get_top_dealers",
        {
          p_limit: 5,
          p_commerciale_id: commercialeId,
        }
      );

      if (topDealersError) throw topDealersError;

      // Fetch ultimi 5 ordini (query semplice, non serve RPC)
      const { data: latestOrders, error: ordersError } = await supabase
        .from("orders")
        .select(`
          id,
          importo_totale,
          stato,
          data_inserimento,
          dealers (ragione_sociale)
        `)
        .eq("commerciale_id", commercialeId)
        .order("data_inserimento", { ascending: false })
        .limit(5);

      if (ordersError) throw ordersError;

      // Fetch commissioni per mese (aggregazione manuale)
      const { data: commissions, error: commissionsError } = await supabase
        .from("commissions")
        .select("*, orders!inner(data_inserimento)")
        .eq("commerciale_id", commercialeId);

      if (commissionsError) throw commissionsError;

      // Calcola commissioni per mese
      const commissionsByMonth = calculateCommissionsByMonth(commissions || []);

      const parsedStats = stats as unknown as RPCStats;
      const revenueByMonth = (revenueData as unknown as Array<{
        month: string;
        ricavi: number;
        acconti: number;
        incassato: number;
      }>) || [];

      const topDealers = ((topDealersData as unknown as Array<{
        id: string;
        ragione_sociale: string;
        totalRevenue: number;
        ordersCount: number;
      }>) || []).map(d => ({
        dealer_id: d.id,
        dealer_name: d.ragione_sociale,
        total_orders: d.ordersCount,
        total_revenue: d.totalRevenue,
      }));

      return {
        totalOrders: parsedStats.totalOrders || 0,
        totalRevenue: parsedStats.totalRevenue || 0,
        totalAcconti: parsedStats.totalAcconti || 0,
        totalIncassato: parsedStats.totalIncassato || 0,
        commissionsDovute: parsedStats.commissionsDovute || 0,
        commissionsLiquidate: parsedStats.commissionsLiquidate || 0,
        activeDealers: parsedStats.activeDealers || 0,
        ordersByStatus: parsedStats.ordersByStatus || {},
        revenueByMonth,
        commissionsByMonth,
        topDealers,
        latestOrders: (latestOrders || []).map(o => ({
          id: o.id,
          importo_totale: o.importo_totale,
          stato: o.stato,
          data_inserimento: o.data_inserimento,
          dealer_name: (o.dealers as { ragione_sociale: string } | null)?.ragione_sociale || "N/A",
        })),
      };
    },
    enabled: !!commercialeId,
    staleTime: 5 * 60 * 1000, // 5 minuti
    gcTime: 10 * 60 * 1000, // 10 minuti
  });
};

// Helper per calcolare commissioni per mese
function calculateCommissionsByMonth(commissions: Array<{
  importo_calcolato: number;
  stato_liquidazione: string;
  orders: { data_inserimento: string };
}>): Array<{ month: string; dovute: number; liquidate: number }> {
  const monthlyData: Record<string, { dovute: number; liquidate: number }> = {};
  
  // Genera gli ultimi 6 mesi
  const months: string[] = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = date.toLocaleString('it-IT', { month: 'short', year: 'numeric' });
    months.push(monthKey);
    monthlyData[monthKey] = { dovute: 0, liquidate: 0 };
  }

  // Raggruppa le commissioni per mese
  commissions.forEach(c => {
    const date = new Date(c.orders.data_inserimento);
    const monthKey = date.toLocaleString('it-IT', { month: 'short', year: 'numeric' });
    
    if (monthlyData[monthKey]) {
      if (c.stato_liquidazione === "dovuta") {
        monthlyData[monthKey].dovute += Number(c.importo_calcolato);
      } else if (c.stato_liquidazione === "liquidata") {
        monthlyData[monthKey].liquidate += Number(c.importo_calcolato);
      }
    }
  });

  return months.map(month => ({
    month,
    ...monthlyData[month],
  }));
}
