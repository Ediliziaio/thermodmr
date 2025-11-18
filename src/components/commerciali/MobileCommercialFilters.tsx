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
import { Filter, X, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommercialFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "active" | "inactive";
  onStatusChange: (value: "all" | "active" | "inactive") => void;
  resultsCount?: number;
}

export const MobileCommercialFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  resultsCount,
}: CommercialFiltersProps) => {
  const activeFiltersCount = 
    (searchTerm ? 1 : 0) + 
    (statusFilter !== "all" ? 1 : 0);

  const handleReset = () => {
    onSearchChange("");
    onStatusChange("all");
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
      <SheetContent side="bottom" className="h-[60vh]">
        <SheetHeader>
          <SheetTitle className="text-lg">Filtri Commerciali</SheetTitle>
          <SheetDescription className="text-xs">
            Filtra e cerca i commerciali
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(60vh-140px)] mt-4">
          <div className="space-y-4 px-1">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="mobile-search" className="text-sm font-medium">Cerca</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="mobile-search"
                  placeholder="Nome o email..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 pr-8"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => onSearchChange("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="mobile-status" className="text-sm font-medium">Stato</Label>
              <Select value={statusFilter} onValueChange={onStatusChange}>
                <SelectTrigger id="mobile-status">
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
              <div className="text-center py-4 text-sm text-muted-foreground border-t">
                {resultsCount} {resultsCount === 1 ? "risultato trovato" : "risultati trovati"}
              </div>
            )}
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
};
