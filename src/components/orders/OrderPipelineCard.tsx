import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CalendarDays } from "lucide-react";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import type { OrderWithPaymentStats } from "@/types/orders";

interface OrderPipelineCardProps {
  order: OrderWithPaymentStats;
  onClick: () => void;
  isDraggable?: boolean;
}

export const OrderPipelineCard = React.memo(function OrderPipelineCard({
  order,
  onClick,
  isDraggable,
}: OrderPipelineCardProps) {
  const isOverdue =
    order.data_consegna_prevista &&
    new Date(order.data_consegna_prevista) < new Date();
  const hasBalance =
    order.importo_da_pagare > 0 && order.stato !== "consegnato";

  return (
    <Card
      className={`cursor-pointer hover:shadow-md transition-shadow ${isDraggable ? "cursor-grab active:cursor-grabbing" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-3 space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">{order.id}</p>
          {(isOverdue || hasBalance) && (
            <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
          )}
        </div>

        {/* Dealer */}
        <p className="text-xs text-muted-foreground truncate">
          {order.dealers?.ragione_sociale || "-"}
        </p>

        {/* Importo + barra pagamento */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium">
              {formatCurrency(order.importo_totale)}
            </span>
            <span className="text-muted-foreground">
              {(order.percentuale_pagata ?? 0).toFixed(0)}%
            </span>
          </div>
          <Progress
            value={order.percentuale_pagata ?? 0}
            className="h-1.5"
          />
        </div>

        {/* Footer: settimana + da pagare */}
        <div className="flex items-center justify-between text-xs">
          {order.settimana_consegna ? (
            <div className="flex items-center gap-1 text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              <span className="font-mono">W{order.settimana_consegna}</span>
            </div>
          ) : (
            <span />
          )}
          {hasBalance && (
            <span className="text-destructive font-medium">
              -{formatCurrency(order.importo_da_pagare)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
