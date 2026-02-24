import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCommercialeDashboard } from "@/hooks/useCommercialeDashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  TrendingUp, 
  ShoppingCart, 
  Euro, 
  Users,
  Package,
  DollarSign,
  FileText,
  Plus,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { DeadlinesWidget } from "@/components/dashboard/DeadlinesWidget";
import { cn, formatCurrency, formatDate, getStatusLabel } from "@/lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";


const COLORS = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  accent: "hsl(var(--chart-3))",
  muted: "hsl(var(--muted))",
  success: "hsl(var(--chart-2))",
  warning: "hsl(var(--chart-4))",
  error: "hsl(var(--destructive))",
};

const STATUS_COLORS: Record<string, string> = {
  da_confermare: COLORS.warning,
  confermato: COLORS.primary,
  da_pagare_acconto: COLORS.accent,
  in_lavorazione: COLORS.secondary,
  pronto: COLORS.success,
  consegnato: COLORS.success,
  annullato: COLORS.error,
};

export default function CommercialeDashboard() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useCommercialeDashboard(user?.id);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
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

  const statusChartData = Object.entries(data.ordersByStatus).map(([status, count]) => ({
    name: getStatusLabel(status),
    value: count,
    color: STATUS_COLORS[status] || COLORS.muted,
  }));

  // Prepara i dati per il grafico fatturato
  const revenueChartData = data.revenueByMonth.map(m => ({
    month: m.month,
    revenue: m.ricavi,
  }));

  // Prepara i dati per il grafico top dealers
  const topDealersChartData = data.topDealers.map(d => ({
    name: d.dealer_name,
    revenue: d.total_revenue,
  }));

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Commerciale</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Panoramica delle tue performance e statistiche commerciali
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordini Totali</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fatturato Totale</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.totalRevenue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Provvigioni Dovute</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {formatCurrency(data.commissionsDovute)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Provvigioni Liquidate</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(data.commissionsLiquidate)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dealers Attivi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeDealers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Andamento Fatturato (6 mesi)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={COLORS.primary}
                  name="Fatturato"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Provvigioni per Mese</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.commissionsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar dataKey="dovute" fill={COLORS.warning} name="Dovute" />
                <Bar dataKey="liquidate" fill={COLORS.success} name="Liquidate" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 + Deadlines Widget */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Distribuzione Stati Ordini</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Dealers */}
        <Card>
          <CardHeader className={isMobile ? "p-4" : ""}>
            <CardTitle className={isMobile ? "text-base" : ""}>Top 5 Rivenditori per Fatturato</CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? "p-4 pt-0" : ""}>
            <ResponsiveContainer width="100%" height={isMobile ? 280 : 300}>
              <BarChart 
                data={topDealersChartData} 
                layout="vertical"
                margin={isMobile ? { top: 5, right: 5, left: -10, bottom: 5 } : undefined}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis 
                  type="number"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }}
                  tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 80 : 120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: isMobile ? '11px' : '13px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar 
                  dataKey="revenue" 
                  fill={COLORS.primary}
                  radius={[0, 4, 4, 0]}
                  name="Fatturato"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deadlines Widget */}
        <DeadlinesWidget commercialeId={user?.id} daysAhead={14} limit={5} />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className={isMobile ? "p-4" : ""}>
          <CardTitle className={isMobile ? "text-base" : ""}>Ultimi 5 Ordini</CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? "p-4 pt-0" : ""}>
          {data.latestOrders.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="Nessun ordine recente"
              description="Non ci sono ordini nel periodo recente. Crea un nuovo ordine per iniziare."
              action={
                <Button onClick={() => navigate("/ordini")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crea Ordine
                </Button>
              }
            />
          ) : isMobile ? (
            <div className="space-y-3">
              {data.latestOrders.map((order) => (
                <Card 
                  key={order.id}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => navigate(`/ordini/${order.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-base">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.dealer_name}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getStatusLabel(order.stato)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Importo</p>
                        <p className="font-bold text-lg">
                          {formatCurrency(Number(order.importo_totale))}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Data</p>
                        <p className="font-medium">
                          {formatDate(order.data_inserimento)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {data.latestOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0 hover:bg-accent/50 transition-colors cursor-pointer rounded p-2"
                  onClick={() => navigate(`/ordini/${order.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <Package className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.dealer_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(order.data_inserimento, "dd MMM yyyy HH:mm")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      {formatCurrency(Number(order.importo_totale))}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {getStatusLabel(order.stato)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
