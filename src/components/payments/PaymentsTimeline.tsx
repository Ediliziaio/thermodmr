import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { PaymentWithDetails } from "@/lib/paymentConstants";
import { getTipoBadgeColor, getMetodoIcon } from "@/lib/paymentConstants";

interface PaymentsTimelineProps {
  payments: PaymentWithDetails[];
  onViewOrder: (orderId: string) => void;
}

export function PaymentsTimeline({ payments, onViewOrder }: PaymentsTimelineProps) {
  // Raggruppa pagamenti per data con useMemo
  const groupedByDate = useMemo(() => {
    return payments.reduce((acc, payment) => {
      const date = new Date(payment.data_pagamento + "T00:00:00").toLocaleDateString("it-IT");
      if (!acc[date]) acc[date] = [];
      acc[date].push(payment);
      return acc;
    }, {} as Record<string, PaymentWithDetails[]>);
  }, [payments]);

  return (
    <div className="space-y-6">
      {Object.entries(groupedByDate).map(([date, dayPayments]) => {
        const dailyTotal = dayPayments.reduce((sum, p) => sum + p.importo, 0);

        return (
          <div key={date}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">{date}</span>
                <span className="text-xs text-muted-foreground">
                  ({dayPayments.length} {dayPayments.length === 1 ? "pagamento" : "pagamenti"})
                </span>
                <span className="text-sm font-semibold">{formatCurrency(dailyTotal)}</span>
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-2">
              {dayPayments.map((payment) => (
                <Card key={payment.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={getTipoBadgeColor(payment.tipo)}>
                          {payment.tipo.toUpperCase()}
                        </Badge>
                        <div>
                          <p className="font-medium">{payment.orders.dealers.ragione_sociale}</p>
                          <button
                            onClick={() => onViewOrder(payment.ordine_id)}
                            className="text-sm text-primary hover:underline"
                          >
                            Ordine: {payment.ordine_id}
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatCurrency(payment.importo)}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {getMetodoIcon(payment.metodo)} {payment.metodo}
                        </p>
                      </div>
                    </div>
                    {payment.riferimento && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Riferimento: <span className="font-mono">{payment.riferimento}</span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
