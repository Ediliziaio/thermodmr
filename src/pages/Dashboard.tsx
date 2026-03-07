import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Euro, TrendingUp, TrendingDown, Minus, CheckCircle, AlertCircle, Radio, CalendarIcon, X, RefreshCw, ArrowUp, ArrowDown } from "lucide-react";
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
  preventivo: "hsl(215, 14%, 60%)",
  da_confermare: "hsl(38, 92%, 50%)",
  da_pagare_acconto: "hsl(25, 95%, 53%)",
  in_lavorazione: "hsl(217, 91%, 60%)",
  da_saldare: "hsl(0, 84%, 60%)",
  da_consegnare: "hsl(271, 91%, 65%)",
  consegnato: "hsl(142, 71%, 45%)",
};

const FILTER_LABELS: Record<string, string> = {
  month: "Mese Scorso",
  "3months": "Ultimi 3 Mesi",
  "6months": "Ultimi 6 Mesi",
  year: `Anno Corrente ${new Date().getFullYear()}`,
  lastyear: `Anno ${new Date().getFullYear() - 1}`,
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
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  useRealtimeSync();
  
  const { data: kpis, isLoading: kpisLoading, error: kpisError, refetch } = useDashboardKPIs(
    dateRange?.from,
    dateRange?.to
  );
  const { data: revenueData, isLoading: revenueLoading } = useRevenueData(
    dateRange?.from,
    dateRange?.to
  );

  const setQuickFilter = (type: 'month' | '3months' | '6months' | 'year' | 'lastyear') => {
    const now = new Date();
    setActiveFilter(type);
    switch (type) {
      case 'month':
        setDateRange({ from: startOfMonth(subMonths(now, 1)), to: endOfMonth(subMonths(now, 1)) });
        break;
      case '3months':
        setDateRange({ from: startOfMonth(subMonths(now, 3)), to: now });
        break;
      case '6months':
        setDateRange({ from: startOfMonth(subMonths(now, 6)), to: now });
        break;
      case 'year':
        setDateRange({ from: startOfYear(now), to: endOfYear(now) });
        break;
      case 'lastyear':
        setDateRange({ from: startOfYear(subYears(now, 1)), to: endOfYear(subYears(now, 1)) });
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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Panoramica generale degli ordini e delle performance
            {dateRange?.from && (
              <span className="ml-2 text-primary font-medium">
                • {formatDateRange()}
              </span>
            )}
          </p>
        </div>
        {/* Date Range Filters */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide w-full md:w-auto">
            {(["month", "3months", "6months", "year", "lastyear"] as const).map((type) => (
              <Button
                key={type}
                size="sm"
                variant={activeFilter === type ? "default" : "outline"}
                onClick={() => setQuickFilter(type)}
                className="snap-center min-w-fit transition-all"
              >
                {isMobile
                  ? { month: "1M", "3months": "3M", "6months": "6M", year: "1A", lastyear: "AA" }[type]
                  : { month: "Mese Scorso", "3months": "Ultimi 3 Mesi", "6months": "Ultimi 6 Mesi", year: "Anno Corrente", lastyear: "Anno Scorso" }[type]}
              </Button>
            ))}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={dateRange ? "default" : "outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange ? formatDateRange() : "Seleziona periodo"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 space-y-3">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => {
                    setDateRange(range);
                    setActiveFilter(null);
                  }}
                  numberOfMonths={2}
                  locale={it}
                  className="pointer-events-auto"
                />
                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Filtri rapidi</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(["month", "3months", "6months", "year", "lastyear"] as const).map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuickFilter(type)}
                        className={type === "lastyear" ? "col-span-2" : ""}
                      >
                        {{ month: "Ultimo mese", "3months": "Ultimi 3 mesi", "6months": "Ultimi 6 mesi", year: "Quest'anno", lastyear: "Anno scorso" }[type]}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {dateRange && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setDateRange(undefined);
                setActiveFilter(null);
              }}
              title="Reset filtro periodo"
              className="min-h-[44px] min-w-[44px]"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground border-l pl-3">
            <Radio className="h-4 w-4 text-green-500 animate-pulse" />
            <span className="hidden sm:inline">Real-time</span>
          </div>
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
              <DeltaIndicator value={kpis.deltas.acconti} />
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
              <DeltaIndicator value={kpis.deltas.incassato} />
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
