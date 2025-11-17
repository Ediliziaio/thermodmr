import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface PaymentWithDetails {
  id: string;
  tipo: string;
  importo: number;
  metodo: string;
  data_pagamento: string;
  riferimento: string | null;
  ordine_id: string;
  orders: {
    id: string;
    stato: string;
    importo_totale: number;
    dealer_id: string;
    dealers: {
      ragione_sociale: string;
    };
  };
}

interface PaymentsTimelineProps {
  payments: PaymentWithDetails[];
  onViewOrder: (orderId: string) => void;
}

export function PaymentsTimeline({ payments, onViewOrder }: PaymentsTimelineProps) {
  // Raggruppa pagamenti per data
  const groupedByDate = payments.reduce((acc, payment) => {
    const date = new Date(payment.data_pagamento).toLocaleDateString('it-IT');
    if (!acc[date]) acc[date] = [];
    acc[date].push(payment);
    return acc;
  }, {} as Record<string, PaymentWithDetails[]>);

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "acconto": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "saldo": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "parziale": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getMetodoIcon = (metodo: string) => {
    const icons: Record<string, string> = {
      bonifico: "🏦",
      carta: "💳",
      contanti: "💵",
      assegno: "📝"
    };
    return icons[metodo.toLowerCase()] || "💰";
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedByDate).map(([date, dayPayments]) => {
        const dailyTotal = dayPayments.reduce((sum, p) => sum + p.importo, 0);
        
        return (
          <div key={date}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {date}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({dayPayments.length} {dayPayments.length === 1 ? 'pagamento' : 'pagamenti'})
                </span>
                <span className="text-sm font-semibold">
                  {formatCurrency(dailyTotal)}
                </span>
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
