import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Euro, TrendingUp, Package, Clock, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useDashboardKPIs } from "@/hooks/useDashboard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrderStatusPieChart } from "@/components/dashboard/OrderStatusPieChart";

export default function Dashboard() {
  const { data: kpis, isLoading, error } = useDashboardKPIs();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      da_confermare: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      da_pagare_acconto: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
      in_lavorazione: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      da_consegnare: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      consegnato: "bg-green-500/10 text-green-700 dark:text-green-400",
    };
    return colors[status] || "bg-gray-500/10 text-gray-700 dark:text-gray-400";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      da_confermare: "Da Confermare",
      da_pagare_acconto: "Da Pagare Acconto",
      in_lavorazione: "In Lavorazione",
      da_consegnare: "Da Consegnare",
      consegnato: "Consegnato",
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !kpis) {
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
        <RevenueChart
          data={[
            { month: "Lug", ricavi: 45000, acconti: 15000, incassato: 12000 },
            { month: "Ago", ricavi: 52000, acconti: 18000, incassato: 16000 },
            { month: "Set", ricavi: 61000, acconti: 22000, incassato: 19000 },
            { month: "Ott", ricavi: 68000, acconti: 24000, incassato: 22000 },
            { month: "Nov", ricavi: 75000, acconti: 28000, incassato: 25000 },
            { month: "Dic", ricavi: kpis.totalRevenue, acconti: kpis.totalAcconti, incassato: kpis.totalIncassato },
          ]}
        />
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
