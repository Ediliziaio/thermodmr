import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getStatusLabel } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DealerOrdersDistributionProps {
  dealerId: string;
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

export function DealerOrdersDistribution({ dealerId }: DealerOrdersDistributionProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["dealer-orders-distribution", dealerId],
    queryFn: async () => {
      // Fetch only stato column for ALL orders (lightweight)
      const { data: orders, error } = await supabase
        .from("orders")
        .select("stato")
        .eq("dealer_id", dealerId);

      if (error) throw error;

      const counts: Record<string, number> = {};
      (orders || []).forEach((o) => {
        counts[o.stato] = (counts[o.stato] || 0) + 1;
      });

      const chartData = Object.entries(counts).map(([status, count]) => ({
        name: getStatusLabel(status),
        value: count,
        status,
      }));

      const total = chartData.reduce((s, i) => s + i.value, 0);
      return { chartData, total };
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

  const { chartData = [], total = 0 } = data || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Distribuzione Ordini per Stato
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
              contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
              formatter={(value: number) => [`${value} ordini (${((value / total) * 100).toFixed(1)}%)`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {chartData.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STATUS_COLORS[item.status] }} />
              <span className="text-muted-foreground">{item.name}:</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
