import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface PaymentFiltersProps {
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

export const PaymentFilters = ({
  dateRange,
  onDateRangeChange,
  tipoFilter,
  onTipoFilterChange,
  metodoFilter,
  onMetodoFilterChange,
  searchQuery,
  onSearchQueryChange,
  onReset,
}: PaymentFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Global Search */}
      {onSearchQueryChange && (
        <div className="relative">
          <Input
            placeholder="🔍 Ricerca: riferimento, metodo, dealer, ID ordine..."
            value={searchQuery || ""}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="pr-20"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => onSearchQueryChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      
      <div className="flex flex-wrap gap-4 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd MMM yyyy", { locale: it })} -{" "}
                  {format(dateRange.to, "dd MMM yyyy", { locale: it })}
                </>
              ) : (
                format(dateRange.from, "dd MMM yyyy", { locale: it })
              )
            ) : (
              "Seleziona periodo"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
            locale={it}
          />
        </PopoverContent>
      </Popover>

      <Select value={tipoFilter} onValueChange={onTipoFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipo pagamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutti i tipi</SelectItem>
          <SelectItem value="acconto">Acconto</SelectItem>
          <SelectItem value="saldo">Saldo</SelectItem>
          <SelectItem value="parziale">Parziale</SelectItem>
        </SelectContent>
      </Select>

      <Select value={metodoFilter} onValueChange={onMetodoFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Metodo pagamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutti i metodi</SelectItem>
          <SelectItem value="Bonifico">Bonifico</SelectItem>
          <SelectItem value="Carta di Credito">Carta di Credito</SelectItem>
          <SelectItem value="Contante">Contante</SelectItem>
          <SelectItem value="Assegno">Assegno</SelectItem>
          <SelectItem value="PayPal">PayPal</SelectItem>
        </SelectContent>
      </Select>

        <Button variant="ghost" onClick={onReset}>
          <X className="h-4 w-4 mr-2" />
          Reset filtri
        </Button>
      </div>
    </div>
  );
};
