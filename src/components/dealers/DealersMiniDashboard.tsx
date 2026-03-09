import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, TrendingUp, Wallet, AlertTriangle, Clock } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import type { DealerFilters } from "@/hooks/useDealersInfinite";

interface DealersMiniDashboardProps {
  filters: DealerFilters;
}

export function DealersMiniDashboard({ filters }: DealersMiniDashboardProps) {
  const { data: stats } = useQuery({
    queryKey: ["dealer-global-stats", filters],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_dealer_global_stats", {
        p_provincia: filters.provincia || null,
        p_commerciale_id: filters.commerciale_id || null,
        p_search: filters.search || null,
        p_min_revenue: filters.minRevenue ?? null,
        p_max_revenue: filters.maxRevenue ?? null,
      });
      if (error) throw error;
      return data as {
        total_dealers: number;
        total_revenue: number;
        total_paid: number;
        total_remaining: number;
        inactive_count: number;
      };
    },
    staleTime: 10 * 60 * 1000,
  });

  const totalDealers = stats?.total_dealers ?? 0;
  const totalRevenue = stats?.total_revenue ?? 0;
  const totalPaid = stats?.total_paid ?? 0;
  const totalRemaining = stats?.total_remaining ?? 0;
  const inactive = stats?.inactive_count ?? 0;

  const cards = [
    {
      label: "Rivenditori",
      value: totalDealers.toString(),
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Fatturato Totale",
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      label: "Incassato",
      value: formatCurrency(totalPaid),
      icon: Wallet,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Da Incassare",
      value: formatCurrency(totalRemaining),
      icon: AlertTriangle,
      color: totalRemaining > 0 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground",
      bgColor: totalRemaining > 0 ? "bg-amber-500/10" : "bg-muted/50",
    },
    {
      label: "Inattivi (>30gg)",
      value: inactive.toString(),
      icon: Clock,
      color: inactive > 0 ? "text-destructive" : "text-muted-foreground",
      bgColor: inactive > 0 ? "bg-destructive/10" : "bg-muted/50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {cards.map((card) => (
        <Card key={card.label} className="overflow-hidden">
          <CardContent className="p-4 flex items-center gap-3">
            <div className={cn("rounded-lg p-2", card.bgColor)}>
              <card.icon className={cn("h-5 w-5", card.color)} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground truncate">{card.label}</p>
              <p className="text-lg font-bold truncate">{card.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
