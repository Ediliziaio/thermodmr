import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DealerRevenueChartProps {
  dealerId: string;
}

interface MonthlyData {
  month: string;
  ricavi: number;
  incassato: number;
}

export function DealerRevenueChart({ dealerId }: DealerRevenueChartProps) {
  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["dealer-revenue-timeline", dealerId],
    queryFn: async () => {
      // Fetch ALL orders for this dealer (no limit) with payment stats
      const { data: orders, error } = await supabase
        .from("orders_with_payment_stats")
        .select("data_inserimento, importo_totale, importo_pagato")
        .eq("dealer_id", dealerId);

      if (error) throw error;

      // Aggregate by month (last 6 months)
      const now = new Date();
      const months: MonthlyData[] = [];
      
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        const label = d.toLocaleDateString("it-IT", { month: "short", year: "numeric" });
        
        const monthOrders = (orders || []).filter((o) => {
          if (!o.data_inserimento) return false;
          const od = new Date(o.data_inserimento);
          return od.getFullYear() === d.getFullYear() && od.getMonth() === d.getMonth();
        });

        months.push({
          month: label,
          ricavi: monthOrders.reduce((s, o) => s + Number(o.importo_totale || 0), 0),
          incassato: monthOrders.reduce((s, o) => s + Number(o.importo_pagato || 0), 0),
        });
      }

      return months;
    },
    enabled: !!dealerId,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
        <CardContent><Skeleton className="h-[300px] w-full" /></CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trend Fatturato (6 Mesi)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))" }} className="text-xs" />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} className="text-xs" tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Legend />
            <Line type="monotone" dataKey="ricavi" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} name="Fatturato" />
            <Line type="monotone" dataKey="incassato" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ fill: "hsl(var(--chart-3))" }} name="Incassato" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
