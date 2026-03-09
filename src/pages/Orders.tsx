import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, RefreshCw, X, Trash2, Download, Plus, FileText, List, Kanban } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrdersInfinite } from "@/hooks/useOrdersInfinite";
import { useUpdateOrderStatus } from "@/hooks/useOrders";
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
import { useDealersDropdown } from "@/hooks/useDealersDropdown";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { formatCurrency, cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, subMonths, startOfMonth, startOfYear, endOfYear, subYears } from "date-fns";
import { it } from "date-fns/locale";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

type ViewMode = "lista" | "pipeline";

// ORDER_STATUSES moved to OrdersTable component

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
  
  const now = new Date();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfYear(now),
    to: endOfYear(now),
  });
  const [activeFilter, setActiveFilter] = useState<string | null>("year");
  
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useOrdersInfinite({ searchQuery, dealerId });
  const updateOrderStatus = useUpdateOrderStatus();
  const { data: dealers = [] } = useDealersDropdown();
  const [filters, setFilters] = useState<OrderFiltersState>({
    dataInserimentoFrom: format(startOfYear(now), 'yyyy-MM-dd'),
    dataInserimentoTo: format(endOfYear(now), 'yyyy-MM-dd'),
  });
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

  // Sort state
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'data_inserimento',
    direction: 'desc',
  });

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

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

  // Sync dateRange to filters
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      dataInserimentoFrom: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
      dataInserimentoTo: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    }));
  }, [dateRange]);

  const setQuickFilter = (type: '3months' | '6months' | 'year' | 'lastyear' | 'all') => {
    const n = new Date();
    setActiveFilter(type);
    if (type === 'all') {
      setDateRange(undefined);
      return;
    }
    switch (type) {
      case '3months':
        setDateRange({ from: startOfMonth(subMonths(n, 3)), to: n });
        break;
      case '6months':
        setDateRange({ from: startOfMonth(subMonths(n, 6)), to: n });
        break;
      case 'year':
        setDateRange({ from: startOfYear(n), to: endOfYear(n) });
        break;
      case 'lastyear':
        setDateRange({ from: startOfYear(subYears(n, 1)), to: endOfYear(subYears(n, 1)) });
        break;
    }
  };

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
    }).sort((a, b) => {
      const { key, direction } = sortConfig;
      const mult = direction === 'asc' ? 1 : -1;
      
      const getVal = (o: any) => {
        switch (key) {
          case 'id': return o.id || '';
          case 'dealer': return o.dealers?.ragione_sociale || '';
          case 'cliente': return o.clients ? `${o.clients.nome} ${o.clients.cognome}` : '';
          case 'stato': return o.stato || '';
          case 'data_inserimento': return o.data_inserimento || '';
          case 'importo_totale': return o.importo_totale ?? 0;
          case 'importo_acconto': return o.importo_acconto ?? 0;
          case 'importo_da_pagare': return o.importo_da_pagare ?? 0;
          case 'data_consegna_prevista': return o.data_consegna_prevista || '';
          case 'settimana_consegna': return o.settimana_consegna ?? 0;
          default: return '';
        }
      };
      
      const va = getVal(a);
      const vb = getVal(b);
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * mult;
      return String(va).localeCompare(String(vb), 'it') * mult;
    });
  }, [allOrders, filters, sortConfig]);

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
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Ordini</h1>
              {selectedOrderIds.size > 0 && (
                <Badge variant="secondary" className="text-sm">
                  {selectedOrderIds.size} selezionati
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Gestisci tutti gli ordini dei rivenditori
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex bg-muted rounded-lg p-0.5">
              {(["3months", "6months", "year", "lastyear", "all"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setQuickFilter(type)}
                  className={cn(
                    "px-2.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
                    activeFilter === type
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isMobile
                    ? { "3months": "3M", "6months": "6M", year: new Date().getFullYear().toString(), lastyear: (new Date().getFullYear() - 1).toString(), all: "∞" }[type]
                    : { "3months": "3 Mesi", "6months": "6 Mesi", year: new Date().getFullYear().toString(), lastyear: (new Date().getFullYear() - 1).toString(), all: "Tutto" }[type]}
                </button>
              ))}
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <CalendarIcon className="h-3.5 w-3.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => {
                    setDateRange(range);
                    setActiveFilter(null);
                  }}
                  numberOfMonths={isMobile ? 1 : 2}
                  locale={it}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Action Buttons */}
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
                  <OrdersTable
                    orders={filteredOrders}
                    selectedOrderIds={selectedOrderIds}
                    onToggleSelect={toggleOrderSelection}
                    onToggleSelectAll={toggleSelectAll}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    isDealerArea={isDealerArea}
                    userRole={userRole}
                    onStatusChange={(orderId, stato) => updateOrderStatus.mutate({ orderId, stato })}
                    onQuickPayment={(orderId, orderTotal, amountPaid) => {
                      setQuickPayment({ open: true, orderId, orderTotal, amountPaid });
                    }}
                  />
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
        {selectedOrderIds.size > 0 && !isDealerArea && (
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
