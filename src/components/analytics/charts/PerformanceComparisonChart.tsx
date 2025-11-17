import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { 
  startOfMonth, 
  endOfMonth, 
  subMonths, 
  format,
  startOfYear,
  endOfYear,
  subYears
} from "date-fns";
import { it } from "date-fns/locale";

interface OrderData {
  data_inserimento: string;
  importo_totale: number;
}

interface PerformanceComparisonChartProps {
  orders: OrderData[];
  title?: string;
  comparisonType?: "month" | "year";
}

export function PerformanceComparisonChart({ 
  orders, 
  title = "Confronto Performance", 
  comparisonType = "month" 
}: PerformanceComparisonChartProps) {
  const now = new Date();
  
  let currentPeriodStart: Date, currentPeriodEnd: Date;
  let previousPeriodStart: Date, previousPeriodEnd: Date;
  let periodLabel: string;

  if (comparisonType === "month") {
    // Questo mese vs mese scorso
    currentPeriodStart = startOfMonth(now);
    currentPeriodEnd = endOfMonth(now);
    previousPeriodStart = startOfMonth(subMonths(now, 1));
    previousPeriodEnd = endOfMonth(subMonths(now, 1));
    periodLabel = "Mese";
  } else {
    // Quest'anno vs anno scorso
    currentPeriodStart = startOfYear(now);
    currentPeriodEnd = endOfYear(now);
    previousPeriodStart = startOfYear(subYears(now, 1));
    previousPeriodEnd = endOfYear(subYears(now, 1));
    periodLabel = "Anno";
  }

  // Filtra ordini per periodo corrente
  const currentOrders = orders.filter((order) => {
    const orderDate = new Date(order.data_inserimento);
    return orderDate >= currentPeriodStart && orderDate <= currentPeriodEnd;
  });

  // Filtra ordini per periodo precedente
  const previousOrders = orders.filter((order) => {
    const orderDate = new Date(order.data_inserimento);
    return orderDate >= previousPeriodStart && orderDate <= previousPeriodEnd;
  });

  // Calcola metriche
  const currentRevenue = currentOrders.reduce((sum, o) => sum + Number(o.importo_totale), 0);
  const previousRevenue = previousOrders.reduce((sum, o) => sum + Number(o.importo_totale), 0);
  const currentCount = currentOrders.length;
  const previousCount = previousOrders.length;
  const currentAvgTicket = currentCount > 0 ? currentRevenue / currentCount : 0;
  const previousAvgTicket = previousCount > 0 ? previousRevenue / previousCount : 0;

  // Calcola variazioni percentuali
  const revenueChange = previousRevenue > 0 
    ? ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1)
    : "0";
  const ordersChange = previousCount > 0
    ? ((currentCount - previousCount) / previousCount * 100).toFixed(1)
    : "0";
  const ticketChange = previousAvgTicket > 0
    ? ((currentAvgTicket - previousAvgTicket) / previousAvgTicket * 100).toFixed(1)
    : "0";

  const chartData = [
    {
      metric: "Fatturato",
      [format(currentPeriodStart, "MMM yyyy", { locale: it })]: currentRevenue,
      [format(previousPeriodStart, "MMM yyyy", { locale: it })]: previousRevenue,
      change: Number(revenueChange),
    },
    {
      metric: "N° Ordini",
      [format(currentPeriodStart, "MMM yyyy", { locale: it })]: currentCount,
      [format(previousPeriodStart, "MMM yyyy", { locale: it })]: previousCount,
      change: Number(ordersChange),
    },
    {
      metric: "Ticket Medio",
      [format(currentPeriodStart, "MMM yyyy", { locale: it })]: currentAvgTicket,
      [format(previousPeriodStart, "MMM yyyy", { locale: it })]: previousAvgTicket,
      change: Number(ticketChange),
    },
  ];

  const currentLabel = format(currentPeriodStart, "MMM yyyy", { locale: it });
  const previousLabel = format(previousPeriodStart, "MMM yyyy", { locale: it });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title} - {periodLabel}</span>
          <div className="flex gap-2">
            <Badge variant="outline">{currentLabel}</Badge>
            <Badge variant="secondary">{previousLabel}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="metric" 
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => 
                value >= 1000 ? `€${(value / 1000).toFixed(0)}k` : value.toString()
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number, name: string) => {
                if (name.includes("Fatturato") || name.includes("Ticket")) {
                  return formatCurrency(value);
                }
                return value;
              }}
            />
            <Legend />
            <Bar dataKey={currentLabel} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey={previousLabel} fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {chartData.map((item) => {
            const isPositive = item.change >= 0;
            return (
              <div key={item.metric} className="space-y-2 p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium text-muted-foreground">{item.metric}</p>
                <div className="flex items-center gap-2">
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-lg font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {isPositive ? "+" : ""}{item.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
