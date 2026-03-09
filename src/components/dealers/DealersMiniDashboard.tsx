import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, TrendingUp, Wallet, AlertTriangle, Clock } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { differenceInDays } from "date-fns";
import type { DealerWithStats } from "@/hooks/useDealers";

interface DealersMiniDashboardProps {
  dealers: DealerWithStats[];
  totalCount: number;
}

export function DealersMiniDashboard({ dealers, totalCount }: DealersMiniDashboardProps) {
  const stats = useMemo(() => {
    const totalRevenue = dealers.reduce((sum, d) => sum + (d.total_revenue || 0), 0);
    const totalPaid = dealers.reduce((sum, d) => sum + (d.total_paid || 0), 0);
    const totalRemaining = dealers.reduce((sum, d) => sum + (d.total_remaining || 0), 0);
    const now = new Date();
    const inactive = dealers.filter((d) => {
      if (!d.last_order_date) return true;
      return differenceInDays(now, new Date(d.last_order_date)) > 30;
    }).length;
    return { totalRevenue, totalPaid, totalRemaining, inactive };
  }, [dealers]);

  const cards = [
    {
      label: "Rivenditori",
      value: totalCount.toString(),
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Fatturato Totale",
      value: formatCurrency(stats.totalRevenue),
      icon: TrendingUp,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      label: "Incassato",
      value: formatCurrency(stats.totalPaid),
      icon: Wallet,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Da Incassare",
      value: formatCurrency(stats.totalRemaining),
      icon: AlertTriangle,
      color: stats.totalRemaining > 0 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground",
      bgColor: stats.totalRemaining > 0 ? "bg-amber-500/10" : "bg-muted/50",
    },
    {
      label: "Inattivi (>30gg)",
      value: stats.inactive.toString(),
      icon: Clock,
      color: stats.inactive > 0 ? "text-destructive" : "text-muted-foreground",
      bgColor: stats.inactive > 0 ? "bg-destructive/10" : "bg-muted/50",
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
