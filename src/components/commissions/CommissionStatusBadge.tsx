import { Badge } from "@/components/ui/badge";

interface CommissionStatusBadgeProps {
  status: "dovuta" | "liquidata";
}

export function CommissionStatusBadge({ status }: CommissionStatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case "dovuta":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "liquidata":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "dovuta":
        return "Dovuta";
      case "liquidata":
        return "Liquidata";
      default:
        return status;
    }
  };

  return (
    <Badge className={getStatusColor()}>
      {getStatusLabel()}
    </Badge>
  );
}
