import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

interface MobilePaymentFiltersProps {
  dateRange?: DateRange;
  onDateRangeChange: (range?: DateRange) => void;
  tipoFilter: string;
  onTipoFilterChange: (tipo: string) => void;
  metodoFilter: string;
  onMetodoFilterChange: (metodo: string) => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  onReset: () => void;
}

export function MobilePaymentFilters({
  dateRange,
  onDateRangeChange,
  tipoFilter,
  onTipoFilterChange,
  metodoFilter,
  onMetodoFilterChange,
  searchQuery,
  onSearchQueryChange,
  onReset,
}: MobilePaymentFiltersProps) {
  const activeFiltersCount =
    (dateRange?.from ? 1 : 0) +
    (tipoFilter !== "all" ? 1 : 0) +
    (metodoFilter !== "all" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const handleReset = () => {
    onDateRangeChange(undefined);
    onTipoFilterChange("all");
    onMetodoFilterChange("all");
    if (onSearchQueryChange) onSearchQueryChange("");
    onReset();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg"
        >
          <Filter className="h-6 w-6" />
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[75vh]">
        <SheetHeader>
          <SheetTitle className="text-lg">Filtri Pagamenti</SheetTitle>
          <SheetDescription className="text-xs">
            Filtra e cerca i pagamenti
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(75vh-140px)] mt-4">
          <div className="space-y-4 px-1">
            {/* Global Search */}
            {onSearchQueryChange && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Ricerca Full-Text</Label>
                <div className="relative">
                  <Input
                    placeholder="Riferimento, metodo, dealer..."
                    value={searchQuery || ""}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    className="pr-8"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => onSearchQueryChange("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Tipo Pagamento */}
            <div className="space-y-2">
              <Label htmlFor="mobile-tipo" className="text-sm font-medium">
                Tipo Pagamento
              </Label>
              <Select value={tipoFilter} onValueChange={onTipoFilterChange}>
                <SelectTrigger id="mobile-tipo">
                  <SelectValue placeholder="Tipo pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i tipi</SelectItem>
                  <SelectItem value="acconto">Acconto</SelectItem>
                  <SelectItem value="saldo">Saldo</SelectItem>
                  <SelectItem value="parziale">Parziale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Metodo Pagamento */}
            <div className="space-y-2">
              <Label htmlFor="mobile-metodo" className="text-sm font-medium">
                Metodo Pagamento
              </Label>
              <Select value={metodoFilter} onValueChange={onMetodoFilterChange}>
                <SelectTrigger id="mobile-metodo">
                  <SelectValue placeholder="Metodo pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i metodi</SelectItem>
                  <SelectItem value="bonifico">Bonifico</SelectItem>
                  <SelectItem value="carta">Carta</SelectItem>
                  <SelectItem value="contanti">Contanti</SelectItem>
                  <SelectItem value="assegno">Assegno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Periodo</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="mobile-date-from" className="text-xs text-muted-foreground">
                    Da
                  </Label>
                  <Input
                    id="mobile-date-from"
                    type="date"
                    value={dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const newDate = e.target.value ? new Date(e.target.value) : undefined;
                      onDateRangeChange({
                        from: newDate,
                        to: dateRange?.to,
                      });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mobile-date-to" className="text-xs text-muted-foreground">
                    A
                  </Label>
                  <Input
                    id="mobile-date-to"
                    type="date"
                    value={dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const newDate = e.target.value ? new Date(e.target.value) : undefined;
                      onDateRangeChange({
                        from: dateRange?.from,
                        to: newDate,
                      });
                    }}
                  />
                </div>
              </div>
              {dateRange?.from && (
                <p className="text-xs text-muted-foreground mt-1">
                  {format(dateRange.from, "dd MMM yyyy", { locale: it })}
                  {dateRange.to && ` - ${format(dateRange.to, "dd MMM yyyy", { locale: it })}`}
                </p>
              )}
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="mt-4">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
