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
import { Filter, X, AlertCircle, Clock, Flame } from "lucide-react";
import { OrderFiltersState } from "./OrderFilters";
import { Badge } from "@/components/ui/badge";

interface MobileOrderFiltersProps {
  filters: OrderFiltersState;
  onFiltersChange: (filters: OrderFiltersState) => void;
  dealers: Array<{ id: string; ragione_sociale: string }>;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}

export function MobileOrderFilters({
  filters,
  onFiltersChange,
  dealers,
  searchQuery,
  onSearchQueryChange,
}: MobileOrderFiltersProps) {
  const handleFilterChange = (key: keyof OrderFiltersState, value: any) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    onFiltersChange({});
    if (onSearchQueryChange) onSearchQueryChange("");
  };

  const activeFiltersCount = Object.values(filters).filter((v) => v !== undefined).length + 
    (searchQuery ? 1 : 0);

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
      <SheetContent side="bottom" className="h-[85vh]">
        <SheetHeader>
          <SheetTitle className="text-lg">Filtri Ordini</SheetTitle>
          <SheetDescription className="text-xs">
            Filtra e cerca gli ordini
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(85vh-140px)] mt-4">
          <div className="space-y-4 px-1">
            {/* Global Search */}
            {onSearchQueryChange && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Ricerca Full-Text</Label>
                <div className="relative">
                  <Input
                    placeholder="ID, dealer, cliente, note..."
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

            {/* Quick Filters */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Filtri Rapidi</Label>
              <div className="flex flex-col gap-2">
                <Button
                  variant={filters.quickFilter === "saldo" ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    handleFilterChange(
                      "quickFilter",
                      filters.quickFilter === "saldo" ? undefined : "saldo"
                    )
                  }
                  className="justify-start"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Con Saldo Scoperto
                </Button>

                <Button
                  variant={filters.quickFilter === "ritardo" ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    handleFilterChange(
                      "quickFilter",
                      filters.quickFilter === "ritardo" ? undefined : "ritardo"
                    )
                  }
                  className="justify-start"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Consegna in Ritardo
                </Button>

                <Button
                  variant={filters.quickFilter === "urgenti" ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    handleFilterChange(
                      "quickFilter",
                      filters.quickFilter === "urgenti" ? undefined : "urgenti"
                    )
                  }
                  className="justify-start"
                >
                  <Flame className="h-4 w-4 mr-2" />
                  Urgenti
                </Button>
              </div>
            </div>

            {/* Stato */}
            <div className="space-y-2">
              <Label htmlFor="mobile-stato" className="text-sm font-medium">Stato Ordine</Label>
              <Select
                value={filters.stato || "all"}
                onValueChange={(value) =>
                  handleFilterChange("stato", value === "all" ? undefined : value)
                }
              >
                <SelectTrigger id="mobile-stato">
                  <SelectValue placeholder="Seleziona stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="da_confermare">Da Confermare</SelectItem>
                  <SelectItem value="da_pagare_acconto">Da Pagare Acconto</SelectItem>
                  <SelectItem value="in_lavorazione">In Lavorazione</SelectItem>
                  <SelectItem value="da_consegnare">Da Consegnare</SelectItem>
                  <SelectItem value="consegnato">Consegnato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dealer */}
            <div className="space-y-2">
              <Label htmlFor="mobile-dealer" className="text-sm font-medium">Rivenditore</Label>
              <Select
                value={filters.dealerId || "all"}
                onValueChange={(value) =>
                  handleFilterChange("dealerId", value === "all" ? undefined : value)
                }
              >
                <SelectTrigger id="mobile-dealer">
                  <SelectValue placeholder="Seleziona rivenditore" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i rivenditori</SelectItem>
                  {dealers.map((dealer) => (
                    <SelectItem key={dealer.id} value={dealer.id}>
                      {dealer.ragione_sociale}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stato Pagamento */}
            <div className="space-y-2">
              <Label htmlFor="mobile-payment-status" className="text-sm font-medium">Stato Pagamento</Label>
              <Select
                value={filters.statoPagamento || "all"}
                onValueChange={(value) =>
                  handleFilterChange("statoPagamento", value === "all" ? undefined : value)
                }
              >
                <SelectTrigger id="mobile-payment-status">
                  <SelectValue placeholder="Stato pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti</SelectItem>
                  <SelectItem value="non_pagato">Non Pagato</SelectItem>
                  <SelectItem value="parziale">Pagamento Parziale</SelectItem>
                  <SelectItem value="pagato">Pagato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Importo Range */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Range Importo (€)</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="mobile-importo-min" className="text-xs text-muted-foreground">Min</Label>
                  <Input
                    id="mobile-importo-min"
                    type="number"
                    placeholder="0"
                    value={filters.importoMin || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "importoMin",
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mobile-importo-max" className="text-xs text-muted-foreground">Max</Label>
                  <Input
                    id="mobile-importo-max"
                    type="number"
                    placeholder="∞"
                    value={filters.importoMax || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "importoMax",
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Data Inserimento</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="mobile-date-from" className="text-xs text-muted-foreground">Da</Label>
                  <Input
                    id="mobile-date-from"
                    type="date"
                    value={filters.dataInserimentoFrom || ""}
                    onChange={(e) =>
                      handleFilterChange("dataInserimentoFrom", e.target.value || undefined)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mobile-date-to" className="text-xs text-muted-foreground">A</Label>
                  <Input
                    id="mobile-date-to"
                    type="date"
                    value={filters.dataInserimentoTo || ""}
                    onChange={(e) =>
                      handleFilterChange("dataInserimentoTo", e.target.value || undefined)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="mt-4">
          <Button variant="outline" onClick={clearFilters} className="flex-1">
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
