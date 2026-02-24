import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format, startOfMonth, subMonths, eachMonthOfInterval } from "date-fns";
import { it } from "date-fns/locale";

interface OrderData {
  data_inserimento: string;
  importo_totale: number;
  importo_pagato?: number;
}

interface RevenueTimelineChartProps {
  orders: OrderData[];
  months?: number;
  title?: string;
}

export function RevenueTimelineChart({ orders, months = 6, title = "Trend Fatturato" }: RevenueTimelineChartProps) {
  // Genera gli ultimi N mesi
  const endDate = new Date();
  const startDate = startOfMonth(subMonths(endDate, months - 1));
  
  const monthsInterval = eachMonthOfInterval({ start: startDate, end: endDate });

  // Aggrega dati per mese
  const chartData = monthsInterval.map((monthDate) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

    const ordersInMonth = orders.filter((order) => {
      const orderDate = new Date(order.data_inserimento);
      return orderDate >= monthStart && orderDate <= monthEnd;
    });

    const totalRevenue = ordersInMonth.reduce((sum, o) => sum + Number(o.importo_totale), 0);
    const totalPaid = ordersInMonth.reduce((sum, o) => sum + Number(o.importo_pagato || 0), 0);

    return {
      month: format(monthDate, "MMM yyyy", { locale: it }),
      fatturato: totalRevenue,
      incassato: totalPaid,
    };
  });

  // Calcola trend (confronto ultimo mese con media precedenti)
  const lastMonth = chartData[chartData.length - 1];
  const previousMonths = chartData.slice(0, -1);
  const avgPreviousMonths = previousMonths.reduce((sum, m) => sum + m.fatturato, 0) / previousMonths.length;
  const trend = lastMonth && avgPreviousMonths > 0 
    ? ((lastMonth.fatturato - avgPreviousMonths) / avgPreviousMonths * 100).toFixed(1)
    : "0";
  const isPositiveTrend = Number(trend) >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {title}
          </span>
          <span className={`text-sm font-medium ${isPositiveTrend ? "text-green-600" : "text-red-600"}`}>
            {isPositiveTrend ? "+" : ""}{trend}% vs media
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              className="text-xs"
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              className="text-xs"
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="fatturato"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              name="Fatturato"
            />
            <Line
              type="monotone"
              dataKey="incassato"
              stroke="hsl(142, 76%, 36%)"
              strokeWidth={2}
              dot={{ fill: "hsl(142, 76%, 36%)" }}
              name="Incassato"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
