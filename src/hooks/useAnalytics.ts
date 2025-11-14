import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, endOfDay, subDays, subWeeks, subMonths, subQuarters, subYears, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from "date-fns";

export type PeriodFilter = "today" | "week" | "month" | "quarter" | "year" | "custom";

interface DateRange {
  from: Date;
  to: Date;
}

interface AnalyticsData {
  current: {
    totalOrders: number;
    totalRevenue: number;
    totalPaid: number;
    averageOrderValue: number;
    conversionRate: number;
    averageDaysToDelivery: number;
    ordersByStatus: Record<string, number>;
  };
  previous: {
    totalOrders: number;
    totalRevenue: number;
    totalPaid: number;
    averageOrderValue: number;
    conversionRate: number;
    averageDaysToDelivery: number;
  };
  comparison: {
    ordersChange: number;
    revenueChange: number;
    paidChange: number;
    aovChange: number;
    conversionChange: number;
    daysChange: number;
  };
  conversionFunnel: Array<{
    stage: string;
    count: number;
    rate: number;
  }>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
    paid: number;
  }>;
}

const getDateRange = (period: PeriodFilter, customRange?: DateRange): { current: DateRange; previous: DateRange } => {
  const now = new Date();
  
  let currentFrom: Date;
  let currentTo: Date;
  
  switch (period) {
    case "today":
      currentFrom = startOfDay(now);
      currentTo = endOfDay(now);
      break;
    case "week":
      currentFrom = startOfWeek(now, { weekStartsOn: 1 });
      currentTo = endOfWeek(now, { weekStartsOn: 1 });
      break;
    case "month":
      currentFrom = startOfMonth(now);
      currentTo = endOfMonth(now);
      break;
    case "quarter":
      currentFrom = startOfQuarter(now);
      currentTo = endOfQuarter(now);
      break;
    case "year":
      currentFrom = startOfYear(now);
      currentTo = endOfYear(now);
      break;
    case "custom":
      if (!customRange) throw new Error("Custom range required");
      currentFrom = customRange.from;
      currentTo = customRange.to;
      break;
  }
  
  const daysDiff = Math.ceil((currentTo.getTime() - currentFrom.getTime()) / (1000 * 60 * 60 * 24));
  const previousFrom = subDays(currentFrom, daysDiff);
  const previousTo = subDays(currentTo, daysDiff);
  
  return {
    current: { from: currentFrom, to: currentTo },
    previous: { from: previousFrom, to: previousTo }
  };
};

const calculateMetrics = (orders: any[], payments: any[]) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.importo_totale || 0), 0);
  const totalPaid = payments.reduce((sum, p) => sum + (p.importo || 0), 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const deliveredOrders = orders.filter(o => o.stato === 'consegnato');
  const conversionRate = totalOrders > 0 ? (deliveredOrders.length / totalOrders) * 100 : 0;
  
  const ordersWithDates = orders.filter(o => o.stato === 'consegnato' && o.data_inserimento);
  const averageDaysToDelivery = ordersWithDates.length > 0
    ? ordersWithDates.reduce((sum, o) => {
        const days = Math.ceil((new Date(o.updated_at).getTime() - new Date(o.data_inserimento).getTime()) / (1000 * 60 * 60 * 24));
        return sum + days;
      }, 0) / ordersWithDates.length
    : 0;
  
  const ordersByStatus = orders.reduce((acc, o) => {
    acc[o.stato] = (acc[o.stato] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalOrders,
    totalRevenue,
    totalPaid,
    averageOrderValue,
    conversionRate,
    averageDaysToDelivery,
    ordersByStatus
  };
};

export const useAnalytics = (period: PeriodFilter, customRange?: DateRange) => {
  return useQuery({
    queryKey: ["analytics", period, customRange],
    queryFn: async (): Promise<AnalyticsData> => {
      const { current, previous } = getDateRange(period, customRange);
      
      // Fetch current period orders
      const { data: currentOrders, error: currentOrdersError } = await supabase
        .from("orders")
        .select("*")
        .gte("data_inserimento", current.from.toISOString())
        .lte("data_inserimento", current.to.toISOString());
      
      if (currentOrdersError) throw currentOrdersError;
      
      // Fetch previous period orders
      const { data: previousOrders, error: previousOrdersError } = await supabase
        .from("orders")
        .select("*")
        .gte("data_inserimento", previous.from.toISOString())
        .lte("data_inserimento", previous.to.toISOString());
      
      if (previousOrdersError) throw previousOrdersError;
      
      // Fetch current period payments
      const { data: currentPayments, error: currentPaymentsError } = await supabase
        .from("payments")
        .select("*")
        .gte("data_pagamento", current.from.toISOString().split('T')[0])
        .lte("data_pagamento", current.to.toISOString().split('T')[0]);
      
      if (currentPaymentsError) throw currentPaymentsError;
      
      // Fetch previous period payments
      const { data: previousPayments, error: previousPaymentsError } = await supabase
        .from("payments")
        .select("*")
        .gte("data_pagamento", previous.from.toISOString().split('T')[0])
        .lte("data_pagamento", previous.to.toISOString().split('T')[0]);
      
      if (previousPaymentsError) throw previousPaymentsError;
      
      const currentMetrics = calculateMetrics(currentOrders || [], currentPayments || []);
      const previousMetrics = calculateMetrics(previousOrders || [], previousPayments || []);
      
      // Calculate comparison percentages
      const comparison = {
        ordersChange: previousMetrics.totalOrders > 0 
          ? ((currentMetrics.totalOrders - previousMetrics.totalOrders) / previousMetrics.totalOrders) * 100 
          : 0,
        revenueChange: previousMetrics.totalRevenue > 0
          ? ((currentMetrics.totalRevenue - previousMetrics.totalRevenue) / previousMetrics.totalRevenue) * 100
          : 0,
        paidChange: previousMetrics.totalPaid > 0
          ? ((currentMetrics.totalPaid - previousMetrics.totalPaid) / previousMetrics.totalPaid) * 100
          : 0,
        aovChange: previousMetrics.averageOrderValue > 0
          ? ((currentMetrics.averageOrderValue - previousMetrics.averageOrderValue) / previousMetrics.averageOrderValue) * 100
          : 0,
        conversionChange: currentMetrics.conversionRate - previousMetrics.conversionRate,
        daysChange: previousMetrics.averageDaysToDelivery > 0
          ? ((currentMetrics.averageDaysToDelivery - previousMetrics.averageDaysToDelivery) / previousMetrics.averageDaysToDelivery) * 100
          : 0,
      };
      
      // Conversion funnel
      const statuses = ['da_confermare', 'da_pagare_acconto', 'in_lavorazione', 'da_consegnare', 'consegnato'];
      const conversionFunnel = statuses.map((status, index) => {
        const count = currentMetrics.ordersByStatus[status] || 0;
        const previousCount = index > 0 ? (currentMetrics.ordersByStatus[statuses[index - 1]] || currentMetrics.totalOrders) : currentMetrics.totalOrders;
        const rate = previousCount > 0 ? (count / previousCount) * 100 : 0;
        return { stage: status, count, rate };
      });
      
      // Revenue by month (last 6 months from current period)
      const { data: monthlyOrders } = await supabase
        .from("orders")
        .select("importo_totale, data_inserimento")
        .gte("data_inserimento", subMonths(current.to, 6).toISOString())
        .lte("data_inserimento", current.to.toISOString());
      
      const { data: monthlyPayments } = await supabase
        .from("payments")
        .select("importo, data_pagamento")
        .gte("data_pagamento", subMonths(current.to, 6).toISOString().split('T')[0])
        .lte("data_pagamento", current.to.toISOString().split('T')[0]);
      
      const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
        const monthDate = subMonths(current.to, 5 - i);
        const monthStart = startOfMonth(monthDate);
        const monthEnd = endOfMonth(monthDate);
        
        const monthRevenue = (monthlyOrders || [])
          .filter(o => {
            const orderDate = new Date(o.data_inserimento);
            return orderDate >= monthStart && orderDate <= monthEnd;
          })
          .reduce((sum, o) => sum + (o.importo_totale || 0), 0);
        
        const monthPaid = (monthlyPayments || [])
          .filter(p => {
            const paymentDate = new Date(p.data_pagamento);
            return paymentDate >= monthStart && paymentDate <= monthEnd;
          })
          .reduce((sum, p) => sum + (p.importo || 0), 0);
        
        return {
          month: monthDate.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' }),
          revenue: monthRevenue,
          paid: monthPaid,
        };
      });
      
      return {
        current: currentMetrics,
        previous: previousMetrics,
        comparison,
        conversionFunnel,
        revenueByMonth,
      };
    },
  });
};
