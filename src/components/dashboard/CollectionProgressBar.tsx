import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CollectionProgressBarProps {
  totalIncassato: number;
  totalRevenue: number;
}

export function CollectionProgressBar({ totalIncassato, totalRevenue }: CollectionProgressBarProps) {
  const percent = totalRevenue > 0 ? Math.min(100, (totalIncassato / totalRevenue) * 100) : 0;
  const remaining = Math.max(0, totalRevenue - totalIncassato);

  const progressColor = percent >= 75 
    ? "[&>div]:bg-green-500" 
    : percent >= 40 
      ? "[&>div]:bg-amber-500" 
      : "[&>div]:bg-red-500";

  return (
    <div className="rounded-lg border bg-card p-4 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Progresso Incassi</span>
        <span className={cn(
          "font-bold",
          percent >= 75 ? "text-green-600 dark:text-green-400" :
          percent >= 40 ? "text-amber-600 dark:text-amber-400" :
          "text-red-600 dark:text-red-400"
        )}>
          {percent.toFixed(1)}%
        </span>
      </div>
      <Progress value={percent} className={cn("h-3", progressColor)} />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Incassato: {formatCurrency(totalIncassato)}</span>
        <span>Residuo: {formatCurrency(remaining)}</span>
      </div>
    </div>
  );
}
