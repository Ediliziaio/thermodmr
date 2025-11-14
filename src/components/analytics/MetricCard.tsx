import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon?: React.ReactNode;
  formatAsPercentage?: boolean;
}

export function MetricCard({ title, value, change, icon, formatAsPercentage }: MetricCardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;
  
  const changeDisplay = formatAsPercentage 
    ? `${change > 0 ? '+' : ''}${change.toFixed(1)}%`
    : `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs mt-1">
          {isNeutral ? (
            <Minus className="h-3 w-3 text-muted-foreground" />
          ) : isPositive ? (
            <ArrowUp className="h-3 w-3 text-green-500" />
          ) : (
            <ArrowDown className="h-3 w-3 text-red-500" />
          )}
          <span
            className={cn(
              "font-medium",
              isNeutral && "text-muted-foreground",
              isPositive && "text-green-500",
              !isPositive && !isNeutral && "text-red-500"
            )}
          >
            {changeDisplay}
          </span>
          <span className="text-muted-foreground">vs periodo precedente</span>
        </div>
      </CardContent>
    </Card>
  );
}
