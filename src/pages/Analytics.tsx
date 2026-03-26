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

export default function Analytics() {
  const { userRole } = useAuth();
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
      ["Metrica", "Valore"],
      ["Totale Ordini", analytics.summary.totalOrders.toString()],
      ["Ricavi Totali", analytics.summary.totalRevenue.toString()],
      ["Pagamenti Totali", analytics.summary.totalPayments.toString()],
      ["Ticket Medio", analytics.summary.averageTicket.toString()],
      ["Tasso Conversione", `${analytics.summary.conversionRate.toFixed(2)}%`],
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
      title: "Export completato",
      description: "I dati analytics sono stati esportati con successo",
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
              <h3 className="font-semibold text-lg">Errore nel caricamento</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Impossibile caricare i dati analytics. Verifica la connessione e riprova.
              </p>
            </div>
            <Button onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />Riprova
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
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Analytics Unificata</h1>
          <p className="text-muted-foreground mt-1">
            Analisi complete di ordini, pagamenti e performance dealers
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Esporta CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Select value={months.toString()} onValueChange={(v) => setMonths(parseInt(v))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">Ultimi 3 mesi</SelectItem>
                <SelectItem value="6">Ultimi 6 mesi</SelectItem>
                <SelectItem value="12">Ultimo anno</SelectItem>
              </SelectContent>
            </Select>

            {userRole === "super_admin" && (
              <Select value={selectedDealer || "all"} onValueChange={(v) => setSelectedDealer(v === "all" ? undefined : v)}>
                <SelectTrigger className="w-[200px]">
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tutti i dealers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i dealers</SelectItem>
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
                Reset Filtri
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Totale Ordini"
          value={analytics.summary.totalOrders}
          change={0}
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Ricavi Totali"
          value={formatCurrencyCompact(analytics.summary.totalRevenue)}
          change={0}
          icon={<Euro className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Pagamenti Incassati"
          value={formatCurrencyCompact(analytics.summary.totalPayments)}
          change={0}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Ticket Medio"
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
