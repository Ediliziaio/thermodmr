import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, getStatusLabel, getStatusVariant } from "@/lib/utils";

interface OrderWithStats {
  id: string;
  stato: string;
  importo_totale: number;
  importo_pagato?: number;
  importo_da_pagare?: number;
  percentuale_pagata?: number;
  dealers: {
    ragione_sociale: string;
  };
}

interface OrderComboboxProps {
  value: string;
  onValueChange: (orderId: string) => void;
  orders: OrderWithStats[];
  isLoading?: boolean;
  disabled?: boolean;
}

export function OrderCombobox({
  value,
  onValueChange,
  orders,
  isLoading,
  disabled,
}: OrderComboboxProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const selectedOrder = orders.find((order) => order.id === value);

  // Filtra ordini in base alla query di ricerca e al filtro stato
  const filteredOrders = orders.filter((order) => {
    // Filtro per status
    if (statusFilter === "da_pagare_acconto" && order.stato !== "da_pagare_acconto") {
      return false;
    }
    if (statusFilter === "in_lavorazione" && order.stato !== "in_lavorazione") {
      return false;
    }
    
    // Filtro "Solo Miei Dealer" - filtra per commerciale_owner_id del dealer
    if (statusFilter === "my_dealers" && user) {
      const dealerOwnerId = (order as any)?.dealers?.commerciale_owner_id;
      if (dealerOwnerId !== user.id) {
        return false;
      }
    }
    
    // Filtro per query di ricerca
    const query = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(query) ||
      order.dealers.ragione_sociale.toLowerCase().includes(query) ||
      order.importo_totale.toString().includes(query) ||
      order.stato.toLowerCase().includes(query)
    );
  });

  const handleSelect = (orderId: string) => {
    onValueChange(orderId);
    setOpen(false);
    setSearchQuery("");
  };


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            "Caricamento ordini..."
          ) : selectedOrder ? (
            <span className="truncate">
              {selectedOrder.id} - {selectedOrder.dealers.ragione_sociale}
            </span>
          ) : (
            "🔍 Cerca ordine..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0" align="start">
        <Command shouldFilter={false}>
          <div className="p-2 border-b">
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="all" className="text-xs">
                  Tutti
                </TabsTrigger>
                <TabsTrigger value="da_pagare_acconto" className="text-xs">
                  Da Pagare
                </TabsTrigger>
                <TabsTrigger value="in_lavorazione" className="text-xs">
                  In Lavorazione
                </TabsTrigger>
                <TabsTrigger value="my_dealers" className="text-xs">
                  Miei Dealer
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <CommandInput
            placeholder="Cerca per ID, dealer, importo, stato..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>Nessun ordine trovato.</CommandEmpty>
            <CommandGroup heading={`Ordini Disponibili (${filteredOrders.length})`}>
              {filteredOrders.map((order) => (
                <CommandItem
                  key={order.id}
                  value={order.id}
                  onSelect={() => handleSelect(order.id)}
                  className="flex items-start gap-2 py-3"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{order.id}</span>
                      <Badge variant={getStatusVariant(order.stato)} className="text-xs">
                        {getStatusLabel(order.stato)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      🏢 {order.dealers.ragione_sociale}
                    </div>
                    <div className="flex gap-4 text-xs">
                      <span>💰 Totale: {formatCurrency(order.importo_totale)}</span>
                      {order.importo_da_pagare !== undefined && (
                        <span className="text-orange-600 font-medium">
                          💵 Da Pagare: {formatCurrency(order.importo_da_pagare)}
                        </span>
                      )}
                    </div>
                    {order.percentuale_pagata !== undefined && (
                      <div className="mt-1">
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 transition-all"
                            style={{ width: `${order.percentuale_pagata}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <Check
                    className={cn(
                      "h-4 w-4 shrink-0",
                      value === order.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
