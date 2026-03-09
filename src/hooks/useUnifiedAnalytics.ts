import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subMonths, eachMonthOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { it } from "date-fns/locale";

interface UnifiedAnalyticsParams {
  commercialeId?: string;
  dealerId?: string;
  months?: number;
}

interface OrderTrendData {
  date: string;
  ordini: number;
  valore: number;
  consegnati: number;
}

interface PaymentTrendData {
  month: string;
  acconti: number;
  saldi: number;
  parziali: number;
  totale: number;
}

interface DealerPerformance {
  dealer: string;
  dealerId: string;
  ordini: number;
  valore: number;
  ticketMedio: number;
  tassoConsegna: number;
}

interface UnifiedAnalyticsData {
  orderTrends: OrderTrendData[];
  paymentTrends: PaymentTrendData[];
  dealerPerformance: DealerPerformance[];
  summary: {
    totalOrders: number;
    totalRevenue: number;
    totalPayments: number;
    averageTicket: number;
    conversionRate: number;
  };
}

export const useUnifiedAnalytics = ({ commercialeId, dealerId, months = 6 }: UnifiedAnalyticsParams = {}) => {
  return useQuery({
    queryKey: ["unified-analytics", commercialeId, dealerId, months],
    queryFn: async () => {
      const now = new Date();
      const startDate = startOfMonth(subMonths(now, months - 1));
      const endDate = endOfMonth(now);

      // Build queries
      let ordersQuery = supabase
        .from("orders_with_payment_stats")
        .select(`
          *,
          dealers (id, ragione_sociale)
        `)
        .gte("data_inserimento", startDate.toISOString())
        .lte("data_inserimento", endDate.toISOString());

      let paymentsQuery = supabase
        .from("payments")
        .select(`
          *,
          orders!inner(commerciale_id, dealer_id)
        `)
        .gte("data_pagamento", startDate.toISOString())
        .lte("data_pagamento", endDate.toISOString());

      if (commercialeId) {
        ordersQuery = ordersQuery.eq("commerciale_id", commercialeId);
        paymentsQuery = paymentsQuery.eq("orders.commerciale_id", commercialeId);
      }
      if (dealerId) {
        ordersQuery = ordersQuery.eq("dealer_id", dealerId);
        paymentsQuery = paymentsQuery.eq("orders.dealer_id", dealerId);
      }

      // Execute in parallel
      const [ordersResult, paymentsResult] = await Promise.all([
        ordersQuery,
        paymentsQuery,
      ]);

      if (ordersResult.error) throw ordersResult.error;
      if (paymentsResult.error) throw paymentsResult.error;

      const orders = ordersResult.data;
      const payments = paymentsResult.data;

      // Calculate Order Trends (monthly)
      const monthsInterval = eachMonthOfInterval({ start: startDate, end: endDate });
      const orderTrends: OrderTrendData[] = monthsInterval.map(month => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const monthOrders = orders?.filter(o => {
          const orderDate = new Date(o.data_inserimento!);
          return orderDate >= monthStart && orderDate <= monthEnd;
        }) || [];

        return {
          date: format(month, "MMM yy", { locale: it }),
          ordini: monthOrders.length,
          valore: monthOrders.reduce((sum, o) => sum + (o.importo_totale || 0), 0) / 1000, // in k€
          consegnati: monthOrders.filter(o => o.stato === "consegnato").length,
        };
      });

      // Calculate Payment Trends (monthly by type)
      const paymentTrends: PaymentTrendData[] = monthsInterval.map(month => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const monthPayments = payments?.filter(p => {
          const paymentDate = new Date(p.data_pagamento);
          return paymentDate >= monthStart && paymentDate <= monthEnd;
        }) || [];

        const acconti = monthPayments.filter(p => p.tipo === "acconto").reduce((sum, p) => sum + p.importo, 0);
        const saldi = monthPayments.filter(p => p.tipo === "saldo").reduce((sum, p) => sum + p.importo, 0);
        const parziali = monthPayments.filter(p => p.tipo === "parziale").reduce((sum, p) => sum + p.importo, 0);

        return {
          month: format(month, "MMM yy", { locale: it }),
          acconti,
          saldi,
          parziali,
          totale: acconti + saldi + parziali,
        };
      });

      // Calculate Dealer Performance
      const dealerMap = new Map<string, {
        dealer: string;
        dealerId: string;
        ordini: number;
        valore: number;
        consegnati: number;
      }>();

      orders?.forEach(order => {
        const dealerName = order.dealers?.ragione_sociale || "N/A";
        const dealerId = order.dealer_id!;
        
        if (!dealerMap.has(dealerId)) {
          dealerMap.set(dealerId, {
            dealer: dealerName,
            dealerId,
            ordini: 0,
            valore: 0,
            consegnati: 0,
          });
        }

        const dealer = dealerMap.get(dealerId)!;
        dealer.ordini++;
        dealer.valore += order.importo_totale || 0;
        if (order.stato === "consegnato") {
          dealer.consegnati++;
        }
      });

      const dealerPerformance: DealerPerformance[] = Array.from(dealerMap.values())
        .map(d => ({
          dealer: d.dealer,
          dealerId: d.dealerId,
          ordini: d.ordini,
          valore: d.valore,
          ticketMedio: d.ordini > 0 ? d.valore / d.ordini : 0,
          tassoConsegna: d.ordini > 0 ? (d.consegnati / d.ordini) * 100 : 0,
        }))
        .sort((a, b) => b.valore - a.valore)
        .slice(0, 10); // Top 10 dealers

      // Calculate Summary
      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.reduce((sum, o) => sum + (o.importo_totale || 0), 0) || 0;
      const totalPayments = payments?.reduce((sum, p) => sum + p.importo, 0) || 0;
      const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const deliveredOrders = orders?.filter(o => o.stato === "consegnato").length || 0;
      const conversionRate = totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;

      const result: UnifiedAnalyticsData = {
        orderTrends,
        paymentTrends,
        dealerPerformance,
        summary: {
          totalOrders,
          totalRevenue,
          totalPayments,
          averageTicket,
          conversionRate,
        },
      };

      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minuti
  });
};
