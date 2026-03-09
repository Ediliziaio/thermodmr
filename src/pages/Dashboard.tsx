import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Euro, TrendingUp, Minus, CheckCircle, AlertCircle, Radio, CalendarIcon, RefreshCw, ArrowUp, ArrowDown } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, subMonths, startOfMonth, endOfMonth, startOfYear, endOfYear, subYears } from "date-fns";
import { it } from "date-fns/locale";
import { useDashboardKPIs, useRevenueData } from "@/hooks/useDashboard";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrderStatusPieChart } from "@/components/dashboard/OrderStatusPieChart";
import { DeadlinesWidget } from "@/components/dashboard/DeadlinesWidget";
import { RecentOrdersWidget } from "@/components/dashboard/RecentOrdersWidget";
import { CollectionProgressBar } from "@/components/dashboard/CollectionProgressBar";
import { StatusBadgesRow } from "@/components/dashboard/StatusBadgesRow";
import { formatCurrency, getStatusLabel, cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const STATUS_CHART_COLORS: Record<string, string> = {
  da_confermare: "hsl(38, 92%, 50%)",
  da_pagare_acconto: "hsl(25, 95%, 53%)",
  in_lavorazione: "hsl(217, 91%, 60%)",
  da_saldare: "hsl(0, 84%, 60%)",
  da_consegnare: "hsl(271, 91%, 65%)",
  consegnato: "hsl(142, 71%, 45%)",
};

const FILTER_LABELS: Record<string, string> = {
  "3months": "Ultimi 3 Mesi",
  "6months": "Ultimi 6 Mesi",
  year: `Anno ${new Date().getFullYear()}`,
  lastyear: `Anno ${new Date().getFullYear() - 1}`,
  all: "Tutto",
};

function DeltaIndicator({ value }: { value: number }) {
  if (value === 0) return <Minus className="h-3 w-3 text-muted-foreground" />;
  const isPositive = value > 0;
  return (
    <span className={cn("flex items-center gap-0.5 text-xs font-medium",
      isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
    )}>
      {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export default function Dashboard() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const now = new Date();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfYear(now),
    to: endOfYear(now),
  });
  const [activeFilter, setActiveFilter] = useState<string | null>("year");
  
  useRealtimeSync();
  
  const { data: kpis, isLoading: kpisLoading, error: kpisError, refetch } = useDashboardKPIs(
    dateRange?.from,
    dateRange?.to
  );
  const { data: revenueData, isLoading: revenueLoading } = useRevenueData(
    dateRange?.from,
    dateRange?.to
  );

  const setQuickFilter = (type: '3months' | '6months' | 'year' | 'lastyear' | 'all') => {
    const n = new Date();
    setActiveFilter(type);
    if (type === 'all') {
      setDateRange(undefined);
      return;
    }
    switch (type) {
      case '3months':
        setDateRange({ from: startOfMonth(subMonths(n, 3)), to: n });
        break;
      case '6months':
        setDateRange({ from: startOfMonth(subMonths(n, 6)), to: n });
        break;
      case 'year':
        setDateRange({ from: startOfYear(n), to: endOfYear(n) });
        break;
      case 'lastyear':
        setDateRange({ from: startOfYear(subYears(n, 1)), to: endOfYear(subYears(n, 1)) });
        break;
    }
  };

  const formatDateRange = () => {
    if (!dateRange?.from) return null;
    if (!dateRange.to) {
      return format(dateRange.from, isMobile ? "dd/MM" : "dd MMM yyyy", { locale: it });
    }
    if (isMobile) {
      return `${format(dateRange.from, "dd/MM", { locale: it })} - ${format(dateRange.to, "dd/MM", { locale: it })}`;
    }
    return `${format(dateRange.from, "dd MMM yyyy", { locale: it })} - ${format(dateRange.to, "dd MMM yyyy", { locale: it })}`;
  };

  const revenueChartDescription = activeFilter
    ? FILTER_LABELS[activeFilter] || "Periodo personalizzato"
    : "Ultimi 6 mesi";

  if (kpisLoading) {
    return (
      <div className="space-y-8 p-4 md:p-6">
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
      <div className="flex items-center justify-center min-h-[400px] p-4 md:p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
            <CardTitle>Errore nel caricamento</CardTitle>
            <CardDescription>
              Impossibile caricare i dati della dashboard. Verifica la connessione e riprova.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => refetch()} variant="default">
              <RefreshCw className="h-4 w-4 mr-2" />
              Riprova
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const daSaldare = Math.max(0, kpis.daSaldare ?? 0);
  const daSaldarePercent = kpis.totalRevenue > 0
    ? Math.min(100, (daSaldare / kpis.totalRevenue) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            Panoramica generale
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/60">
              <Radio className="h-3 w-3 text-green-500 animate-pulse" />
              Live
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex bg-muted rounded-lg p-0.5">
            {(["3months", "6months", "year", "lastyear", "all"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setQuickFilter(type)}
                className={cn(
                  "px-2.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
                  activeFilter === type
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isMobile
                  ? { "3months": "3M", "6months": "6M", year: new Date().getFullYear().toString(), lastyear: (new Date().getFullYear() - 1).toString(), all: "∞" }[type]
                  : { "3months": "3 Mesi", "6months": "6 Mesi", year: new Date().getFullYear().toString(), lastyear: (new Date().getFullYear() - 1).toString(), all: "Tutto" }[type]}
              </button>
            ))}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
              >
                <CalendarIcon className="h-3.5 w-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  setActiveFilter(null);
                }}
                numberOfMonths={isMobile ? 1 : 2}
                locale={it}
                className="pointer-events-auto"
              />
              {dateRange && activeFilter === null && (
                <div className="border-t px-3 py-2 text-xs text-muted-foreground">
                  {formatDateRange()}
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Ricavi Totali</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.totalRevenue)}</div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">{kpis.totalOrders} ordini totali</p>
              <DeltaIndicator value={kpis.deltas?.revenue ?? 0} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Acconti Totali</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.totalAcconti)}</div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">Da ordini</p>
              <DeltaIndicator value={kpis.deltas?.acconti ?? 0} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Totale Incassato</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.totalIncassato)}</div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">Pagamenti ricevuti</p>
              <DeltaIndicator value={kpis.deltas?.incassato ?? 0} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Da Saldare</CardTitle>
            <AlertCircle className={cn("h-4 w-4", parseFloat(daSaldarePercent) > 50 ? "text-destructive" : "text-muted-foreground")} />
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", parseFloat(daSaldarePercent) > 50 && "text-destructive")}>
              {formatCurrency(daSaldare)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {daSaldarePercent}% del totale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Badges Row */}
      <StatusBadgesRow ordersByStatus={kpis.ordersByStatus} />

      {/* Collection Progress Bar */}
      <CollectionProgressBar
        totalIncassato={kpis.totalIncassato}
        totalRevenue={kpis.totalRevenue}
      />

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {revenueLoading ? (
          <Skeleton className="h-[400px] lg:col-span-2" />
        ) : (
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData || []} description={revenueChartDescription} />
          </div>
        )}
        <DeadlinesWidget daysAhead={14} limit={5} />
      </div>

      {/* Order Status Chart - Full Width */}
      <OrderStatusPieChart
        data={Object.entries(kpis.ordersByStatus).map(([status, count]) => ({
          name: getStatusLabel(status),
          value: count,
          color: STATUS_CHART_COLORS[status] || "hsl(var(--chart-5))",
        }))}
      />

      {/* Recent Orders & Top Dealers */}
      <div className="grid gap-4 md:grid-cols-2">
        <RecentOrdersWidget />

        {/* Top Dealers */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg md:text-xl">Top 5 Rivenditori</CardTitle>
            <CardDescription className="text-xs md:text-sm">I 5 rivenditori con più fatturato</CardDescription>
          </CardHeader>
          <CardContent>
            {kpis.topDealers.length > 0 ? (
              <div className="space-y-4">
                {kpis.topDealers.map((dealer) => (
                  <div
                    key={dealer.id}
                    onClick={() => navigate(`/rivenditori/${dealer.id}`)}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 cursor-pointer rounded-lg p-2 -mx-2 transition-colors hover:bg-accent/50"
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
    </div>
  );
}
