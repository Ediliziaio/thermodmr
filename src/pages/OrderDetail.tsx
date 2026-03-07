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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
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
import { ArrowLeft, FileDown, Send, Loader2, Edit2, Check, X, Clock, AlertTriangle, ArrowRightCircle, Copy, CalendarIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusStepper } from "@/components/orders/StatusStepper";
import type { Database } from "@/integrations/supabase/types";
import { OrderLinesEditor } from "@/components/orders/OrderLinesEditor";
import { PaymentsSection } from "@/components/orders/PaymentsSection";
import { AttachmentsSection } from "@/components/orders/AttachmentsSection";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PaymentTimelineChart } from "@/components/analytics/charts/PaymentTimelineChart";
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
} from "@/hooks/useOrders";
import { formatCurrency, formatDate, getStatusLabel, getStatusColor } from "@/lib/utils";
import { MODALITA_PAGAMENTO_OPTIONS, getModalitaPagamentoLabel } from "@/lib/orderConstants";
import { differenceInDays, isPast, parseISO, format, startOfWeek, addWeeks, endOfWeek, getWeek, getYear } from "date-fns";
import { it } from "date-fns/locale";

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
  const hasLineChanges = editedLines !== null;

  useEffect(() => {
    if (order) {
      setNoteInterna(order.note_interna || "");
      setNoteRivenditore(order.note_rivenditore || "");
      setEditedOrderId(order.id);
      setDataFineProduzione(order.data_fine_produzione ? parseISO(order.data_fine_produzione) : undefined);
      setSettimanaConsegna(order.settimana_consegna?.toString() || "");
      setDataConsegnaPrevista(order.data_consegna_prevista ? parseISO(order.data_consegna_prevista) : undefined);
      setModalitaPagamento((order as any).modalita_pagamento || "");
    }
  }, [order]);

  const isPreventivo = order?.stato === "preventivo";
  const isSuperAdmin = userRole === "super_admin";

  const convertMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const { error } = await supabase
        .from("orders")
        .update({ stato: "da_confermare" as any })
        .eq("id", orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Preventivo convertito in ordine con successo" });
      queryClient.invalidateQueries({ queryKey: ["order", id] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setShowConvertDialog(false);
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

  const handleNoteSave = (type: "interna" | "rivenditore") => {
    if (!id) return;
    if (type === "interna") {
      updateNotesMutation.mutate({ orderId: id, noteInterna });
    } else {
      updateNotesMutation.mutate({ orderId: id, noteRivenditore });
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
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => isDealerArea ? navigate(-1) : navigate("/ordini")}>
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
                <FileDown className="mr-2 h-4 w-4" />
                Esporta PDF
              </Button>
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
          ) : (
            <>
              <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" />
                Esporta PDF
              </Button>
              <Button variant="outline" size="sm">
                <Send className="mr-2 h-4 w-4" />
                Invia Email
              </Button>
            </>
          )}
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
              {isSuperAdmin && (
                <div className="flex justify-end">
                  <Button
                    variant={hasLineChanges ? "default" : "outline"}
                    onClick={() => {
                      if (id && editedLines) {
                        updateOrderLinesMutation.mutate(
                          { orderId: id, lines: editedLines },
                          { onSuccess: () => setEditedLines(null) }
                        );
                      }
                    }}
                    disabled={!hasLineChanges || updateOrderLinesMutation.isPending}
                  >
                    {updateOrderLinesMutation.isPending ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvataggio...</>
                    ) : "Salva Prodotti"}
                  </Button>
                </div>
              )}

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
                      <Button
                        size="sm"
                        onClick={() => handleNoteSave("rivenditore")}
                        disabled={updateNotesMutation.isPending}
                      >
                        {updateNotesMutation.isPending ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvataggio...</>
                        ) : "Salva Descrizione"}
                      </Button>
                    </TabsContent>
                    <TabsContent value="note_interne" className="space-y-2">
                      <Textarea
                        placeholder="Note interne (non visibili al rivenditore)..."
                        className="min-h-[120px]"
                        value={noteInterna}
                        onChange={(e) => setNoteInterna(e.target.value)}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleNoteSave("interna")}
                        disabled={updateNotesMutation.isPending}
                      >
                        {updateNotesMutation.isPending ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvataggio...</>
                        ) : "Salva Note"}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <AttachmentsSection orderId={order.id} attachments={orderAttachments as any} />
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
            </CardContent>
          </Card>

          {orderPayments && orderPayments.length > 0 && (
            <PaymentTimelineChart
              payments={orderPayments}
              totalAmount={order.importo_totale}
              title="Timeline Pagamenti"
            />
          )}

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
              {isSuperAdmin && (
                <div className="flex justify-end">
                  <Button
                    variant={hasLineChanges ? "default" : "outline"}
                    onClick={() => {
                      if (id && editedLines) {
                        updateOrderLinesMutation.mutate(
                          { orderId: id, lines: editedLines },
                          { onSuccess: () => setEditedLines(null) }
                        );
                      }
                    }}
                    disabled={!hasLineChanges || updateOrderLinesMutation.isPending}
                  >
                    {updateOrderLinesMutation.isPending ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvataggio...</>
                    ) : "Salva Prodotti"}
                  </Button>
                </div>
              )}

              <PaymentsSection 
                orderId={order.id} 
                payments={orderPayments as any}
                totalAmount={Number(order.importo_totale)}
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
                      <Button
                        size="sm"
                        onClick={() => handleNoteSave("rivenditore")}
                        disabled={updateNotesMutation.isPending}
                      >
                        {updateNotesMutation.isPending ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvataggio...</>
                        ) : "Salva Note"}
                      </Button>
                    </TabsContent>
                    <TabsContent value="note_interne" className="space-y-2">
                      <Textarea
                        placeholder="Note interne (non visibili al rivenditore)..."
                        className="min-h-[120px]"
                        value={noteInterna}
                        onChange={(e) => setNoteInterna(e.target.value)}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleNoteSave("interna")}
                        disabled={updateNotesMutation.isPending}
                      >
                        {updateNotesMutation.isPending ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvataggio...</>
                        ) : "Salva Note"}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <AttachmentsSection orderId={order.id} attachments={orderAttachments as any} />
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
                  <div className="h-px bg-border" />
                  {/* Modalità Pagamento */}
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-xs">Modalità di Pagamento</Label>
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
                  {isSuperAdmin && (
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        if (!id) return;
                        updateDatesMutation.mutate({
                          orderId: id,
                          modalitaPagamento: modalitaPagamento || null,
                        });
                      }}
                      disabled={updateDatesMutation.isPending}
                    >
                      {updateDatesMutation.isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvataggio...</>
                      ) : "Salva Modalità"}
                    </Button>
                  )}
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

              {/* Date Produzione & Consegna */}
              <Card>
                <CardHeader>
                  <CardTitle>Produzione & Consegna</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Data Fine Produzione */}
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-xs">Data Fine Produzione</Label>
                    {isSuperAdmin ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dataFineProduzione && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dataFineProduzione ? format(dataFineProduzione, "dd/MM/yyyy") : "Seleziona data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dataFineProduzione}
                            onSelect={setDataFineProduzione}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <p className="font-medium text-foreground">
                        {dataFineProduzione ? format(dataFineProduzione, "dd/MM/yyyy") : "Da definire"}
                      </p>
                    )}
                  </div>

                  {/* Settimana Consegna */}
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-xs">Settimana Consegna</Label>
                    {isSuperAdmin ? (
                      <div className="space-y-1">
                        <Select
                          value={settimanaConsegna || ""}
                          onValueChange={(val) => setSettimanaConsegna(val)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleziona settimana" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 53 }, (_, i) => {
                              const weekNum = i + 1;
                              const year = getYear(new Date());
                              const ws = startOfWeek(addWeeks(new Date(year, 0, 4), weekNum - 1), { weekStartsOn: 1 });
                              const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
                              const monthLabel = monthNames[ws.getMonth()];
                              return (
                                <SelectItem key={weekNum} value={String(weekNum)}>
                                  {weekNum} - {monthLabel} {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        {settimanaConsegna && Number(settimanaConsegna) >= 1 && Number(settimanaConsegna) <= 53 && (
                          <p className="text-xs text-muted-foreground">
                            {(() => {
                              const year = getYear(new Date());
                              const weekStart = startOfWeek(addWeeks(new Date(year, 0, 4), Number(settimanaConsegna) - 1), { weekStartsOn: 1 });
                              const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
                              return `${format(weekStart, "dd MMM", { locale: it })} - ${format(weekEnd, "dd MMM yyyy", { locale: it })}`;
                            })()}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="font-medium text-foreground">
                        {settimanaConsegna ? `Settimana ${settimanaConsegna}` : "Da definire"}
                      </p>
                    )}
                  </div>

                  {/* Data Consegna Prevista */}
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground text-xs">Data Consegna Prevista</Label>
                    {isSuperAdmin ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dataConsegnaPrevista && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dataConsegnaPrevista ? format(dataConsegnaPrevista, "dd/MM/yyyy") : "Seleziona data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dataConsegnaPrevista}
                            onSelect={setDataConsegnaPrevista}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <p className="font-medium text-foreground">
                        {dataConsegnaPrevista ? format(dataConsegnaPrevista, "dd/MM/yyyy") : "Da definire"}
                      </p>
                    )}
                  </div>

                  {isSuperAdmin && (
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        if (!id) return;
                        updateDatesMutation.mutate({
                          orderId: id,
                          dataFineProduzione: dataFineProduzione ? format(dataFineProduzione, "yyyy-MM-dd") : null,
                          settimanaConsegna: settimanaConsegna ? Number(settimanaConsegna) : null,
                          dataConsegnaPrevista: dataConsegnaPrevista ? format(dataConsegnaPrevista, "yyyy-MM-dd") : null,
                        });
                      }}
                      disabled={updateDatesMutation.isPending}
                    >
                      {updateDatesMutation.isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvataggio...</>
                      ) : "Salva Date"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

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
    </div>
  );
}
