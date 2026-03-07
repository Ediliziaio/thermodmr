import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { BarChart3 } from "lucide-react";
import { getStatusLabel } from "@/lib/utils";

interface OrderData {
  stato: string;
}

interface OrdersDistributionChartProps {
  orders: OrderData[];
  title?: string;
}

const STATUS_COLORS: Record<string, string> = {
  preventivo: "hsl(215, 14%, 60%)",
  da_confermare: "hsl(38, 92%, 50%)",
  da_pagare_acconto: "hsl(25, 95%, 53%)",
  in_lavorazione: "hsl(217, 91%, 60%)",
  da_saldare: "hsl(0, 84%, 60%)",
  da_consegnare: "hsl(271, 91%, 65%)",
  consegnato: "hsl(142, 71%, 45%)",
};

export function OrdersDistributionChart({ orders, title = "Distribuzione Ordini per Stato" }: OrdersDistributionChartProps) {
  // Aggrega ordini per stato
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.stato] = (acc[order.stato] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: getStatusLabel(status),
    value: count,
    status,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="hsl(var(--primary))"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || "hsl(var(--muted))"} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value} ordini (${((value / total) * 100).toFixed(1)}%)`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {chartData.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[item.status] }}
              />
              <span className="text-muted-foreground">{item.name}:</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
