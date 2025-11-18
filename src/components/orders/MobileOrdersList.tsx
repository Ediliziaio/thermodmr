import { OrderMobileCard } from "./OrderMobileCard";
import type { OrderWithDetails } from "@/hooks/useOrdersInfinite";

interface MobileOrdersListProps {
  orders: OrderWithDetails[];
  selectedOrderIds: Set<string>;
  onToggleSelect: (orderId: string) => void;
  onViewDetails: (orderId: string) => void;
  userRole: string;
}

export function MobileOrdersList({
  orders,
  selectedOrderIds,
  onToggleSelect,
  onViewDetails,
  userRole,
}: MobileOrdersListProps) {
  return (
    <div className="pb-20">
      {orders.length > 0 ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderMobileCard
              key={order.id}
              order={order}
              isSelected={selectedOrderIds.has(order.id!)}
              onToggleSelect={() => onToggleSelect(order.id!)}
              onViewDetails={() => onViewDetails(order.id!)}
              userRole={userRole}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Nessun ordine trovato
        </div>
      )}
    </div>
  );
}
