import { PaymentMobileCard } from "./PaymentMobileCard";
import { Button } from "@/components/ui/button";
import { Plus, Filter, X, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PaymentFilters } from "./PaymentFilters";
import { DateRange } from "react-day-picker";
import { useState } from "react";

interface PaymentWithDetails {
  id: string;
  tipo: string;
  importo: number;
  metodo: string;
  data_pagamento: string;
  riferimento: string | null;
  ordine_id: string;
  orders: {
    id: string;
    stato: string;
    importo_totale: number;
    dealer_id: string;
    dealers: {
      ragione_sociale: string;
    };
  };
}

interface MobilePaymentsListProps {
  payments: PaymentWithDetails[];
  selectedPaymentIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onViewOrder: (orderId: string) => void;
  onDeletePayment: (id: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  tipoFilter: string;
  onTipoFilterChange: (tipo: string) => void;
  metodoFilter: string;
  onMetodoFilterChange: (metodo: string) => void;
  onResetFilters: () => void;
  onNewPayment: () => void;
  onExport: () => void;
  userRole: string;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  scrollRef?: (node?: Element | null) => void;
}

export function MobilePaymentsList({
  payments,
  selectedPaymentIds,
  onToggleSelect,
  onViewOrder,
  onDeletePayment,
  dateRange,
  onDateRangeChange,
  tipoFilter,
  onTipoFilterChange,
  metodoFilter,
  onMetodoFilterChange,
  onResetFilters,
  onNewPayment,
  onExport,
  userRole,
  hasNextPage,
  isFetchingNextPage,
  scrollRef,
}: MobilePaymentsListProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const activeFiltersCount = 
    (dateRange?.from ? 1 : 0) + 
    (tipoFilter !== "all" ? 1 : 0) + 
    (metodoFilter !== "all" ? 1 : 0);

  return (
    <div className="pb-20">
      {/* Mobile Filters + Export */}
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
              <SheetTitle>Filtri Pagamenti</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <PaymentFilters
                dateRange={dateRange}
                onDateRangeChange={onDateRangeChange}
                tipoFilter={tipoFilter}
                onTipoFilterChange={onTipoFilterChange}
                metodoFilter={metodoFilter}
                onMetodoFilterChange={onMetodoFilterChange}
                onReset={onResetFilters}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Export Button */}
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12"
          onClick={onExport}
        >
          <Download className="h-5 w-5" />
        </Button>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12"
            onClick={onResetFilters}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Payments List */}
      {payments.length > 0 ? (
        <>
          <div className="space-y-3">
            {payments.map((payment) => (
              <PaymentMobileCard
                key={payment.id}
                payment={payment}
                isSelected={selectedPaymentIds.has(payment.id)}
                onToggleSelect={() => onToggleSelect(payment.id)}
                onViewOrder={() => onViewOrder(payment.ordine_id)}
                onDelete={() => onDeletePayment(payment.id)}
                canDelete={userRole === 'super_admin'}
              />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {hasNextPage && (
            <div ref={scrollRef} className="flex justify-center py-6">
              {isFetchingNextPage && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Caricamento...</span>
                </div>
              )}
            </div>
          )}

          {!hasNextPage && payments.length > 0 && (
            <div className="text-center py-6 text-sm text-muted-foreground">
              Tutti i {payments.length} pagamenti caricati
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Nessun pagamento trovato
        </div>
      )}

      {/* FAB */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        onClick={onNewPayment}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
