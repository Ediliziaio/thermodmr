import { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X, ArrowUpDown } from "lucide-react";
import type { DealerFilters as FilterType } from "@/hooks/useDealersInfinite";
import { PROVINCE_ITALIANE } from "@/lib/dealerConstants";

interface DealerFiltersProps {
  onFiltersChange: (filters: FilterType) => void;
  resultsCount?: number;
}

export function DealerFilters({ onFiltersChange, resultsCount }: DealerFiltersProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [provincia, setProvincia] = useState("");
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const [sortBy, setSortBy] = useState<FilterType["sortBy"]>("ragione_sociale");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Debounce search input (300ms)
  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  useEffect(() => {
    const filters: FilterType = {
      search: debouncedSearch || undefined,
      provincia: provincia && provincia.trim() ? provincia : undefined,
      minRevenue: minRevenue ? parseFloat(minRevenue) : undefined,
      maxRevenue: maxRevenue ? parseFloat(maxRevenue) : undefined,
      sortBy,
      sortOrder,
    };
    onFiltersChange(filters);
  }, [debouncedSearch, provincia, minRevenue, maxRevenue, sortBy, sortOrder, onFiltersChange]);

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setProvincia("");
    setMinRevenue("");
    setMaxRevenue("");
    setSortBy("ragione_sociale");
    setSortOrder("asc");
  };

  const activeFiltersCount = [
    debouncedSearch,
    provincia,
    minRevenue,
    maxRevenue,
  ].filter(Boolean).length;

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleProvinciaChange = (value: string) => {
    setProvincia(value === "all" ? "" : value);
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* Ricerca Full-Text */}
        <div className="space-y-2">
          <Label htmlFor="search">Ricerca</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Cerca per ragione sociale, P.IVA, email, telefono..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
            {search && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => { setSearch(""); setDebouncedSearch(""); }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filtri Avanzati */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Provincia */}
          <div className="space-y-2">
            <Label htmlFor="provincia">Provincia</Label>
            <Select value={provincia || "all"} onValueChange={handleProvinciaChange}>
              <SelectTrigger id="provincia">
                <SelectValue placeholder="Tutte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le province</SelectItem>
                {PROVINCE_ITALIANE.map((prov) => (
                  <SelectItem key={prov} value={prov}>
                    {prov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Range Fatturato Min */}
          <div className="space-y-2">
            <Label htmlFor="minRevenue">Fatturato Min (€)</Label>
            <Input
              id="minRevenue"
              type="number"
              min="0"
              step="1000"
              placeholder="0"
              value={minRevenue}
              onChange={(e) => setMinRevenue(e.target.value)}
            />
          </div>

          {/* Range Fatturato Max */}
          <div className="space-y-2">
            <Label htmlFor="maxRevenue">Fatturato Max (€)</Label>
            <Input
              id="maxRevenue"
              type="number"
              min="0"
              step="1000"
              placeholder="Illimitato"
              value={maxRevenue}
              onChange={(e) => setMaxRevenue(e.target.value)}
            />
          </div>
        </div>

        {/* Ordinamento */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Label>Ordina per:</Label>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as FilterType["sortBy"])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ragione_sociale">Nome</SelectItem>
                <SelectItem value="total_revenue">Fatturato</SelectItem>
                <SelectItem value="orders_count">Numero Ordini</SelectItem>
                <SelectItem value="created_at">Data Creazione</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSortOrder}
              title={sortOrder === "asc" ? "Crescente" : "Decrescente"}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {activeFiltersCount > 0 && (
              <>
                <Badge variant="secondary">{activeFiltersCount} filtri attivi</Badge>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Cancella Filtri
                </Button>
              </>
            )}
            {resultsCount !== undefined && (
              <span className="text-sm text-muted-foreground">
                {resultsCount} {resultsCount === 1 ? "risultato" : "risultati"}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
