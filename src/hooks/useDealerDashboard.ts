import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DealerOrderStats {
  totalOrders: number;
  ordersByStatus: {
    da_confermare: number;
    da_pagare_acconto: number;
    in_lavorazione: number;
    da_consegnare: number;
    consegnato: number;
  };
  totalRevenue: number;
  totalPaid: number;
  totalRemaining: number;
}

interface RecentActivity {
  id: string;
  type: "status_change" | "payment" | "new_order";
  orderId: string;
  message: string;
  timestamp: Date;
  isNew: boolean;
}

export const useDealerOrderStats = (dealerId?: string) => {
  return useQuery({
    queryKey: ["dealer-order-stats", dealerId],
    queryFn: async (): Promise<DealerOrderStats> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get orders for this dealer
      let query = supabase
        .from("orders_with_payment_stats")
        .select("*");
      
      if (dealerId) {
        query = query.eq("dealer_id", dealerId);
      } else {
        query = query.eq("creato_da_user_id", user.id);
      }
      
      const { data: orders, error } = await query;

      if (error) throw error;

      // Calculate stats
      const stats: DealerOrderStats = {
        totalOrders: orders.length,
        ordersByStatus: {
          da_confermare: 0,
          da_pagare_acconto: 0,
          in_lavorazione: 0,
          da_consegnare: 0,
          consegnato: 0,
        },
        totalRevenue: 0,
        totalPaid: 0,
        totalRemaining: 0,
      };

      orders.forEach((order) => {
        stats.ordersByStatus[order.stato as keyof typeof stats.ordersByStatus]++;
        stats.totalRevenue += Number(order.importo_totale);
        stats.totalPaid += Number(order.importo_pagato || 0);
      });

      stats.totalRemaining = stats.totalRevenue - stats.totalPaid;

      return stats;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useRecentActivity = (dealerId?: string) => {
  return useQuery({
    queryKey: ["dealer-recent-activity", dealerId],
    queryFn: async (): Promise<RecentActivity[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get recent orders with their latest updates
      let query = supabase
        .from("orders")
        .select("id, stato, updated_at, created_at");
      
      if (dealerId) {
        query = query.eq("dealer_id", dealerId);
      } else {
        query = query.eq("creato_da_user_id", user.id);
      }
      
      const { data: orders, error } = await query
        .order("updated_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      const activities: RecentActivity[] = [];

      // Check for recent status changes (within last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      orders.forEach((order) => {
        const updatedAt = new Date(order.updated_at);
        const createdAt = new Date(order.created_at);
        
        // If order was updated recently and it's not just created
        if (updatedAt > sevenDaysAgo && updatedAt.getTime() !== createdAt.getTime()) {
          activities.push({
            id: `status-${order.id}`,
            type: "status_change",
            orderId: order.id,
            message: `Ordine ${order.id} aggiornato a stato: ${getStatusLabel(order.stato)}`,
            timestamp: updatedAt,
            isNew: updatedAt > new Date(Date.now() - 24 * 60 * 60 * 1000), // New if within 24h
          });
        }
      });

      // Get recent payments
      const { data: payments, error: paymentsError } = await supabase
        .from("payments")
        .select("id, ordine_id, importo, created_at")
        .in("ordine_id", orders.map(o => o.id))
        .order("created_at", { ascending: false })
        .limit(5);

      if (!paymentsError && payments) {
        payments.forEach((payment) => {
          const createdAt = new Date(payment.created_at);
          if (createdAt > sevenDaysAgo) {
            activities.push({
              id: `payment-${payment.id}`,
              type: "payment",
              orderId: payment.ordine_id,
              message: `Pagamento di €${Number(payment.importo).toFixed(2)} registrato per ordine ${payment.ordine_id}`,
              timestamp: createdAt,
              isNew: createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000),
            });
          }
        });
      }

      // Sort by timestamp
      activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      return activities;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const usePaymentReminders = (dealerId?: string) => {
  return useQuery({
    queryKey: ["dealer-payment-reminders", dealerId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get orders that need payment
      let query = supabase
        .from("orders_with_payment_stats")
        .select("*");
      
      if (dealerId) {
        query = query.eq("dealer_id", dealerId);
      } else {
        query = query.eq("creato_da_user_id", user.id);
      }
      
      const { data: orders, error } = await query
        .in("stato", ["da_pagare_acconto", "in_lavorazione", "da_consegnare"])
        .gt("importo_da_pagare", 0)
        .order("data_inserimento", { ascending: false });

      if (error) throw error;

      return orders.map(order => ({
        orderId: order.id,
        stato: order.stato,
        totalAmount: Number(order.importo_totale),
        paidAmount: Number(order.importo_pagato || 0),
        remainingAmount: Number(order.importo_da_pagare || 0),
        percentage: Number(order.percentuale_pagata || 0),
        lastPaymentDate: order.data_ultimo_pagamento ? new Date(order.data_ultimo_pagamento) : null,
        orderDate: new Date(order.data_inserimento),
      }));
    },
    staleTime: 2 * 60 * 1000,
  });
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    da_confermare: "Da Confermare",
    da_pagare_acconto: "Da Pagare Acconto",
    in_lavorazione: "In Lavorazione",
    da_consegnare: "Da Consegnare",
    consegnato: "Consegnato",
  };
  return labels[status] || status;
};
