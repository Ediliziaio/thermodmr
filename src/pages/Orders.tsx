import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Loader2, AlertCircle, RefreshCw, X, Trash2, Download, Plus, FileText, List, Kanban } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrdersInfinite } from "@/hooks/useOrdersInfinite";
import { NewOrderDialog } from "@/components/orders/NewOrderDialog";
import { NewPreventivoDialog } from "@/components/orders/NewPreventivoDialog";
import { BulkUpdateStatusDialog } from "@/components/orders/BulkUpdateStatusDialog";
import { BulkDeleteOrdersDialog } from "@/components/orders/BulkDeleteOrdersDialog";
import { OrderFilters, OrderFiltersState } from "@/components/orders/OrderFilters";
import { MobileOrdersList } from "@/components/orders/MobileOrdersList";
import { MobileOrderFilters } from "@/components/orders/MobileOrderFilters";
import { OrderPipelineDnD } from "@/components/orders/OrderPipelineDnD";
import { QuickPaymentDialog } from "@/components/orders/QuickPaymentDialog";
import { exportOrdersCustom, ORDER_COLUMNS } from "@/lib/exportUtils";
import { ExportColumnsDialog } from "@/components/export/ExportColumnsDialog";
import { toast } from "@/hooks/use-toast";
import { useDealersInfinite } from "@/hooks/useDealersInfinite";
import { useMemo, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { formatCurrency, formatDate, getStatusColor, getStatusLabel, cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, subMonths, startOfMonth, startOfYear, endOfYear, subYears } from "date-fns";
import { it } from "date-fns/locale";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

type ViewMode = "lista" | "pipeline";

interface OrdersProps {
  dealerId?: string;
}

export default function Orders({ dealerId }: OrdersProps = {}) {
  useRealtimeSync();
  
  const navigate = useNavigate();
  
  const { userRole } = useAuth();
  const isMobile = useIsMobile();
  const isDealerArea = !!dealerId;
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useOrdersInfinite({ searchQuery, dealerId });
  const { data: dealersData } = useDealersInfinite();
  const dealers = useMemo(() => dealersData?.pages.flatMap(p => p.data) || [], [dealersData]);
  const [filters, setFilters] = useState<OrderFiltersState>({});
  const { ref, inView } = useInView();
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());
  const [bulkStatusDialogOpen, setBulkStatusDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [newOrderDialogOpen, setNewOrderDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [preventivoDialogOpen, setPreventivoDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("lista");
  
  // Quick payment state
  const [quickPayment, setQuickPayment] = useState<{
    open: boolean;
    orderId: string;
    orderTotal: number;
    amountPaid: number;
  }>({ open: false, orderId: "", orderTotal: 0, amountPaid: 0 });

  // Helper functions for selection
  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrderIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedOrderIds.size === filteredOrders.length && filteredOrders.length > 0) {
      setSelectedOrderIds(new Set());
    } else {
      setSelectedOrderIds(new Set(filteredOrders.map(o => o.id!)));
    }
  };

  const clearSelection = () => setSelectedOrderIds(new Set());

  // Clear selection when filters change
  useEffect(() => {
    clearSelection();
  }, [filters]);

  // Carica automaticamente la prossima pagina quando l'utente scorre fino in fondo
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Unisci tutte le pagine in un unico array
  const allOrders = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      if (filters.stato && order.stato !== filters.stato) return false;
      if (filters.dealerId && order.dealer_id !== filters.dealerId) return false;
      if (filters.dataInserimentoFrom) {
        const orderDate = new Date(order.data_inserimento);
        if (orderDate < new Date(filters.dataInserimentoFrom)) return false;
      }
      if (filters.dataInserimentoTo) {
        const orderDate = new Date(order.data_inserimento);
        const filterDate = new Date(filters.dataInserimentoTo);
        filterDate.setHours(23, 59, 59, 999);
        if (orderDate > filterDate) return false;
      }
      if (filters.importoMin && order.importo_totale < filters.importoMin) return false;
      if (filters.importoMax && order.importo_totale > filters.importoMax) return false;
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(searchLower);
        const matchesDealer = order.dealers?.ragione_sociale?.toLowerCase().includes(searchLower);
        const matchesClient = order.clients
          ? `${order.clients.nome} ${order.clients.cognome}`.toLowerCase().includes(searchLower)
          : false;
        if (!matchesId && !matchesDealer && !matchesClient) return false;
      }
      if (filters.statoPagamento) {
        if (filters.statoPagamento === 'pagato' && order.importo_da_pagare > 0) return false;
        if (filters.statoPagamento === 'non_pagato' && order.importo_pagato > 0) return false;
        if (filters.statoPagamento === 'parziale' && (order.importo_pagato === 0 || order.importo_da_pagare === 0)) return false;
      }
      if (filters.quickFilter === 'saldo' && order.importo_da_pagare === 0) return false;
      if (filters.quickFilter === 'ritardo') {
        if (!order.data_consegna_prevista || new Date(order.data_consegna_prevista) >= new Date()) return false;
      }
      if (filters.quickFilter === 'urgenti') {
        const isOverdue = order.data_consegna_prevista && new Date(order.data_consegna_prevista) < new Date();
        const hasBalance = order.importo_da_pagare > 0;
        const isNotDelivered = order.stato !== 'consegnato';
        if (!(isOverdue || (hasBalance && isNotDelivered))) return false;
      }
      return true;
    });
  }, [allOrders, filters]);

  const handleExportCSV = (selectedColumns: string[], data: any[]) => {
    exportOrdersCustom(data, selectedColumns);
  };

  const ordersToExport = selectedOrderIds.size > 0 
    ? filteredOrders.filter(o => selectedOrderIds.has(o.id!))
    : filteredOrders;

  // Statistiche per l'header
  const stats = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const totalValue = filteredOrders.reduce((sum, o) => sum + o.importo_totale, 0);
    const totalToCollect = filteredOrders.reduce((sum, o) => sum + o.importo_da_pagare, 0);
    const ordersWithBalance = filteredOrders.filter(o => o.importo_da_pagare > 0).length;
    return { totalOrders, totalValue, totalToCollect, ordersWithBalance };
  }, [filteredOrders]);

  if (isLoading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Caricamento ordini...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="text-center">
              <h3 className="font-semibold text-lg">Errore nel caricamento</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Impossibile caricare gli ordini. Verifica la connessione e riprova.
              </p>
            </div>
            <Button onClick={() => refetch()}>Riprova</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalCount = data?.pages[0]?.totalCount || 0;

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Ordini</h1>
              {selectedOrderIds.size > 0 && (
                <Badge variant="secondary" className="text-sm">
                  {selectedOrderIds.size} selezionati
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              Gestisci tutti gli ordini dei rivenditori
            </p>
          </div>
          {!isMobile && !isDealerArea && (
            <div className="flex gap-2">
              {userRole === "super_admin" && (
                <>
                  <Button variant="outline" onClick={() => setPreventivoDialogOpen(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Nuovo Preventivo
                  </Button>
                  <NewPreventivoDialog open={preventivoDialogOpen} onOpenChange={setPreventivoDialogOpen} />
                </>
              )}
              <NewOrderDialog open={newOrderDialogOpen} onOpenChange={setNewOrderDialogOpen} />
            </div>
          )}
        </div>

        {/* Dealer Filter + View Toggle Row */}
        {!isMobile && !isDealerArea && (
          <div className="flex items-center gap-4 flex-wrap">
            {/* Dealer Quick Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Rivenditore:</span>
              <Select
                value={filters.dealerId || "all"}
                onValueChange={(v) =>
                  setFilters((prev) => ({
                    ...prev,
                    dealerId: v === "all" ? undefined : v,
                  }))
                }
              >
                <SelectTrigger className="w-[220px] h-9">
                  <SelectValue placeholder="Tutti i rivenditori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i rivenditori</SelectItem>
                  {dealers.map((d) => (
                    <SelectItem key={d.id} value={d.id!}>
                      {d.ragione_sociale}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <Tabs
              value={viewMode}
              onValueChange={(v) => setViewMode(v as ViewMode)}
              className="ml-auto"
            >
              <TabsList className="h-9">
                <TabsTrigger value="lista" className="gap-1.5 text-xs px-3">
                  <List className="h-3.5 w-3.5" />
                  Lista
                </TabsTrigger>
                <TabsTrigger value="pipeline" className="gap-1.5 text-xs px-3">
                  <Kanban className="h-3.5 w-3.5" />
                  Pipeline
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Statistiche Header */}
        <div className={cn(
          isMobile 
            ? "flex gap-4 overflow-x-auto -mx-6 px-6 pb-4" 
            : "grid grid-cols-2 lg:grid-cols-4 gap-4"
        )} style={isMobile ? { minWidth: 'max-content' } : undefined}>
          <Card className={cn(isMobile && "min-w-[160px]")}>
            <CardContent className="py-3 px-4">
              <p className="text-xs font-medium text-muted-foreground">Totale Ordini</p>
              <p className="text-xl font-bold mt-0.5">{stats.totalOrders}</p>
            </CardContent>
          </Card>
          <Card className={cn(isMobile && "min-w-[160px]")}>
            <CardContent className="py-3 px-4">
              <p className="text-xs font-medium text-muted-foreground">Valore Totale</p>
              <p className="text-xl font-bold mt-0.5">{formatCurrency(stats.totalValue)}</p>
            </CardContent>
          </Card>
          <Card className={cn(isMobile && "min-w-[160px]")}>
            <CardContent className="py-3 px-4">
              <p className="text-xs font-medium text-muted-foreground">Da Incassare</p>
              <p className="text-xl font-bold mt-0.5 text-orange-600">{formatCurrency(stats.totalToCollect)}</p>
            </CardContent>
          </Card>
          <Card className={cn(isMobile && "min-w-[160px]")}>
            <CardContent className="py-3 px-4">
              <p className="text-xs font-medium text-muted-foreground">Ordini con Saldo</p>
              <p className="text-xl font-bold mt-0.5 text-red-600">{stats.ordersWithBalance}</p>
            </CardContent>
          </Card>
        </div>

        {/* Vista Condizionale */}
        {isMobile ? (
          <>
            <MobileOrdersList
              orders={filteredOrders}
              selectedOrderIds={selectedOrderIds}
              onToggleSelect={toggleOrderSelection}
              onViewDetails={(id) => isDealerArea ? navigate(`../ordini/${id}`, { relative: 'path' }) : navigate(`/ordini/${id}`)}
              userRole={userRole || ''}
            />
            <MobileOrderFilters
              filters={filters}
              onFiltersChange={setFilters}
              dealers={dealers || []}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />
          </>
        ) : viewMode === "pipeline" ? (
          <>
            <OrderFilters
              filters={filters}
              onFiltersChange={setFilters}
              dealers={dealers || []}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />
            <OrderPipelineDnD orders={filteredOrders} isDealerArea={isDealerArea} />
          </>
        ) : (
          <>
            {/* Filtri Desktop */}
            <OrderFilters
              filters={filters}
              onFiltersChange={setFilters}
              dealers={dealers || []}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />

            {/* Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>Lista Ordini</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-background z-10">
                        <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                          <th className="pb-3 pr-4 w-12">
                            <Checkbox
                              checked={selectedOrderIds.size === filteredOrders.length && filteredOrders.length > 0}
                              onCheckedChange={toggleSelectAll}
                              aria-label="Seleziona tutti gli ordini"
                            />
                          </th>
                          <th className="pb-3 pr-4">ID Ordine</th>
                          <th className="pb-3 pr-4">Rivenditore</th>
                          <th className="pb-3 pr-4">Cliente</th>
                          <th className="pb-3 pr-4">Stato</th>
                          <th className="pb-3 pr-4">Data Inserimento</th>
                          <th className="pb-3 pr-4">Importo Totale</th>
                          <th className="pb-3 pr-4">Acconto</th>
                          <th className="pb-3 pr-4">Importo da Pagare</th>
                          <th className="pb-3 pr-4">Consegna Prevista</th>
                          <th className="pb-3 pr-4">Sett.</th>
                          <th className="pb-3">Azioni</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => {
                          const isOverdue = order.data_consegna_prevista && new Date(order.data_consegna_prevista) < new Date();
                          const hasUrgentBalance = order.importo_da_pagare > 0 && order.stato !== 'consegnato';
                          const isSelected = selectedOrderIds.has(order.id!);
                          
                          return (
                            <tr 
                              key={order.id} 
                              className={cn(
                                "border-b last:border-0 hover:bg-muted/50 transition-colors",
                                isSelected && "bg-muted/50"
                              )}
                            >
                              <td className="py-4 pr-4">
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => toggleOrderSelection(order.id!)}
                                  aria-label={`Seleziona ordine ${order.id}`}
                                />
                              </td>
                              <td className="py-4 pr-4">
                                <p className="font-medium">{order.id}</p>
                              </td>
                              <td className="py-4 pr-4">
                                <p className="text-sm">{order.dealers?.ragione_sociale || "-"}</p>
                                <p className="text-xs text-muted-foreground">
                                  {order.dealers?.email || ""}
                                </p>
                              </td>
                              <td className="py-4 pr-4 text-sm">
                                {order.clients 
                                  ? `${order.clients.nome} ${order.clients.cognome}` 
                                  : "-"}
                              </td>
                              <td className="py-4 pr-4">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className={getStatusColor(order.stato)}>
                                    {getStatusLabel(order.stato)}
                                  </Badge>
                                  {hasUrgentBalance && (
                                    <Badge variant="destructive" className="text-xs">
                                      <AlertCircle className="h-3 w-3 mr-1" />
                                      Saldo
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="py-4 pr-4 text-sm">
                                {formatDate(new Date(order.data_inserimento))}
                              </td>
                              <td className="py-4 pr-4 font-medium">
                                {formatCurrency(order.importo_totale)}
                              </td>
                              <td className="py-4 pr-4 text-sm">
                                {formatCurrency(order.importo_acconto)}
                              </td>
                              <td className="py-4 pr-4">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="space-y-1 cursor-help">
                                      <div className="flex items-center gap-1.5">
                                        <p className={cn(
                                          "font-medium text-sm",
                                          order.importo_da_pagare === 0 
                                            ? "text-green-600" 
                                            : order.importo_da_pagare > order.importo_totale * 0.5 
                                              ? "text-red-600" 
                                              : "text-orange-600"
                                        )}>
                                          {formatCurrency(order.importo_da_pagare)}
                                        </p>
                                        {order.importo_da_pagare > 0 && (userRole === "super_admin" || userRole === "commerciale") && (
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 rounded-full"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setQuickPayment({
                                                open: true,
                                                orderId: order.id!,
                                                orderTotal: order.importo_totale,
                                                amountPaid: order.importo_pagato,
                                              });
                                            }}
                                          >
                                            <Plus className="h-3 w-3" />
                                          </Button>
                                        )}
                                      </div>
                                      
                                      <div className="w-full bg-muted rounded-full h-1.5">
                                        <div 
                                          className={cn(
                                            "h-1.5 rounded-full transition-all",
                                            order.percentuale_pagata === 100 
                                              ? "bg-green-500" 
                                              : order.percentuale_pagata > 50 
                                                ? "bg-orange-500" 
                                                : "bg-red-500"
                                          )}
                                          style={{ width: `${order.percentuale_pagata}%` }}
                                        />
                                      </div>
                                      
                                      <p className="text-xs text-muted-foreground">
                                        {order.numero_pagamenti} pag. • {(order.percentuale_pagata ?? 0).toFixed(0)}%
                                      </p>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="space-y-1">
                                      <p className="font-medium">Dettaglio Pagamenti</p>
                                      <p className="text-sm">Totale: {formatCurrency(order.importo_totale)}</p>
                                      <p className="text-sm">Pagato: {formatCurrency(order.importo_pagato)}</p>
                                      <p className="text-sm">Mancante: {formatCurrency(order.importo_da_pagare)}</p>
                                      {order.data_ultimo_pagamento && (
                                        <p className="text-xs text-muted-foreground">
                                          Ultimo: {formatDate(new Date(order.data_ultimo_pagamento))}
                                        </p>
                                      )}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </td>
                              <td className="py-4 pr-4 text-sm">
                                <span className={cn(isOverdue && "text-red-600 font-medium")}>
                                  {order.data_consegna_prevista
                                    ? formatDate(new Date(order.data_consegna_prevista))
                                    : "N/A"}
                                </span>
                              </td>
                              <td className="py-4 pr-4 text-sm text-center">
                                {order.settimana_consegna ? (
                                  <Badge variant="outline" className="font-mono">
                                    W{order.settimana_consegna}
                                  </Badge>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </td>
                              <td className="py-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => isDealerArea ? navigate(`../ordini/${order.id}`, { relative: 'path' }) : navigate(`/ordini/${order.id}`)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Dettagli
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {allOrders && allOrders.length > 0
                        ? "Nessun ordine corrisponde ai filtri"
                        : "Nessun ordine trovato"}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm mb-6">
                      {allOrders && allOrders.length > 0
                        ? "Prova a modificare i filtri di ricerca"
                        : "Crea il tuo primo ordine per iniziare"}
                    </p>
                    {!allOrders?.length && userRole === 'super_admin' && (
                      <Button onClick={() => setNewOrderDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Crea Ordine
                      </Button>
                    )}
                  </div>
                )}

                {/* Infinite scroll trigger */}
                {hasNextPage && (
                  <div ref={ref} className="flex justify-center py-4">
                    {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Floating Action Bar */}
        {selectedOrderIds.size > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5">
            <Card className="shadow-lg border-2">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {selectedOrderIds.size} {selectedOrderIds.size === 1 ? 'ordine selezionato' : 'ordini selezionati'}
                  </Badge>
                </div>
                
                <div className="h-6 w-px bg-border" />
                
                <div className="flex items-center gap-2">
                  {userRole === 'super_admin' && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => setBulkStatusDialogOpen(true)}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Aggiorna Stato
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setBulkDeleteDialogOpen(true)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Elimina
                      </Button>
                    </>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExportDialogOpen(true)}
                    disabled={filteredOrders.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Esporta CSV {selectedOrderIds.size > 0 && `(${selectedOrderIds.size})`}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSelection}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Annulla
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bulk Update Status Dialog */}
        <BulkUpdateStatusDialog
          open={bulkStatusDialogOpen}
          onOpenChange={setBulkStatusDialogOpen}
          selectedOrderIds={Array.from(selectedOrderIds)}
          onSuccess={clearSelection}
        />

        {/* Bulk Delete Orders Dialog */}
        <BulkDeleteOrdersDialog
          open={bulkDeleteDialogOpen}
          onOpenChange={setBulkDeleteDialogOpen}
          selectedOrderIds={Array.from(selectedOrderIds)}
          onSuccess={clearSelection}
        />

        {/* Export Columns Dialog */}
        <ExportColumnsDialog
          open={exportDialogOpen}
          onOpenChange={setExportDialogOpen}
          columns={ORDER_COLUMNS}
          data={ordersToExport}
          filename="ordini"
          onExport={handleExportCSV}
        />

        {/* Quick Payment Dialog */}
        <QuickPaymentDialog
          open={quickPayment.open}
          onOpenChange={(open) => setQuickPayment((prev) => ({ ...prev, open }))}
          orderId={quickPayment.orderId}
          orderTotal={quickPayment.orderTotal}
          amountPaid={quickPayment.amountPaid}
        />
      </div>
    </TooltipProvider>
  );
}
