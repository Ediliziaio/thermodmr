import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook per gestire gli aggiornamenti real-time della dashboard
 * Invalida le query React Query quando cambiano ordini, pagamenti, provvigioni o dealers
 */
export const useRealtimeDashboard = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Crea un canale per ascoltare tutti i cambiamenti
    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          // Invalida le query relative agli ordini
          queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
          queryClient.invalidateQueries({ queryKey: ["revenue-data"] });
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
          // Invalida le query relative ai pagamenti
          queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
          queryClient.invalidateQueries({ queryKey: ["revenue-data"] });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "commissions",
        },
        () => {
          // Invalida le query relative alle provvigioni
          queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
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
          // Invalida le query relative ai dealers
          queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
        }
      )
      .subscribe();

    // Cleanup alla unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};
