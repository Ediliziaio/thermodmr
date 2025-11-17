import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns";

export const useCommercialeDashboard = (commercialeId?: string) => {
  return useQuery({
    queryKey: ["commerciale-dashboard", commercialeId],
    queryFn: async () => {
      if (!commercialeId) throw new Error("Commerciale ID is required");

      // Fetch dealers count
      const { data: dealers, error: dealersError } = await supabase
        .from("dealers")
        .select("id")
        .eq("commerciale_owner_id", commercialeId);

      if (dealersError) throw dealersError;

      // Fetch orders for this commerciale
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select(`
          id,
          importo_totale,
          importo_acconto,
          stato,
          data_inserimento,
          dealer_id,
          dealers (ragione_sociale)
        `)
        .eq("commerciale_id", commercialeId);

      if (ordersError) throw ordersError;

      // Fetch commissions
      const { data: commissions, error: commissionsError } = await supabase
        .from("commissions")
        .select("*, orders!inner(data_inserimento)")
        .eq("commerciale_id", commercialeId);

      if (commissionsError) throw commissionsError;

      // Calculate KPIs
      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.reduce((sum, o) => sum + Number(o.importo_totale), 0) || 0;
      
      // Debug logging
      console.log("[CommercialeDashboard] Orders fetched:", {
        commercialeId,
        totalOrders,
        totalRevenue,
        ordersByStatus: orders?.reduce((acc, o) => {
          acc[o.stato] = (acc[o.stato] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      });
      
      const commissionsDovute = commissions
        ?.filter(c => c.stato_liquidazione === "dovuta")
        .reduce((sum, c) => sum + Number(c.importo_calcolato), 0) || 0;
      
      const commissionsLiquidate = commissions
        ?.filter(c => c.stato_liquidazione === "liquidata")
        .reduce((sum, c) => sum + Number(c.importo_calcolato), 0) || 0;

      // Group orders by month for revenue chart
      const last6Months = Array.from({ length: 6 }, (_, i) => {
        const date = subMonths(new Date(), 5 - i);
        return {
          start: startOfMonth(date),
          end: endOfMonth(date),
          label: format(date, "MMM yyyy"),
        };
      });

      const revenueByMonth = last6Months.map((month) => {
        const monthOrders = orders?.filter((o) => {
          const orderDate = new Date(o.data_inserimento);
          return orderDate >= month.start && orderDate <= month.end;
        }) || [];

        return {
          month: month.label,
          revenue: monthOrders.reduce((sum, o) => sum + Number(o.importo_totale), 0),
          orders: monthOrders.length,
        };
      });

      // Group commissions by month
      const commissionsByMonth = last6Months.map((month) => {
        const monthCommissions = commissions?.filter((c) => {
          const commissionDate = new Date(c.orders.data_inserimento);
          return commissionDate >= month.start && commissionDate <= month.end;
        }) || [];

        return {
          month: month.label,
          dovute: monthCommissions
            .filter(c => c.stato_liquidazione === "dovuta")
            .reduce((sum, c) => sum + Number(c.importo_calcolato), 0),
          liquidate: monthCommissions
            .filter(c => c.stato_liquidazione === "liquidata")
            .reduce((sum, c) => sum + Number(c.importo_calcolato), 0),
        };
      });

      // Order status distribution
      const statusCounts = orders?.reduce((acc, order) => {
        acc[order.stato] = (acc[order.stato] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      // Top dealers by revenue
      const dealerRevenue = orders?.reduce((acc, order) => {
        const dealerName = (order.dealers as any)?.ragione_sociale || "Sconosciuto";
        if (!acc[dealerName]) {
          acc[dealerName] = 0;
        }
        acc[dealerName] += Number(order.importo_totale);
        return acc;
      }, {} as Record<string, number>) || {};

      const topDealers = Object.entries(dealerRevenue)
        .map(([name, revenue]) => ({ name, revenue }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      // Latest orders
      const latestOrders = orders
        ?.sort((a, b) => new Date(b.data_inserimento).getTime() - new Date(a.data_inserimento).getTime())
        .slice(0, 5) || [];

      return {
        kpis: {
          totalOrders,
          totalRevenue,
          commissionsDovute,
          commissionsLiquidate,
          activeDealers: dealers?.length || 0,
        },
        revenueByMonth,
        commissionsByMonth,
        statusCounts,
        topDealers,
        latestOrders,
      };
    },
    enabled: !!commercialeId,
  });
};
