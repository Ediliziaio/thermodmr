import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { ArrowLeft, Loader2, Edit2, Check, X, Clock, AlertTriangle, ArrowRightCircle, Copy, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusStepper } from "@/components/orders/StatusStepper";
import { OrderSchedulingCard } from "@/components/orders/OrderSchedulingCard";
import type { Database } from "@/integrations/supabase/types";
import { OrderLinesEditor } from "@/components/orders/OrderLinesEditor";
import { PaymentsSection } from "@/components/orders/PaymentsSection";
import { AttachmentsSection } from "@/components/orders/AttachmentsSection";
import { TicketsSection } from "@/components/orders/TicketsSection";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  useOrderById,
  useOrderLines,
  useOrderPayments,
  useOrderAttachments,
  useUpdateOrderStatus,
  useUpdateOrderNotes,
  useUpdateOrderId,
  useUpdateOrderLines,
  useUpdateOrderDates,
  generateOrderId,
} from "@/hooks/useOrders";
import { formatCurrency, formatDate, getStatusLabel, getStatusColor } from "@/lib/utils";
import { MODALITA_PAGAMENTO_OPTIONS, getModalitaPagamentoLabel } from "@/lib/orderConstants";
import { differenceInDays, isPast, parseISO, format } from "date-fns";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useAuth();
  const queryClient = useQueryClient();

  const isDealerArea = location.pathname.includes('/area/');

  const { data: order, isLoading: orderLoading } = useOrderById(id || "");
  const { data: orderLines = [] } = useOrderLines(id || "");
  const { data: orderPayments = [] } = useOrderPayments(id || "");
  const { data: orderAttachments = [] } = useOrderAttachments(id || "");

  const updateStatusMutation = useUpdateOrderStatus();
  const updateNotesMutation = useUpdateOrderNotes();
  const updateOrderIdMutation = useUpdateOrderId();
  const updateOrderLinesMutation = useUpdateOrderLines();
  const updateDatesMutation = useUpdateOrderDates();

  const [noteInterna, setNoteInterna] = useState("");
  const [noteRivenditore, setNoteRivenditore] = useState("");
  const [isEditingOrderId, setIsEditingOrderId] = useState(false);
  const [editedOrderId, setEditedOrderId] = useState("");
  const [showConvertDialog, setShowConvertDialog] = useState(false);
  const [editedLines, setEditedLines] = useState<any[] | null>(null);
  const [dataFineProduzione, setDataFineProduzione] = useState<Date | undefined>();
  const [settimanaConsegna, setSettimanaConsegna] = useState<string>("");
  const [dataConsegnaPrevista, setDataConsegnaPrevista] = useState<Date | undefined>();
  const [modalitaPagamento, setModalitaPagamento] = useState<string>("");

  // Unsaved changes dialog state
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  useEffect(() => {
    if (order) {
      setNoteInterna(order.note_interna || "");
      setNoteRivenditore(order.note_rivenditore || "");
      setEditedOrderId(order.id);
      setDataFineProduzione(order.data_fine_produzione ? parseISO(order.data_fine_produzione) : undefined);
      setSettimanaConsegna(order.settimana_consegna?.toString() || "");
      setDataConsegnaPrevista(order.data_consegna_prevista ? parseISO(order.data_consegna_prevista) : undefined);
      setModalitaPagamento(order.modalita_pagamento || "");
    }
  }, [order]);

  const isPreventivo = order?.stato === "preventivo";
  const isSuperAdmin = userRole === "super_admin";

  // --- Unified dirty state ---
  const hasUnsavedChanges = useMemo(() => {
    if (!order) return false;
    const notesChanged =
      noteInterna !== (order.note_interna || "") ||
      noteRivenditore !== (order.note_rivenditore || "");
    const linesChanged = editedLines !== null;

    const origFineProd = order.data_fine_produzione ? format(parseISO(order.data_fine_produzione), "yyyy-MM-dd") : "";
    const currFineProd = dataFineProduzione ? format(dataFineProduzione, "yyyy-MM-dd") : "";
    const origConsegna = order.data_consegna_prevista ? format(parseISO(order.data_consegna_prevista), "yyyy-MM-dd") : "";
    const currConsegna = dataConsegnaPrevista ? format(dataConsegnaPrevista, "yyyy-MM-dd") : "";

    const datesChanged =
      currFineProd !== origFineProd ||
      (settimanaConsegna || "") !== (order.settimana_consegna?.toString() || "") ||
      currConsegna !== origConsegna ||
      (modalitaPagamento || "") !== (order.modalita_pagamento || "");

    return notesChanged || linesChanged || datesChanged;
  }, [order, noteInterna, noteRivenditore, editedLines, dataFineProduzione, settimanaConsegna, dataConsegnaPrevista, modalitaPagamento]);

  // Browser tab close guard
  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  // --- Save all ---
  const isSaving = updateNotesMutation.isPending || updateOrderLinesMutation.isPending || updateDatesMutation.isPending;

  const handleSaveAll = useCallback(async () => {
    if (!id || !order) return;
    const promises: Promise<any>[] = [];

    const notesChanged =
      noteInterna !== (order.note_interna || "") ||
      noteRivenditore !== (order.note_rivenditore || "");
    if (notesChanged) {
      promises.push(
        new Promise((resolve, reject) =>
          updateNotesMutation.mutate(
            { orderId: id, noteInterna, noteRivenditore },
            { onSuccess: resolve, onError: reject }
          )
        )
      );
    }

    if (editedLines !== null) {
      promises.push(
        new Promise((resolve, reject) =>
          updateOrderLinesMutation.mutate(
            { orderId: id, lines: editedLines },
            { onSuccess: () => { setEditedLines(null); resolve(undefined); }, onError: reject }
          )
        )
      );
    }

    const origFineProd = order.data_fine_produzione ? format(parseISO(order.data_fine_produzione), "yyyy-MM-dd") : "";
    const currFineProd = dataFineProduzione ? format(dataFineProduzione, "yyyy-MM-dd") : "";
    const origConsegna = order.data_consegna_prevista ? format(parseISO(order.data_consegna_prevista), "yyyy-MM-dd") : "";
    const currConsegna = dataConsegnaPrevista ? format(dataConsegnaPrevista, "yyyy-MM-dd") : "";

    const datesChanged =
      currFineProd !== origFineProd ||
      (settimanaConsegna || "") !== (order.settimana_consegna?.toString() || "") ||
      currConsegna !== origConsegna ||
      (modalitaPagamento || "") !== (order.modalita_pagamento || "");

    if (datesChanged) {
      promises.push(
        new Promise((resolve, reject) =>
          updateDatesMutation.mutate(
            {
              orderId: id,
              dataFineProduzione: dataFineProduzione ? format(dataFineProduzione, "yyyy-MM-dd") : null,
              settimanaConsegna: settimanaConsegna ? Number(settimanaConsegna) : null,
              dataConsegnaPrevista: dataConsegnaPrevista ? format(dataConsegnaPrevista, "yyyy-MM-dd") : null,
              modalitaPagamento: modalitaPagamento || null,
            },
            { onSuccess: resolve, onError: reject }
          )
        )
      );
    }

    if (promises.length > 0) {
      try {
        await Promise.all(promises);
      } catch {
        // Individual mutations already show error toasts
      }
    }
  }, [id, order, noteInterna, noteRivenditore, editedLines, dataFineProduzione, settimanaConsegna, dataConsegnaPrevista, modalitaPagamento, updateNotesMutation, updateOrderLinesMutation, updateDatesMutation]);

  const handleResetAll = useCallback(() => {
    if (!order) return;
    setNoteInterna(order.note_interna || "");
    setNoteRivenditore(order.note_rivenditore || "");
    setEditedLines(null);
    setDataFineProduzione(order.data_fine_produzione ? parseISO(order.data_fine_produzione) : undefined);
    setSettimanaConsegna(order.settimana_consegna?.toString() || "");
    setDataConsegnaPrevista(order.data_consegna_prevista ? parseISO(order.data_consegna_prevista) : undefined);
    setModalitaPagamento(order.modalita_pagamento || "");
  }, [order]);

  // --- Navigation guard ---
  const handleNavigateBack = useCallback(() => {
    const target = isDealerArea ? "__back__" : "/ordini";
    if (hasUnsavedChanges) {
      setPendingNavigation(target);
      setShowUnsavedDialog(true);
    } else {
      if (target === "__back__") navigate(-1);
      else navigate(target);
    }
  }, [hasUnsavedChanges, isDealerArea, navigate]);

  const handleDiscardAndNavigate = useCallback(() => {
    setShowUnsavedDialog(false);
    if (pendingNavigation === "__back__") navigate(-1);
    else if (pendingNavigation) navigate(pendingNavigation);
    setPendingNavigation(null);
  }, [pendingNavigation, navigate]);

  const handleSaveAndNavigate = useCallback(async () => {
    await handleSaveAll();
    setShowUnsavedDialog(false);
    // Small delay to let mutations complete
    setTimeout(() => {
      if (pendingNavigation === "__back__") navigate(-1);
      else if (pendingNavigation) navigate(pendingNavigation);
      setPendingNavigation(null);
    }, 300);
  }, [handleSaveAll, pendingNavigation, navigate]);

  const convertMutation = useMutation({
    mutationFn: async (preventivoId: string) => {
      const newOrderId = await generateOrderId();
      const { error } = await supabase
        .from("orders")
        .update({
          id: newOrderId,
          stato: "da_confermare" as any,
          riferimento_preventivo: preventivoId,
        })
        .eq("id", preventivoId);
      if (error) throw error;
      return newOrderId;
    },
    onSuccess: (newOrderId) => {
      toast({ title: "Preventivo convertito in ordine", description: `Nuovo ID: ${newOrderId}` });
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setShowConvertDialog(false);
      navigate(`/ordini/${newOrderId}`, { replace: true });
    },
    onError: () => {
      toast({ title: "Errore durante la conversione del preventivo", variant: "destructive" });
    },
  });

  const handleStatusChange = (newStatus: Database["public"]["Tables"]["orders"]["Row"]["stato"]) => {
    if (id && isSuperAdmin) {
      updateStatusMutation.mutate({ orderId: id, stato: newStatus });
    }
  };

  const handleOrderIdSave = () => {
    if (!id || !editedOrderId || editedOrderId === id) {
      setIsEditingOrderId(false);
      return;
    }
    updateOrderIdMutation.mutate(
      { oldId: id, newId: editedOrderId },
      {
        onSuccess: (data) => {
          setIsEditingOrderId(false);
          navigate(`/ordini/${data.id}`, { replace: true });
        },
        onError: () => {
          setEditedOrderId(id);
        },
      }
    );
  };

  if (orderLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => isDealerArea ? navigate(-1) : navigate("/ordini")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna agli Ordini
        </Button>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Ordine non trovato</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalePagato = orderPayments.reduce((sum, p) => sum + Number(p.importo), 0);
  const saldo = Number(order.importo_totale) - totalePagato;

  // Scadenza preventivo
  const scadenzaDate = order.data_scadenza_preventivo ? parseISO(order.data_scadenza_preventivo) : null;
  const isScaduto = scadenzaDate ? isPast(scadenzaDate) : false;
  const giorniRimanenti = scadenzaDate ? differenceInDays(scadenzaDate, new Date()) : 0;

  const entityLabel = isPreventivo ? "Preventivo" : "Ordine";

  return (
    <div className="space-y-6 pb-24">
      <Button variant="ghost" onClick={handleNavigateBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Torna agli Ordini
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-4 flex-wrap">
            {isEditingOrderId ? (
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-foreground">{entityLabel} #</h1>
                <Input
                  value={editedOrderId}
                  onChange={(e) => setEditedOrderId(e.target.value)}
                  className="w-64 h-10 text-xl font-bold"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleOrderIdSave();
                    if (e.key === "Escape") {
                      setEditedOrderId(order.id);
                      setIsEditingOrderId(false);
                    }
                  }}
                  autoFocus
                />
                <Button size="sm" variant="ghost" onClick={handleOrderIdSave} disabled={updateOrderIdMutation.isPending}>
                  {updateOrderIdMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => { setEditedOrderId(order.id); setIsEditingOrderId(false); }} disabled={updateOrderIdMutation.isPending}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-foreground">{entityLabel} #{order.id}</h1>
                {isSuperAdmin && (
                  <Button size="sm" variant="ghost" onClick={() => setIsEditingOrderId(true)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
            <Badge className={getStatusColor(order.stato)}>
              {getStatusLabel(order.stato)}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Rivenditore: {order.dealers?.ragione_sociale || "N/D"}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {isPreventivo ? (
            <>
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Duplica
              </Button>
              {isSuperAdmin && (
                <Button onClick={() => setShowConvertDialog(true)} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <ArrowRightCircle className="h-4 w-4" />
                  Converti in Ordine
                </Button>
              )}
            </>
          ) : null}
        </div>
      </div>

      {isPreventivo ? (
        <>
          {/* Header hero con importo */}
          <div className="flex items-center justify-between rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(order.stato)}>
                {getStatusLabel(order.stato)}
              </Badge>
              {scadenzaDate && (
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                  isScaduto
                    ? "text-destructive"
                    : giorniRimanenti <= 7
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-muted-foreground"
                }`}>
                  {isScaduto ? (
                    <><AlertTriangle className="h-4 w-4" />Scaduto il {formatDate(scadenzaDate)}</>
                  ) : (
                    <><Clock className="h-4 w-4" />Valido ancora {giorniRimanenti} {giorniRimanenti === 1 ? "giorno" : "giorni"}</>
                  )}
                </span>
              )}
            </div>
            <span className="text-3xl font-bold text-foreground">
              {formatCurrency(Number(order.importo_totale))}
            </span>
          </div>

          {/* Layout 2 colonne */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonna principale */}
            <div className="lg:col-span-2 space-y-6">
              <OrderLinesEditor
                simplified
                lines={orderLines as any}
                onLinesChange={(lines) => setEditedLines(lines)}
                orderStatus={order.stato}
                readOnly={!isSuperAdmin}
                title="Prodotti Quotati"
              />

              {/* Note unificate con Tabs */}
              <Card>
                <CardContent className="pt-6">
                  <Tabs defaultValue="descrizione">
                    <TabsList className="mb-4">
                      <TabsTrigger value="descrizione">Descrizione</TabsTrigger>
                      <TabsTrigger value="note_interne">Note Interne</TabsTrigger>
                    </TabsList>
                    <TabsContent value="descrizione" className="space-y-2">
                      <Textarea
                        placeholder="Descrizione del preventivo..."
                        className="min-h-[120px]"
                        value={noteRivenditore}
                        onChange={(e) => setNoteRivenditore(e.target.value)}
                      />
                    </TabsContent>
                    <TabsContent value="note_interne" className="space-y-2">
                      <Textarea
                        placeholder="Note interne (non visibili al rivenditore)..."
                        className="min-h-[120px]"
                        value={noteInterna}
                        onChange={(e) => setNoteInterna(e.target.value)}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <AttachmentsSection orderId={order.id} attachments={orderAttachments as any} />
              <TicketsSection orderId={order.id} />
            </div>

            {/* Sidebar riepilogo */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Riepilogo Preventivo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Rivenditore</span>
                    <p className="font-medium text-foreground">
                      {order.dealers?.ragione_sociale || "N/D"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cliente Finale</span>
                    <p className="font-medium text-foreground">
                      {order.clients
                        ? `${order.clients.nome} ${order.clients.cognome}`
                        : "Non specificato"}
                    </p>
                  </div>
                  {order.riferimento_preventivo && (
                    <div>
                      <span className="text-muted-foreground">Riferimento</span>
                      <p className="font-medium text-foreground">
                        {order.riferimento_preventivo}
                      </p>
                    </div>
                  )}
                  <div className="h-px bg-border" />
                  <div>
                    <span className="text-muted-foreground">Data Inserimento</span>
                    <p className="font-medium text-foreground">
                      {formatDate(new Date(order.data_inserimento))}
                    </p>
                  </div>
                  {scadenzaDate && (
                    <div>
                      <span className="text-muted-foreground">Data Scadenza</span>
                      <p className={`font-medium ${isScaduto ? "text-destructive" : "text-foreground"}`}>
                        {formatDate(scadenzaDate)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Stato ordine */}
          <Card>
            <CardHeader>
              <CardTitle>Stato Ordine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <StatusStepper currentStatus={order.stato as any} />
              <div className="space-y-2">
                <Label htmlFor="status-select">
                  Modifica Stato {!isSuperAdmin && "(Solo Super Admin)"}
                </Label>
                <Select
                  value={order.stato}
                  onValueChange={handleStatusChange}
                  disabled={!isSuperAdmin}
                >
                  <SelectTrigger id="status-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="da_confermare">Da Confermare</SelectItem>
                    <SelectItem value="da_pagare_acconto">Da Pagare Acconto</SelectItem>
                    <SelectItem value="in_lavorazione">In Lavorazione</SelectItem>
                    <SelectItem value="da_saldare">Da Saldare</SelectItem>
                    <SelectItem value="da_consegnare">Da Consegnare</SelectItem>
                    <SelectItem value="consegnato">Consegnato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Modalità Pagamento */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Modalità di Pagamento</Label>
                {isSuperAdmin ? (
                  <Select
                    value={modalitaPagamento || ""}
                    onValueChange={(v) => setModalitaPagamento(v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleziona modalità" />
                    </SelectTrigger>
                    <SelectContent>
                      {MODALITA_PAGAMENTO_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="font-medium text-foreground">
                    {getModalitaPagamentoLabel(modalitaPagamento) || "Non specificata"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <PaymentsSection 
            orderId={order.id} 
            payments={orderPayments || []}
            totalAmount={Number(order.importo_totale)}
          />


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonna principale */}
            <div className="lg:col-span-2 space-y-6">
              <OrderLinesEditor
                simplified
                lines={orderLines as any}
                onLinesChange={(lines) => setEditedLines(lines)}
                orderStatus={order.stato}
                readOnly={!isSuperAdmin}
                title="Righe Ordine"
              />


              {/* Note in Tabs */}
              <Card>
                <CardContent className="pt-6">
                  <Tabs defaultValue="note_rivenditore">
                    <TabsList className="mb-4">
                      <TabsTrigger value="note_rivenditore">Note Rivenditore</TabsTrigger>
                      <TabsTrigger value="note_interne">Note Interne</TabsTrigger>
                    </TabsList>
                    <TabsContent value="note_rivenditore" className="space-y-2">
                      <Textarea
                        placeholder="Note visibili al rivenditore..."
                        className="min-h-[120px]"
                        value={noteRivenditore}
                        onChange={(e) => setNoteRivenditore(e.target.value)}
                      />
                    </TabsContent>
                    <TabsContent value="note_interne" className="space-y-2">
                      <Textarea
                        placeholder="Note interne (non visibili al rivenditore)..."
                        className="min-h-[120px]"
                        value={noteInterna}
                        onChange={(e) => setNoteInterna(e.target.value)}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <AttachmentsSection orderId={order.id} attachments={orderAttachments as any} />
              <TicketsSection orderId={order.id} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Riepilogo Economico</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Totale Ordine:</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(Number(order.importo_totale))}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Acconto Concordato:</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(Number(order.importo_acconto))}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pagato:</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(totalePagato)}
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">Saldo:</span>
                    <span className="text-lg font-bold text-foreground">
                      {formatCurrency(saldo)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informazioni Ordine</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Data Inserimento:</span>
                    <p className="font-medium text-foreground">
                      {formatDate(new Date(order.data_inserimento))}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cliente Finale:</span>
                    <p className="font-medium text-foreground">
                      {order.clients
                        ? `${order.clients.nome} ${order.clients.cognome}`
                        : "Non specificato"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <OrderSchedulingCard
                isSuperAdmin={isSuperAdmin}
                dataFineProduzione={dataFineProduzione}
                setDataFineProduzione={setDataFineProduzione}
                settimanaConsegna={settimanaConsegna}
                setSettimanaConsegna={setSettimanaConsegna}
                dataConsegnaPrevista={dataConsegnaPrevista}
                setDataConsegnaPrevista={setDataConsegnaPrevista}
              />
            </div>
          </div>
        </>
      )}

      {/* Fixed Save Bar */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border bg-card p-4 shadow-lg">
          <span className="text-sm font-medium text-muted-foreground">Hai modifiche non salvate</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetAll}
            disabled={isSaving}
          >
            Annulla
          </Button>
          <Button
            size="sm"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Salvataggio...</>
            ) : (
              <><Save className="h-4 w-4" />Salva Modifiche</>
            )}
          </Button>
        </div>
      )}

      {/* Convert dialog */}
      <AlertDialog open={showConvertDialog} onOpenChange={setShowConvertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Converti in Ordine</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler convertire questo preventivo in un ordine?
              Il preventivo passerà allo stato "Da Confermare" e apparirà nella sezione Ordini.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => id && convertMutation.mutate(id)}
              disabled={convertMutation.isPending}
            >
              {convertMutation.isPending ? "Conversione..." : "Conferma Conversione"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unsaved changes navigation guard */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Modifiche non salvate</AlertDialogTitle>
            <AlertDialogDescription>
              Hai delle modifiche non salvate. Vuoi salvare prima di uscire?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel onClick={() => { setShowUnsavedDialog(false); setPendingNavigation(null); }}>
              Annulla
            </AlertDialogCancel>
            <Button
              variant="outline"
              onClick={handleDiscardAndNavigate}
            >
              Esci senza salvare
            </Button>
            <Button
              onClick={handleSaveAndNavigate}
              disabled={isSaving}
              className="gap-2"
            >
              {isSaving ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Salvataggio...</>
              ) : (
                <><Save className="h-4 w-4" />Salva e Esci</>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
