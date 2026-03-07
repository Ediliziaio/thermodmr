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
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="space-y-4">
      {/* Global Search */}
      {onSearchQueryChange && (
        <div className="relative">
          <Input
            placeholder="🔍 Ricerca full-text: ID, dealer, cliente, note..."
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
      
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={filters.quickFilter === 'saldo' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('quickFilter', filters.quickFilter === 'saldo' ? undefined : 'saldo')}
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          Con Saldo Scoperto
        </Button>
        
        <Button 
          variant={filters.quickFilter === 'ritardo' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('quickFilter', filters.quickFilter === 'ritardo' ? undefined : 'ritardo')}
        >
          <Clock className="h-4 w-4 mr-2" />
          Consegna in Ritardo
        </Button>
        
        <Button 
          variant={filters.quickFilter === 'urgenti' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('quickFilter', filters.quickFilter === 'urgenti' ? undefined : 'urgenti')}
        >
          <Flame className="h-4 w-4 mr-2" />
          Urgenti
        </Button>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtri Avanzati
              {hasActiveFilters && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                  {Object.values(filters).filter((v) => v !== undefined).length}
                </span>
              )}
            </Button>
          </CollapsibleTrigger>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Cancella filtri
            </Button>
          )}
        </div>

      <CollapsibleContent>
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Ricerca generale */}
              <div className="space-y-2">
                <Label htmlFor="search">Ricerca</Label>
                <Input
                  id="search"
                  placeholder="ID Ordine, Cliente..."
                  value={filters.searchTerm || ""}
                  onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                />
              </div>

              {/* Stato */}
              <div className="space-y-2">
                <Label htmlFor="stato">Stato</Label>
                <Select
                  value={filters.stato || "all"}
                  onValueChange={(value) =>
                    handleFilterChange("stato", value === "all" ? undefined : value)
                  }
                >
                  <SelectTrigger id="stato">
                    <SelectValue placeholder="Tutti gli stati" />
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
              <div className="space-y-2">
                <Label htmlFor="statoPagamento">Stato Pagamento</Label>
                <Select
                  value={filters.statoPagamento || "all"}
                  onValueChange={(value) =>
                    handleFilterChange("statoPagamento", value === "all" ? undefined : value)
                  }
                >
                  <SelectTrigger id="statoPagamento">
                    <SelectValue placeholder="Tutti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti</SelectItem>
                    <SelectItem value="pagato">Pagato Completamente</SelectItem>
                    <SelectItem value="parziale">Pagamento Parziale</SelectItem>
                    <SelectItem value="non_pagato">Non Pagato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rivenditore */}
              <div className="space-y-2">
                <Label htmlFor="dealer">Rivenditore</Label>
                <Select
                  value={filters.dealerId || "all"}
                  onValueChange={(value) =>
                    handleFilterChange("dealerId", value === "all" ? undefined : value)
                  }
                >
                  <SelectTrigger id="dealer">
                    <SelectValue placeholder="Tutti i rivenditori" />
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

              {/* Data Inserimento Da */}
              <div className="space-y-2">
                <Label htmlFor="dateFrom">Data Inserimento Da</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={filters.dataInserimentoFrom || ""}
                  onChange={(e) => handleFilterChange("dataInserimentoFrom", e.target.value)}
                />
              </div>

              {/* Data Inserimento A */}
              <div className="space-y-2">
                <Label htmlFor="dateTo">Data Inserimento A</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={filters.dataInserimentoTo || ""}
                  onChange={(e) => handleFilterChange("dataInserimentoTo", e.target.value)}
                />
              </div>

              {/* Importo Minimo */}
              <div className="space-y-2">
                <Label htmlFor="importoMin">Importo Minimo (€)</Label>
                <Input
                  id="importoMin"
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

              {/* Importo Massimo */}
              <div className="space-y-2">
                <Label htmlFor="importoMax">Importo Massimo (€)</Label>
                <Input
                  id="importoMax"
                  type="number"
                  placeholder="999999"
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
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
    </div>
  );
}
