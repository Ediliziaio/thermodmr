import { useState, useEffect, useMemo } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { NewPaymentDialog } from "@/components/payments/NewPaymentDialog";
import { MobilePaymentsList } from "@/components/payments/MobilePaymentsList";
import { BulkDeletePaymentsDialog } from "@/components/payments/BulkDeletePaymentsDialog";
import { PaymentsTimeline } from "@/components/payments/PaymentsTimeline";
import { PaymentTrendsChart } from "@/components/payments/PaymentTrendsChart";
import { usePaymentsInfinite } from "@/hooks/usePaymentsInfinite";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { Euro, TrendingUp, Clock, CreditCard, Download, Trash2, X, List, Calendar as CalendarIcon, Loader2, RefreshCw, Plus, AlertCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDeletePayment, useBulkDeletePayments } from "@/hooks/usePayments";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { getTipoBadgeVariant } from "@/lib/paymentConstants";
import { toast } from "@/hooks/use-toast";
import { useInView } from "react-intersection-observer";
import { exportPaymentsCustom, PAYMENT_COLUMNS } from "@/lib/exportUtils";
import { ExportColumnsDialog } from "@/components/export/ExportColumnsDialog";

interface PagamentiProps {
  dealerId?: string;
}

const Pagamenti = ({ dealerId }: PagamentiProps = {}) => {
  const isDealerArea = !!dealerId;
  useRealtimeSync();
  
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { userRole } = useAuth();
  const deletePaymentMutation = useDeletePayment();
  const bulkDeleteMutation = useBulkDeletePayments();
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [tipoFilter, setTipoFilter] = useState("all");
  const [metodoFilter, setMetodoFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPaymentIds, setSelectedPaymentIds] = useState<Set<string>>(new Set());
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [newPaymentDialogOpen, setNewPaymentDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "timeline">("table");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  // Infinite scroll
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = usePaymentsInfinite({
    dateRange,
    tipoFilter,
    metodoFilter,
    searchQuery,
    dealerId,
  });
  const { ref, inView } = useInView();

  // Combine all pages
  const payments = useMemo(
    () => data?.pages.flatMap(page => page.data) || [],
    [data]
  );

  // Auto-fetch next page when scrolling
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);



  const totaleIncassato = payments.reduce((sum, p) => sum + Number(p.importo), 0);
  const mediaImporto = payments.length > 0 ? totaleIncassato / payments.length : 0;
  const metodoPiuUsato = payments.reduce((acc, p) => {
    acc[p.metodo] = (acc[p.metodo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const metodoPiuUsatoNome = Object.entries(metodoPiuUsato).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const handleResetFilters = () => {
    setDateRange(undefined);
    setTipoFilter("all");
    setMetodoFilter("all");
  };

  const togglePaymentSelection = (id: string) => {
    setSelectedPaymentIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedPaymentIds.size === payments.length) {
      setSelectedPaymentIds(new Set());
    } else {
      setSelectedPaymentIds(new Set(payments.map(p => p.id)));
    }
  };

  const clearSelection = () => setSelectedPaymentIds(new Set());

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDeletePayment = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDeletePayment = () => {
    if (deleteConfirmId) {
      deletePaymentMutation.mutate(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleBulkDelete = () => {
    bulkDeleteMutation.mutate(Array.from(selectedPaymentIds), {
      onSuccess: () => {
        clearSelection();
        setBulkDeleteDialogOpen(false);
      },
    });
  };

  const handleExportCSV = (selectedColumns: string[], data: any[]) => {
    exportPaymentsCustom(data, selectedColumns);
  };

  const paymentsToExport = selectedPaymentIds.size > 0 
    ? payments.filter(p => selectedPaymentIds.has(p.id!))
    : payments;

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
        <p className="text-center text-muted-foreground text-sm">Caricamento pagamenti...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-6">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="text-center">
              <h3 className="font-semibold text-lg">Errore nel caricamento</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Impossibile caricare i pagamenti. Verifica la connessione e riprova.
              </p>
            </div>
            <Button onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />Riprova
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalCount = data?.pages[0]?.totalCount || 0;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-foreground">Pagamenti</h1>
            {selectedPaymentIds.size > 0 && (
              <Badge variant="secondary">{selectedPaymentIds.size} selezionati</Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            {totalCount} pagamenti totali
            {payments.length < totalCount && ` · ${payments.length} caricati`}
          </p>
        </div>
        {!isMobile && !isDealerArea && <NewPaymentDialog open={newPaymentDialogOpen} onOpenChange={setNewPaymentDialogOpen} />}
      </div>

      {/* Stats Cards */}
      <div className={cn(
        isMobile ? "overflow-x-auto -mx-6 px-6" : ""
      )}>
        <div className={cn(
          isMobile ? "flex gap-4 pb-4" : "grid gap-4 md:grid-cols-4"
        )} style={isMobile ? { minWidth: 'max-content' } : undefined}>
          {[
            { title: "Totale Incassato", icon: Euro, value: formatCurrency(totaleIncassato), subtitle: `${payments.length} pagamenti` },
            { title: "Media Importo", icon: TrendingUp, value: formatCurrency(mediaImporto), subtitle: "per pagamento" },
            { title: "Pagamenti in Attesa", icon: Clock, value: payments.filter(p => p.tipo === "acconto").length, subtitle: "acconti registrati" },
            { title: "Metodo Più Usato", icon: CreditCard, value: metodoPiuUsatoNome, subtitle: "più popolare", capitalize: true }
          ].map((stat, i) => (
            <Card key={i} className={isMobile ? "min-w-[160px]" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.capitalize ? 'capitalize' : ''}`}>{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Views */}
      {isMobile ? (
        <>
          <MobilePaymentsList
            payments={payments}
            selectedPaymentIds={selectedPaymentIds}
            onToggleSelect={togglePaymentSelection}
            onViewOrder={(id) => navigate(`/ordini/${id}`)}
            onDeletePayment={handleDeletePayment}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            tipoFilter={tipoFilter}
            onTipoFilterChange={setTipoFilter}
            metodoFilter={metodoFilter}
            onMetodoFilterChange={setMetodoFilter}
            onResetFilters={handleResetFilters}
            onNewPayment={() => setNewPaymentDialogOpen(true)}
            onExport={() => setExportDialogOpen(true)}
            userRole={userRole || ''}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            scrollRef={ref}
          />
        </>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <PaymentFilters
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                tipoFilter={tipoFilter}
                onTipoFilterChange={setTipoFilter}
                metodoFilter={metodoFilter}
                onMetodoFilterChange={setMetodoFilter}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                onReset={handleResetFilters}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
                <List className="h-4 w-4 mr-2" />Tabella
              </Button>
              <Button variant={viewMode === "timeline" ? "default" : "outline"} size="sm" onClick={() => setViewMode("timeline")}>
                <CalendarIcon className="h-4 w-4 mr-2" />Timeline
              </Button>
              <Button variant="outline" size="sm" onClick={() => setExportDialogOpen(true)}>
                <Download className="h-4 w-4 mr-2" />Esporta
              </Button>
            </div>
          </div>

          {payments.length > 0 && <PaymentTrendsChart payments={payments} />}

          {viewMode === "timeline" ? (
            <PaymentsTimeline payments={payments} onViewOrder={(id) => navigate(`/ordini/${id}`)} />
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    {!isDealerArea && <TableHead className="w-12"><Checkbox checked={selectedPaymentIds.size === payments.length && payments.length > 0} onCheckedChange={toggleSelectAll} /></TableHead>}
                    <TableHead>Data</TableHead>
                    <TableHead>Ordine</TableHead>
                    <TableHead>Dealer</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Metodo</TableHead>
                    <TableHead className="text-right">Importo</TableHead>
                    <TableHead>Riferimento</TableHead>
                    {userRole === 'super_admin' && !isDealerArea && <TableHead className="w-12"></TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.length === 0 ? (
                    <TableRow><TableCell colSpan={isDealerArea ? 7 : (userRole === 'super_admin' ? 9 : 8)} className="text-center py-8 text-muted-foreground">Nessun pagamento trovato</TableCell></TableRow>
                  ) : (
                    payments.map((payment) => (
                      <TableRow key={payment.id} className={selectedPaymentIds.has(payment.id) ? 'bg-muted/50' : ''}>
                        <TableCell><Checkbox checked={selectedPaymentIds.has(payment.id)} onCheckedChange={() => togglePaymentSelection(payment.id)} /></TableCell>
                        <TableCell>{formatDate(payment.data_pagamento)}</TableCell>
                        <TableCell><button onClick={() => isDealerArea ? navigate(`../ordini/${payment.ordine_id}`, { relative: 'path' }) : navigate(`/ordini/${payment.ordine_id}`)} className="font-medium hover:underline text-primary">{payment.ordine_id}</button></TableCell>
                        <TableCell>{payment.orders.dealers.ragione_sociale}</TableCell>
                        <TableCell><Badge variant={getTipoBadgeVariant(payment.tipo)}>{payment.tipo}</Badge></TableCell>
                        <TableCell className="capitalize">{payment.metodo}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(payment.importo)}</TableCell>
                        <TableCell className="text-muted-foreground">{payment.riferimento || "-"}</TableCell>
                        {userRole === 'super_admin' && (
                          <TableCell><Button variant="ghost" size="sm" onClick={() => handleDeletePayment(payment.id)} className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></TableCell>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Infinite Scroll Trigger */}
              {hasNextPage && (
                <div ref={ref} className="flex justify-center py-4">
                  {isFetchingNextPage && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Caricamento pagamenti...</span>
                    </div>
                  )}
                </div>
              )}

              {!hasNextPage && payments.length > 0 && (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  Tutti i {payments.length} pagamenti caricati
                </div>
              )}
            </Card>
          )}
        </>
      )}

      {selectedPaymentIds.size > 0 && (
        <div className={cn("fixed z-50 animate-in slide-in-from-bottom-5", isMobile ? "bottom-20 left-4 right-4" : "bottom-6 left-1/2 -translate-x-1/2")}>
          <Card className="shadow-lg border-2">
            <CardContent className={cn("flex items-center gap-4", isMobile ? "p-3 flex-col" : "p-4")}>
              <Badge variant="secondary">{selectedPaymentIds.size} pagamenti selezionati</Badge>
              <div className="h-6 w-px bg-border" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setExportDialogOpen(true)} disabled={payments.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Esporta CSV {selectedPaymentIds.size > 0 && `(${selectedPaymentIds.size})`}
                </Button>
                {userRole === 'super_admin' && <Button variant="destructive" size="sm" onClick={() => setBulkDeleteDialogOpen(true)}><Trash2 className="h-4 w-4 mr-2" />Elimina</Button>}
                <Button variant="ghost" size="sm" onClick={clearSelection}><X className="h-4 w-4 mr-2" />Annulla</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* FAB for New Payment (Mobile Only) */}
      {isMobile && selectedPaymentIds.size === 0 && userRole !== 'rivenditore' && !isDealerArea && (
        <Button
          size="lg"
          className="fixed bottom-6 right-4 h-14 w-14 rounded-full shadow-lg z-40"
          onClick={() => setNewPaymentDialogOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      <BulkDeletePaymentsDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen} selectedPaymentIds={Array.from(selectedPaymentIds)} onConfirm={handleBulkDelete} isPending={bulkDeleteMutation.isPending} />
      <NewPaymentDialog open={newPaymentDialogOpen} onOpenChange={setNewPaymentDialogOpen} />
      
      <ExportColumnsDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        columns={PAYMENT_COLUMNS}
        data={paymentsToExport}
        filename="pagamenti"
        onExport={handleExportCSV}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare questo pagamento? L'azione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletePayment} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Pagamenti;
