import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, TrendingUp, Euro, Package, Clock, Target, Calendar } from "lucide-react";
import { useAnalytics, PeriodFilter } from "@/hooks/useAnalytics";
import { MetricCard } from "@/components/analytics/MetricCard";
import { ConversionFunnelChart } from "@/components/analytics/ConversionFunnelChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

export default function Analytics() {
  const [period, setPeriod] = useState<PeriodFilter>("month");
  const { data: analytics, isLoading, error } = useAnalytics(period);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  const formatCurrencyFull = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Errore nel caricamento dei dati</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Avanzate</h1>
          <p className="text-muted-foreground mt-1">
            Analisi dettagliate con comparazione periodo precedente
          </p>
        </div>
        <Select value={period} onValueChange={(value) => setPeriod(value as PeriodFilter)}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Oggi</SelectItem>
            <SelectItem value="week">Questa Settimana</SelectItem>
            <SelectItem value="month">Questo Mese</SelectItem>
            <SelectItem value="quarter">Questo Trimestre</SelectItem>
            <SelectItem value="year">Quest'Anno</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metric Cards with Comparison */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Ordini Totali"
          value={analytics.current.totalOrders}
          change={analytics.comparison.ordersChange}
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Ricavi Totali"
          value={formatCurrency(analytics.current.totalRevenue)}
          change={analytics.comparison.revenueChange}
          icon={<Euro className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Totale Incassato"
          value={formatCurrency(analytics.current.totalPaid)}
          change={analytics.comparison.paidChange}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Ticket Medio"
          value={formatCurrency(analytics.current.averageOrderValue)}
          change={analytics.comparison.aovChange}
          icon={<Euro className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Tasso di Conversione"
          value={`${analytics.current.conversionRate.toFixed(1)}%`}
          change={analytics.comparison.conversionChange}
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
          formatAsPercentage
        />
        <MetricCard
          title="Giorni Medi Consegna"
          value={`${analytics.current.averageDaysToDelivery.toFixed(0)} gg`}
          change={analytics.comparison.daysChange}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <ConversionFunnelChart data={analytics.conversionFunnel} />
        <RevenueChart data={analytics.revenueByMonth.map(m => ({
          month: m.month,
          ricavi: m.revenue,
          acconti: 0,
          incassato: m.paid
        }))} />
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Dettaglio Ordini per Stato</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(analytics.current.ordersByStatus).map(([status, count]) => {
              const labels: Record<string, string> = {
                da_confermare: "Da Confermare",
                da_pagare_acconto: "Da Pagare Acconto",
                in_lavorazione: "In Lavorazione",
                da_consegnare: "Da Consegnare",
                consegnato: "Consegnato",
              };
              const percentage = analytics.current.totalOrders > 0
                ? ((count / analytics.current.totalOrders) * 100).toFixed(1)
                : 0;
              
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-32 text-sm font-medium">{labels[status] || status}</div>
                    <div className="flex-1 bg-muted rounded-full h-2 w-64">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{percentage}%</span>
                    <span className="text-sm font-semibold min-w-[3rem] text-right">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Period Comparison Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Riepilogo Comparazione</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">Periodo Corrente</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ordini:</span>
                  <span className="font-medium">{analytics.current.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ricavi:</span>
                  <span className="font-medium">{formatCurrencyFull(analytics.current.totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Incassato:</span>
                  <span className="font-medium">{formatCurrencyFull(analytics.current.totalPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ticket Medio:</span>
                  <span className="font-medium">{formatCurrencyFull(analytics.current.averageOrderValue)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Periodo Precedente</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ordini:</span>
                  <span className="font-medium">{analytics.previous.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ricavi:</span>
                  <span className="font-medium">{formatCurrencyFull(analytics.previous.totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Incassato:</span>
                  <span className="font-medium">{formatCurrencyFull(analytics.previous.totalPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ticket Medio:</span>
                  <span className="font-medium">{formatCurrencyFull(analytics.previous.averageOrderValue)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
