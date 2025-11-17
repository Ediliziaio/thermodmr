import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook per sincronizzare Ordini e Pagamenti in real-time
 * Invalida le query di entrambe le sezioni quando cambiano dati collegati
 */
export const useRealtimeSync = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("orders-payments-sync")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          console.log("🔄 Orders changed:", payload);
          
          // Invalida queries ordini
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
          
          // Invalida queries pagamenti (perché dipendono da orders.stato, orders.dealers)
          queryClient.invalidateQueries({ queryKey: ["allPayments"] });
          queryClient.invalidateQueries({ queryKey: ["orderPayments"] });
          
          // Invalida dashboard
          queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "payments",
        },
        (payload) => {
          console.log("💰 Payments changed:", payload);
          
          // Invalida queries pagamenti
          queryClient.invalidateQueries({ queryKey: ["allPayments"] });
          queryClient.invalidateQueries({ queryKey: ["orderPayments"] });
          
          // Invalida queries ordini (perché cambiano importi pagati/da pagare)
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
          
          // Invalida dashboard
          queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
          queryClient.invalidateQueries({ queryKey: ["revenue-data"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};
