import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, X, ArrowUpDown } from "lucide-react";
import { useCommercialiInfinite } from "@/hooks/useCommercialiInfinite";
import type { DealerFilters as FilterType } from "@/hooks/useDealersInfinite";

interface MobileDealerFiltersProps {
  onFiltersChange: (filters: FilterType) => void;
  resultsCount?: number;
}

const PROVINCE_ITALIANE = [
  "AG", "AL", "AN", "AO", "AR", "AP", "AT", "AV", "BA", "BT", "BL", "BN", "BG", "BI", "BO",
  "BZ", "BS", "BR", "CA", "CL", "CB", "CI", "CE", "CT", "CZ", "CH", "CO", "CS", "CR", "KR",
  "CN", "EN", "FM", "FE", "FI", "FG", "FC", "FR", "GE", "GO", "GR", "IM", "IS", "SP", "AQ",
  "LT", "LE", "LC", "LI", "LO", "LU", "MC", "MN", "MS", "MT", "VS", "ME", "MI", "MO", "MB",
  "NA", "NO", "NU", "OT", "OR", "PD", "PA", "PR", "PV", "PG", "PU", "PE", "PC", "PI", "PT",
  "PN", "PZ", "PO", "RG", "RA", "RC", "RE", "RI", "RN", "RM", "RO", "SA", "SS", "SV", "SI",
  "SR", "SO", "TA", "TE", "TR", "TO", "TP", "TN", "TV", "TS", "UD", "VA", "VE", "VB", "VC",
  "VR", "VV", "VI", "VT"
];

export function MobileDealerFilters({
  onFiltersChange,
  resultsCount,
}: MobileDealerFiltersProps) {
  const [open, setOpen] = useState(false);
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
    <div className="sticky top-0 z-10 bg-background pb-3 border-b">
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <div className="flex-1">
          <Input
            placeholder="Cerca rivenditori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Filter Sheet Trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-11 w-11 relative">
              <Filter className="h-5 w-5" />
              {activeFiltersCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtri Rivenditori</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 py-6">
              {/* Provincia */}
              <div className="space-y-2">
                <Label htmlFor="mobile-provincia">Provincia</Label>
                <Select value={provincia} onValueChange={setProvincia}>
                  <SelectTrigger id="mobile-provincia" className="h-12">
                    <SelectValue placeholder="Tutte le province" />
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
                <Label htmlFor="mobile-commerciale">Commerciale</Label>
                <Select value={commercialeId} onValueChange={setCommercialeId}>
                  <SelectTrigger id="mobile-commerciale" className="h-12">
                    <SelectValue placeholder="Tutti i commerciali" />
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

              {/* Range Fatturato */}
              <div className="space-y-4">
                <Label>Range Fatturato (€)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="mobile-minRevenue" className="text-xs">
                      Minimo
                    </Label>
                    <Input
                      id="mobile-minRevenue"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="0"
                      value={minRevenue}
                      onChange={(e) => setMinRevenue(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile-maxRevenue" className="text-xs">
                      Massimo
                    </Label>
                    <Input
                      id="mobile-maxRevenue"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="Illimitato"
                      value={maxRevenue}
                      onChange={(e) => setMaxRevenue(e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Ordinamento */}
              <div className="space-y-2">
                <Label>Ordina per</Label>
                <div className="flex gap-2">
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as FilterType["sortBy"])}
                  >
                    <SelectTrigger className="h-12 flex-1">
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
                    className="h-12 w-12"
                    title={sortOrder === "asc" ? "Crescente" : "Decrescente"}
                  >
                    <ArrowUpDown className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Results Count */}
              {resultsCount !== undefined && (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  {resultsCount} {resultsCount === 1 ? "risultato" : "risultati"}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex-1 h-12"
                  disabled={activeFiltersCount === 0}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancella Filtri
                </Button>
                <Button onClick={() => setOpen(false)} className="flex-1 h-12">
                  Applica
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
