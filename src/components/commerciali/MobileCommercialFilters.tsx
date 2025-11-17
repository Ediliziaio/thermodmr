import { useState } from "react";
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
import { Filter, X } from "lucide-react";

interface MobileCommercialFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "active" | "inactive";
  onStatusChange: (value: "all" | "active" | "inactive") => void;
  resultsCount?: number;
}

export function MobileCommercialFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  resultsCount,
}: MobileCommercialFiltersProps) {
  const [open, setOpen] = useState(false);

  const clearFilters = () => {
    onSearchChange("");
    onStatusChange("all");
  };

  const activeFiltersCount = [
    searchTerm,
    statusFilter !== "all" ? statusFilter : null,
  ].filter(Boolean).length;

  return (
    <div className="sticky top-0 z-10 bg-background pb-3 border-b">
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <div className="flex-1">
          <Input
            placeholder="Cerca commerciali..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
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
              <SheetTitle>Filtri Commerciali</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 py-6">
              {/* Stato */}
              <div className="space-y-2">
                <Label htmlFor="mobile-status">Stato</Label>
                <Select value={statusFilter} onValueChange={onStatusChange}>
                  <SelectTrigger id="mobile-status" className="h-12">
                    <SelectValue placeholder="Seleziona stato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti</SelectItem>
                    <SelectItem value="active">Attivi</SelectItem>
                    <SelectItem value="inactive">Non attivi</SelectItem>
                  </SelectContent>
                </Select>
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
