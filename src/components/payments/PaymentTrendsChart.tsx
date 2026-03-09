import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { PaymentWithDetails } from "@/lib/paymentConstants";

interface PaymentTrendsChartProps {
  payments: PaymentWithDetails[];
}

export function PaymentTrendsChart({ payments }: PaymentTrendsChartProps) {
  const chartData = useMemo(() => {
    // Aggrega pagamenti per giorno usando la data ISO per il sort
    const dailyData = payments.reduce((acc, payment) => {
      const isoDate = payment.data_pagamento; // "YYYY-MM-DD"
      if (!acc[isoDate]) {
        const label = new Date(isoDate + "T00:00:00").toLocaleDateString("it-IT", {
          day: "2-digit",
          month: "short",
        });
        acc[isoDate] = { date: label, isoDate, total: 0, count: 0 };
      }
      acc[isoDate].total += payment.importo;
      acc[isoDate].count += 1;
      return acc;
    }, {} as Record<string, { date: string; isoDate: string; total: number; count: number }>);

    return Object.values(dailyData).sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  }, [payments]);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend Pagamenti nel Tempo</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
