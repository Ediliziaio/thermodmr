import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useRecentOrders } from "@/hooks/useDashboard";
import { formatCurrency, getStatusColor, getStatusLabel, formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

export function RecentOrdersWidget() {
  const { data: orders, isLoading } = useRecentOrders(5);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 mb-2" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg md:text-xl">Attività Recente</CardTitle>
        </div>
        <CardDescription className="text-xs md:text-sm">Ultimi ordini aggiornati</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {orders && orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/ordini/${order.id}`)}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 cursor-pointer rounded-lg p-2 -mx-2 transition-colors hover:bg-accent/50"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{order.id}</p>
                    <Badge className={getStatusColor(order.stato)} variant="outline">
                      {getStatusLabel(order.stato)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{order.dealer_name}</p>
                </div>
                <div className="text-right ml-3 shrink-0">
                  <p className="font-semibold text-sm">{formatCurrency(order.importo_totale)}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(order.updated_at, "dd/MM HH:mm")}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">Nessun ordine recente</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
