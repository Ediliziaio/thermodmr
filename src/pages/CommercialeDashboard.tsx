import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCommercialeDashboard } from "@/hooks/useCommercialeDashboard";
import { 
  TrendingUp, 
  ShoppingCart, 
  Euro, 
  Users,
  Package,
  DollarSign
} from "lucide-react";
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
import { format } from "date-fns";
import { it } from "date-fns/locale";

const COLORS = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  accent: "hsl(var(--chart-3))",
  muted: "hsl(var(--muted))",
  success: "hsl(var(--chart-2))",
  warning: "hsl(142 76% 36%)",
  error: "hsl(0 84% 60%)",
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

const STATUS_LABELS: Record<string, string> = {
  da_confermare: "Da Confermare",
  confermato: "Confermato",
  da_pagare_acconto: "Da Pagare Acconto",
  in_lavorazione: "In Lavorazione",
  pronto: "Pronto",
  consegnato: "Consegnato",
  annullato: "Annullato",
};

export default function CommercialeDashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useCommercialeDashboard(user?.id);

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

  if (!data) return null;

  const statusChartData = Object.entries(data.statusCounts).map(([status, count]) => ({
    name: STATUS_LABELS[status] || status,
    value: count,
    color: STATUS_COLORS[status] || COLORS.muted,
  }));

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">La Mia Dashboard</h1>
          <p className="text-muted-foreground">
            Panoramica delle tue performance e statistiche
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordini Totali</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fatturato Totale</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{data.kpis.totalRevenue.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
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
              €{data.kpis.commissionsDovute.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
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
              €{data.kpis.commissionsLiquidate.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dealers Attivi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.activeDealers}</div>
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
              <LineChart data={data.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) =>
                    `€${value.toLocaleString("it-IT", { minimumFractionDigits: 2 })}`
                  }
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
                  formatter={(value: number) =>
                    `€${value.toLocaleString("it-IT", { minimumFractionDigits: 2 })}`
                  }
                />
                <Legend />
                <Bar dataKey="dovute" fill={COLORS.warning} name="Dovute" />
                <Bar dataKey="liquidate" fill={COLORS.success} name="Liquidate" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 md:grid-cols-2">
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

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Dealers per Fatturato</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.topDealers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip
                  formatter={(value: number) =>
                    `€${value.toLocaleString("it-IT", { minimumFractionDigits: 2 })}`
                  }
                />
                <Bar dataKey="revenue" fill={COLORS.primary} name="Fatturato" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Latest Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Ultimi 5 Ordini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.latestOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-3 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {(order.dealers as any)?.[0]?.ragione_sociale || "N/A"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(order.data_inserimento), "dd MMM yyyy, HH:mm", {
                        locale: it,
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    €{Number(order.importo_totale).toLocaleString("it-IT", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <Badge variant="outline" className="mt-1">
                    {STATUS_LABELS[order.stato] || order.stato}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
