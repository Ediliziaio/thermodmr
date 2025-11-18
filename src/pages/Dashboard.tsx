import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Euro, TrendingUp, CheckCircle, AlertCircle, Radio, CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, subMonths, startOfMonth, endOfMonth, startOfYear, endOfYear, subYears } from "date-fns";
import { it } from "date-fns/locale";
import { useDashboardKPIs, useRevenueData } from "@/hooks/useDashboard";
import { useRealtimeDashboard } from "@/hooks/useRealtimeDashboard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrderStatusPieChart } from "@/components/dashboard/OrderStatusPieChart";
import { formatCurrency, getStatusColor, getStatusLabel, cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Dashboard() {
  const isMobile = useIsMobile();
  
  // State per il date range
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  
  // Abilita aggiornamenti real-time
  useRealtimeDashboard();
  
  const { data: kpis, isLoading: kpisLoading, error: kpisError } = useDashboardKPIs(
    dateRange?.from,
    dateRange?.to
  );
  const { data: revenueData, isLoading: revenueLoading } = useRevenueData(
    dateRange?.from,
    dateRange?.to
  );

  // Quick filter functions
  const setQuickFilter = (type: 'month' | '3months' | '6months' | 'year' | 'lastyear') => {
    const now = new Date();
    switch (type) {
      case 'month':
        setDateRange({
          from: startOfMonth(subMonths(now, 1)),
          to: endOfMonth(subMonths(now, 1)),
        });
        break;
      case '3months':
        setDateRange({
          from: startOfMonth(subMonths(now, 3)),
          to: now,
        });
        break;
      case '6months':
        setDateRange({
          from: startOfMonth(subMonths(now, 6)),
          to: now,
        });
        break;
      case 'year':
        setDateRange({
          from: startOfYear(now),
          to: endOfYear(now),
        });
        break;
      case 'lastyear':
        setDateRange({
          from: startOfYear(subYears(now, 1)),
          to: endOfYear(subYears(now, 1)),
        });
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
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuickFilter('month')}
              className="snap-center min-w-fit"
            >
              {isMobile ? "1M" : "Mese Scorso"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuickFilter('3months')}
              className="snap-center min-w-fit"
            >
              {isMobile ? "3M" : "Ultimi 3 Mesi"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuickFilter('6months')}
              className="snap-center min-w-fit"
            >
              {isMobile ? "6M" : "Ultimi 6 Mesi"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuickFilter('year')}
              className="snap-center min-w-fit"
            >
              {isMobile ? "1A" : "Anno Corrente"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuickFilter('lastyear')}
              className="snap-center min-w-fit"
            >
              {isMobile ? "AA" : "Anno Scorso"}
            </Button>
          </div>

          {/* Date Range Picker */}
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
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  locale={it}
                  className="pointer-events-auto"
                />
                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Filtri rapidi</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuickFilter('month')}
                    >
                      Ultimo mese
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuickFilter('3months')}
                    >
                      Ultimi 3 mesi
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuickFilter('6months')}
                    >
                      Ultimi 6 mesi
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuickFilter('year')}
                    >
                      Quest'anno
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuickFilter('lastyear')}
                      className="col-span-2"
                    >
                      Anno scorso
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {dateRange && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDateRange(undefined)}
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

      {/* Order Status Statistics */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Ordini per Stato</h2>
        {isMobile ? (
          <Carousel className="w-full">
            <CarouselContent>
              {Object.entries(kpis.ordersByStatus).map(([status, count]) => (
                <CarouselItem key={status} className="basis-11/12">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {getStatusLabel(status)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{count}</div>
                      <Badge 
                        variant="outline" 
                        className={cn("mt-2", getStatusColor(status))}
                      >
                        {status.replace(/_/g, " ")}
                      </Badge>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        ) : (
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
        )}
      </div>

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
