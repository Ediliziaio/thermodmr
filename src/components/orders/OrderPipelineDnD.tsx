import { useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderPipelineCard } from "./OrderPipelineCard";
import { formatCurrency, getStatusLabel } from "@/lib/utils";
import { useUpdateOrderStatus } from "@/hooks/useOrders";
import type { OrderWithPaymentStats } from "@/types/orders";

const PIPELINE_STATUSES = [
  { key: "da_confermare", color: "bg-amber-500" },
  { key: "da_pagare_acconto", color: "bg-orange-500" },
  { key: "in_lavorazione", color: "bg-blue-500" },
  { key: "da_saldare", color: "bg-red-500" },
  { key: "da_consegnare", color: "bg-purple-500" },
  { key: "consegnato", color: "bg-green-500" },
] as const;

interface OrderPipelineDnDProps {
  orders: OrderWithPaymentStats[];
  isDealerArea?: boolean;
}

export function OrderPipelineDnD({ orders, isDealerArea }: OrderPipelineDnDProps) {
  const navigate = useNavigate();
  const updateStatus = useUpdateOrderStatus();
  const columnsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const dragDataRef = useRef<{ orderId: string; fromStatus: string } | null>(null);

  const grouped = useMemo(() => {
    const map: Record<string, OrderWithPaymentStats[]> = {};
    for (const s of PIPELINE_STATUSES) {
      map[s.key] = [];
    }
    for (const order of orders) {
      if (map[order.stato]) {
        map[order.stato].push(order);
      }
    }
    return map;
  }, [orders]);

  const handleDragStart = useCallback(
    (e: React.DragEvent, orderId: string, fromStatus: string) => {
      dragDataRef.current = { orderId, fromStatus };
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", orderId);
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetStatus: string) => {
      e.preventDefault();
      const drag = dragDataRef.current;
      if (!drag || drag.fromStatus === targetStatus) return;

      updateStatus.mutate({
        orderId: drag.orderId,
        stato: targetStatus,
      });
      dragDataRef.current = null;
    },
    [updateStatus]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).classList.add("ring-2", "ring-primary");
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).classList.remove("ring-2", "ring-primary");
  }, []);

  const handleDropCleanup = useCallback(
    (e: React.DragEvent, targetStatus: string) => {
      (e.currentTarget as HTMLElement).classList.remove("ring-2", "ring-primary");
      handleDrop(e, targetStatus);
    },
    [handleDrop]
  );

  return (
    <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: 400 }}>
      {PIPELINE_STATUSES.map((status) => {
        const columnOrders = grouped[status.key] || [];
        const totalValue = columnOrders.reduce(
          (s, o) => s + o.importo_totale,
          0
        );

        return (
          <div
            key={status.key}
            ref={(el) => {
              if (el) columnsRef.current.set(status.key, el);
            }}
            className="flex-shrink-0 w-[260px] flex flex-col rounded-lg border bg-muted/30 transition-all"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDropCleanup(e, status.key)}
          >
            {/* Column Header */}
            <div className="p-3 border-b space-y-1">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${status.color}`} />
                <span className="font-semibold text-sm">
                  {getStatusLabel(status.key)}
                </span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {columnOrders.length}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(totalValue)}
              </p>
            </div>

            {/* Cards */}
            <ScrollArea className="flex-1 p-2">
              <div className="space-y-2">
                {columnOrders.map((order) => (
                  <div
                    key={order.id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, order.id!, order.stato)
                    }
                  >
                    <OrderPipelineCard
                      order={order}
                      isDraggable
                      onClick={() =>
                        isDealerArea
                          ? navigate(`../ordini/${order.id}`, {
                              relative: "path",
                            })
                          : navigate(`/ordini/${order.id}`)
                      }
                    />
                  </div>
                ))}
                {columnOrders.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-6">
                    Trascina qui
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
}
