import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook per sincronizzare Ordini e Pagamenti in real-time
 * Con debounce per evitare invalidazioni massive
 */
export const useRealtimeSync = () => {
  const queryClient = useQueryClient();
  const debounceTimerRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const debouncedInvalidate = useCallback((keys: string[][], delay = 300) => {
    const batchKey = keys.map(k => k.join("-")).join("|");
    
    if (debounceTimerRef.current[batchKey]) {
      clearTimeout(debounceTimerRef.current[batchKey]);
    }
    
    debounceTimerRef.current[batchKey] = setTimeout(() => {
      keys.forEach(key => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      delete debounceTimerRef.current[batchKey];
    }, delay);
  }, [queryClient]);

  useEffect(() => {
    const channel = supabase
      .channel("orders-payments-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          debouncedInvalidate([
            ["orders"],
            ["orders-infinite"],
            ["order"],
            ["dashboard-kpis"],
            ["upcoming-deadlines"],
            ["dealer-order-stats"],
            ["dealer-recent-activity"],
            ["dealer-payment-reminders"],
            ["dealers-infinite"],
            ["dealer-detail"],
          ]);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "payments" },
        () => {
          debouncedInvalidate([
            ["allPayments"],
            ["payments-infinite"],
            ["order-payments"],
            ["dashboard-kpis"],
            ["revenue-data"],
            ["dealer-order-stats"],
            ["dealer-payment-reminders"],
            ["dealer-recent-activity"],
            ["dealers-infinite"],
          ]);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "dealers" },
        () => {
          debouncedInvalidate([
            ["dealers-infinite"],
            ["dashboard-kpis"],
          ], 500);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "support_tickets" },
        () => {
          debouncedInvalidate([
            ["tickets"],
          ], 400);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ticket_messages" },
        () => {
          debouncedInvalidate([
            ["ticket-messages"],
          ], 200);
        }
      )
      .subscribe();

    return () => {
      // Clear all pending debounce timers
      Object.values(debounceTimerRef.current).forEach(clearTimeout);
      debounceTimerRef.current = {};
      supabase.removeChannel(channel);
    };
  }, [queryClient, debouncedInvalidate]);
};
