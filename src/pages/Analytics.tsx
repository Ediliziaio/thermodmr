import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, TrendingUp, Euro, Package, Target, Download, Users, AlertCircle, RefreshCw } from "lucide-react";
import { formatCurrencyCompact } from "@/lib/utils";
import { useUnifiedAnalytics } from "@/hooks/useUnifiedAnalytics";
import { MetricCard } from "@/components/analytics/MetricCard";
import { OrderTrendsChart } from "@/components/analytics/OrderTrendsChart";
import { PaymentTrendsDetailedChart } from "@/components/analytics/PaymentTrendsDetailedChart";
import { DealerPerformanceChart } from "@/components/analytics/DealerPerformanceChart";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Analytics() {
  const { userRole } = useAuth();
  const { t } = useLanguage();
  const [months, setMonths] = useState(6);
  const [selectedDealer, setSelectedDealer] = useState<string | undefined>();

  const { data: analytics, isLoading, error, refetch } = useUnifiedAnalytics({
    dealerId: selectedDealer,
    months,
  });

  // Fetch all dealers (id + name only) for the filter dropdown — avoids infinite pagination truncation
  const { data: dealers = [] } = useQuery({
    queryKey: ["dealers-all-for-filter"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dealers")
        .select("id, ragione_sociale")
        .order("ragione_sociale");
      if (error) throw error;
      return data as { id: string; ragione_sociale: string }[];
    },
    staleTime: 10 * 60 * 1000,
  });

  const handleExportData = () => {
    if (!analytics) return;

    const csvData = [
      [t.area.analytics.metrica, t.area.analytics.valore],
      [t.area.analytics.ordiniTotali, analytics.summary.totalOrders.toString()],
      [t.area.analytics.ricaviTotali, analytics.summary.totalRevenue.toString()],
      [t.area.analytics.pagamentiIncassati, analytics.summary.totalPayments.toString()],
      [t.area.analytics.ticketMedio, analytics.summary.averageTicket.toString()],
      [t.area.analytics.tassoConversione, `${analytics.summary.conversionRate.toFixed(2)}%`],
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: t.area.analytics.exportCompletato,
      description: t.area.analytics.exportDesc,
    });
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
      <div className="flex items-center justify-center min-h-[50vh] p-6">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="text-center">
              <h3 className="font-semibold text-lg">{t.area.common.erroreCaricamento}</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {t.area.analytics.errore}
              </p>
            </div>
            <Button onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />{t.area.common.riprova}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.area.analytics.titolo}</h1>
          <p className="text-muted-foreground mt-1">
            {t.area.analytics.desc}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            {t.area.common.esportaCsv}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Select value={months.toString()} onValueChange={(v) => setMonths(parseInt(v))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.area.analytics.periodo} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">{t.area.analytics.ultimi3}</SelectItem>
                <SelectItem value="6">{t.area.analytics.ultimi6}</SelectItem>
                <SelectItem value="12">{t.area.analytics.ultimoAnno}</SelectItem>
              </SelectContent>
            </Select>

            {userRole === "super_admin" && (
              <Select value={selectedDealer || "all"} onValueChange={(v) => setSelectedDealer(v === "all" ? undefined : v)}>
                <SelectTrigger className="w-[200px]">
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t.area.analytics.tuttiDealer} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.area.analytics.tuttiDealer}</SelectItem>
                  {dealers.map(d => (
                    <SelectItem key={d.id} value={d.id!}>{d.ragione_sociale}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {selectedDealer && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDealer(undefined)}
              >
                {t.area.analytics.resetFiltri}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title={t.area.analytics.ordiniTotali}
          value={analytics.summary.totalOrders}
          change={0}
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title={t.area.analytics.ricaviTotali}
          value={formatCurrencyCompact(analytics.summary.totalRevenue)}
          change={0}
          icon={<Euro className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title={t.area.analytics.pagamentiIncassati}
          value={formatCurrencyCompact(analytics.summary.totalPayments)}
          change={0}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title={t.area.analytics.ticketMedio}
          value={formatCurrencyCompact(analytics.summary.averageTicket)}
          change={0}
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <OrderTrendsChart data={analytics.orderTrends} />
        <PaymentTrendsDetailedChart data={analytics.paymentTrends} />
      </div>

      {/* Dealer Performance */}
      <DealerPerformanceChart data={analytics.dealerPerformance} />
    </div>
  );
}
