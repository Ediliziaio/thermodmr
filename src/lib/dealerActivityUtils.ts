import { differenceInDays } from "date-fns";

export function getDealerActivityInfo(lastOrderDate: string | null | undefined) {
  if (!lastOrderDate) {
    return { days: null, label: "Mai ordinato", variant: "destructive" as const, color: "text-destructive" };
  }
  const days = differenceInDays(new Date(), new Date(lastOrderDate));
  if (days < 15) {
    return { days, label: `${days}gg fa`, variant: "default" as const, color: "text-green-600 dark:text-green-400" };
  }
  if (days <= 30) {
    return { days, label: `${days}gg fa`, variant: "secondary" as const, color: "text-amber-600 dark:text-amber-400" };
  }
  return { days, label: `${days}gg fa`, variant: "destructive" as const, color: "text-destructive" };
}
