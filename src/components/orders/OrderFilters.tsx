import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Filter, AlertCircle, Clock, Flame } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface OrderFiltersState {
  stato?: string;
  dealerId?: string;
  dataInserimentoFrom?: string;
  dataInserimentoTo?: string;
  importoMin?: number;
  importoMax?: number;
  searchTerm?: string;
  statoPagamento?: string;
  quickFilter?: string;
}

interface OrderFiltersProps {
  filters: OrderFiltersState;
  onFiltersChange: (filters: OrderFiltersState) => void;
  dealers: Array<{ id: string; ragione_sociale: string }>;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}

export function OrderFilters({ filters, onFiltersChange, dealers, searchQuery, onSearchQueryChange }: OrderFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof OrderFiltersState, value: any) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined);

  return (
    <div className="space-y-2">
      {/* Search + Quick Filters + Advanced Toggle — all in one row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Global Search */}
        {onSearchQueryChange && (
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Input
              placeholder="🔍 Ricerca: ID, dealer, cliente, note..."
              value={searchQuery || ""}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="pr-8 h-9 text-sm"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0.5 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => onSearchQueryChange("")}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}

        {/* Quick Filters */}
        <Button 
          variant={filters.quickFilter === 'saldo' ? 'default' : 'outline'}
          size="sm"
          className="h-9 text-xs"
          onClick={() => handleFilterChange('quickFilter', filters.quickFilter === 'saldo' ? undefined : 'saldo')}
        >
          <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
          Saldo Scoperto
        </Button>
        
        <Button 
          variant={filters.quickFilter === 'ritardo' ? 'default' : 'outline'}
          size="sm"
          className="h-9 text-xs"
          onClick={() => handleFilterChange('quickFilter', filters.quickFilter === 'ritardo' ? undefined : 'ritardo')}
        >
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          In Ritardo
        </Button>
        
        <Button 
          variant={filters.quickFilter === 'urgenti' ? 'default' : 'outline'}
          size="sm"
          className="h-9 text-xs"
          onClick={() => handleFilterChange('quickFilter', filters.quickFilter === 'urgenti' ? undefined : 'urgenti')}
        >
          <Flame className="h-3.5 w-3.5 mr-1.5" />
          Urgenti
        </Button>

        {/* Advanced Filters Toggle */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="contents">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 text-xs">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              Filtri
              {hasActiveFilters && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-primary text-primary-foreground leading-none">
                  {Object.values(filters).filter((v) => v !== undefined).length}
                </span>
              )}
            </Button>
          </CollapsibleTrigger>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" className="h-9 text-xs" onClick={clearFilters}>
              <X className="h-3.5 w-3.5 mr-1" />
              Azzera
            </Button>
          )}
        </Collapsible>
      </div>

      {/* Advanced Filters Panel */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <div className="border-t pt-3 pb-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Stato */}
              <div className="space-y-1">
                <Label className="text-xs">Stato</Label>
                <Select
                  value={filters.stato || "all"}
                  onValueChange={(value) =>
                    handleFilterChange("stato", value === "all" ? undefined : value)
                  }
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Tutti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti gli stati</SelectItem>
                    <SelectItem value="da_confermare">Da Confermare</SelectItem>
                    <SelectItem value="da_pagare_acconto">Da Pagare Acconto</SelectItem>
                    <SelectItem value="in_lavorazione">In Lavorazione</SelectItem>
                    <SelectItem value="da_saldare">Da Saldare</SelectItem>
                    <SelectItem value="da_consegnare">Da Consegnare</SelectItem>
                    <SelectItem value="consegnato">Consegnato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stato Pagamento */}
              <div className="space-y-1">
                <Label className="text-xs">Pagamento</Label>
                <Select
                  value={filters.statoPagamento || "all"}
                  onValueChange={(value) =>
                    handleFilterChange("statoPagamento", value === "all" ? undefined : value)
                  }
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Tutti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti</SelectItem>
                    <SelectItem value="pagato">Pagato</SelectItem>
                    <SelectItem value="parziale">Parziale</SelectItem>
                    <SelectItem value="non_pagato">Non Pagato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Importo range — Min / Max inline */}
              <div className="space-y-1">
                <Label className="text-xs">Importo (€)</Label>
                <div className="flex gap-1.5 items-center">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.importoMin || ""}
                    onChange={(e) =>
                      handleFilterChange("importoMin", e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    className="h-9 text-sm flex-1"
                  />
                  <span className="text-xs text-muted-foreground">—</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.importoMax || ""}
                    onChange={(e) =>
                      handleFilterChange("importoMax", e.target.value ? parseFloat(e.target.value) : undefined)
                    }
                    className="h-9 text-sm flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
