import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Euro, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import { useDashboardKPIs, useRevenueData } from "@/hooks/useDashboard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrderStatusPieChart } from "@/components/dashboard/OrderStatusPieChart";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";

export default function Dashboard() {
  const { data: kpis, isLoading: kpisLoading, error: kpisError } = useDashboardKPIs();
  const { data: revenueData, isLoading: revenueLoading } = useRevenueData(6);

  if (kpisLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[400px]" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  if (kpisError || !kpis) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Errore nel caricamento dei dati</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Panoramica generale degli ordini e delle performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Ricavi Totali</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {kpis.totalOrders} ordini totali
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Acconti Totali</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.totalAcconti)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Da ordini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Totale Incassato</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.totalIncassato)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pagamenti ricevuti
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Da Saldare</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.daSaldare)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {kpis.totalRevenue > 0 ? ((kpis.daSaldare / kpis.totalRevenue) * 100).toFixed(1) : 0}% del totale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {revenueLoading ? (
          <Skeleton className="h-[400px]" />
        ) : (
          <RevenueChart data={revenueData || []} />
        )}
        <OrderStatusPieChart
          data={Object.entries(kpis.ordersByStatus).map(([status, count]) => ({
            name: getStatusLabel(status),
            value: count,
            color: getStatusColor(status).includes('yellow') ? 'hsl(var(--chart-1))' :
                   getStatusColor(status).includes('orange') ? 'hsl(var(--chart-2))' :
                   getStatusColor(status).includes('blue') ? 'hsl(var(--chart-3))' :
                   getStatusColor(status).includes('purple') ? 'hsl(var(--chart-4))' :
                   'hsl(var(--chart-5))',
          }))}
        />
      </div>

      {/* Orders by Status */}
      <Card>
        <CardHeader>
          <CardTitle>Ordini per Stato</CardTitle>
          <CardDescription>Distribuzione degli ordini nelle varie fasi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {Object.entries(kpis.ordersByStatus).map(([status, count]) => (
              <Badge
                key={status}
                variant="outline"
                className={getStatusColor(status)}
              >
                {getStatusLabel(status)}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Dealers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Rivenditori</CardTitle>
          <CardDescription>I 5 rivenditori con più fatturato</CardDescription>
        </CardHeader>
        <CardContent>
          {kpis.topDealers.length > 0 ? (
            <div className="space-y-4">
              {kpis.topDealers.map((dealer) => (
                <div
                  key={dealer.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{dealer.ragione_sociale}</p>
                    <p className="text-sm text-muted-foreground">
                      {dealer.ordersCount} ordini
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold">{formatCurrency(dealer.totalRevenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nessun dato disponibile</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
