import { OrderMobileCard } from "./OrderMobileCard";
import { Button } from "@/components/ui/button";
import { Plus, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { OrderFilters, OrderFiltersState } from "./OrderFilters";
import { OrderWithDetails } from "@/hooks/useOrdersInfinite";
import { useState } from "react";

interface MobileOrdersListProps {
  orders: OrderWithDetails[];
  selectedOrderIds: Set<string>;
  onToggleSelect: (orderId: string) => void;
  onViewDetails: (orderId: string) => void;
  filters: OrderFiltersState;
  onFiltersChange: (filters: OrderFiltersState) => void;
  dealers: any[];
  userRole: string;
  onNewOrder: () => void;
}

export function MobileOrdersList({
  orders,
  selectedOrderIds,
  onToggleSelect,
  onViewDetails,
  filters,
  onFiltersChange,
  dealers,
  userRole,
  onNewOrder,
}: MobileOrdersListProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFiltersCount = Object.values(filters).filter(v => 
    v !== undefined && v !== '' && v !== null
  ).length;

  return (
    <div className="pb-20"> {/* Padding per FAB */}
      
      {/* Mobile Filters Button */}
      <div className="flex items-center gap-2 mb-4">
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex-1 h-12 relative">
              <Filter className="h-5 w-5 mr-2" />
              Filtri
              {activeFiltersCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtri Ordini</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <OrderFilters
                filters={filters}
                onFiltersChange={onFiltersChange}
                dealers={dealers}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12"
            onClick={() => onFiltersChange({})}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderMobileCard
              key={order.id}
              order={order}
              isSelected={selectedOrderIds.has(order.id!)}
              onToggleSelect={() => onToggleSelect(order.id!)}
              onViewDetails={() => onViewDetails(order.id!)}
              onShowActions={() => {
                // TODO: Implementare bottom sheet azioni rapide
                console.log("Actions for order:", order.id);
              }}
              userRole={userRole}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Nessun ordine trovato
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        onClick={onNewOrder}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
