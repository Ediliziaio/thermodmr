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
          // Batch invalidation: ordini + dipendenze
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
          queryClient.invalidateQueries({ queryKey: ["order"] });
          queryClient.invalidateQueries({ queryKey: ["allPayments"] });
          queryClient.invalidateQueries({ queryKey: ["payments-infinite"] });
          queryClient.invalidateQueries({ queryKey: ["order-payments"] });
          queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
          queryClient.invalidateQueries({ queryKey: ["upcoming-deadlines"] });
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
          queryClient.invalidateQueries({ queryKey: ["allPayments"] });
          queryClient.invalidateQueries({ queryKey: ["payments-infinite"] });
          queryClient.invalidateQueries({ queryKey: ["order-payments"] });
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
          queryClient.invalidateQueries({ queryKey: ["order"] });
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
          queryClient.invalidateQueries({ queryKey: ["dealers-infinite"] });
          queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};
