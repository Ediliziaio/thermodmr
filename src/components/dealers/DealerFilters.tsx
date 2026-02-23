import { useState, useEffect, useMemo } from "react";
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
import { useCommercialiInfinite } from "@/hooks/useCommercialiInfinite";
import type { DealerFilters as FilterType } from "@/hooks/useDealersInfinite";
import { PROVINCE_ITALIANE } from "@/lib/dealerConstants";

interface DealerFiltersProps {
  onFiltersChange: (filters: FilterType) => void;
  resultsCount?: number;
}

export function DealerFilters({ onFiltersChange, resultsCount }: DealerFiltersProps) {
  const [search, setSearch] = useState("");
  const [provincia, setProvincia] = useState("");
  const [commercialeId, setCommercialeId] = useState("");
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const [sortBy, setSortBy] = useState<FilterType["sortBy"]>("ragione_sociale");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data: commercialiData } = useCommercialiInfinite();
  const commerciali = useMemo(
    () => commercialiData?.pages.flatMap((p) => p.data) || [],
    [commercialiData]
  );

  useEffect(() => {
    const filters: FilterType = {
      search: search || undefined,
      provincia: provincia || undefined,
      commerciale_id: commercialeId || undefined,
      minRevenue: minRevenue ? parseFloat(minRevenue) : undefined,
      maxRevenue: maxRevenue ? parseFloat(maxRevenue) : undefined,
      sortBy,
      sortOrder,
    };
    onFiltersChange(filters);
  }, [search, provincia, commercialeId, minRevenue, maxRevenue, sortBy, sortOrder, onFiltersChange]);

  const clearFilters = () => {
    setSearch("");
    setProvincia("");
    setCommercialeId("");
    setMinRevenue("");
    setMaxRevenue("");
    setSortBy("ragione_sociale");
    setSortOrder("asc");
  };

  const activeFiltersCount = [
    search,
    provincia,
    commercialeId,
    minRevenue,
    maxRevenue,
  ].filter(Boolean).length;

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
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
                onClick={() => setSearch("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filtri Avanzati */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Provincia */}
          <div className="space-y-2">
            <Label htmlFor="provincia">Provincia</Label>
            <Select value={provincia} onValueChange={setProvincia}>
              <SelectTrigger id="provincia">
                <SelectValue placeholder="Tutte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tutte le province</SelectItem>
                {PROVINCE_ITALIANE.map((prov) => (
                  <SelectItem key={prov} value={prov}>
                    {prov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Commerciale */}
          <div className="space-y-2">
            <Label htmlFor="commerciale">Commerciale</Label>
            <Select value={commercialeId} onValueChange={setCommercialeId}>
              <SelectTrigger id="commerciale">
                <SelectValue placeholder="Tutti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tutti i commerciali</SelectItem>
                {commerciali
                  .filter((c) => c.is_active)
                  .map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.display_name}
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
