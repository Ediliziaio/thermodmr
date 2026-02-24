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
        () => {
          
          // Invalida queries ordini
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
          queryClient.invalidateQueries({ queryKey: ["order"] }); // Dettaglio ordine
          
          // Invalida queries pagamenti (perché dipendono da orders.stato, orders.dealers)
          queryClient.invalidateQueries({ queryKey: ["allPayments"] });
          queryClient.invalidateQueries({ queryKey: ["payments-infinite"] });
          queryClient.invalidateQueries({ queryKey: ["order-payments"] }); // Fix: era orderPayments
          
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
        () => {
          
          // Invalida queries pagamenti
          queryClient.invalidateQueries({ queryKey: ["allPayments"] });
          queryClient.invalidateQueries({ queryKey: ["payments-infinite"] });
          queryClient.invalidateQueries({ queryKey: ["order-payments"] }); // Fix: era orderPayments
          
          // Invalida queries ordini (perché cambiano importi pagati/da pagare)
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
          queryClient.invalidateQueries({ queryKey: ["order"] }); // Dettaglio ordine
          
          // Invalida dashboard
          queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
          queryClient.invalidateQueries({ queryKey: ["revenue-data"] });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "dealers",
        },
        () => {
          
          // Invalida queries dealers
          queryClient.invalidateQueries({ queryKey: ["dealers-infinite"] });
          
          // Invalida dashboard (per top dealers)
          queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};
