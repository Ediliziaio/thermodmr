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
import { ArrowLeft, FileDown, Send, Loader2, Edit2, Check, X, Clock, AlertTriangle, ArrowRightCircle, Copy } from "lucide-react";
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
import {
  useOrderById,
  useOrderLines,
  useOrderPayments,
  useOrderAttachments,
  useUpdateOrderStatus,
  useUpdateOrderNotes,
  useUpdateOrderId,
} from "@/hooks/useOrders";
import { formatCurrency, formatDate, getStatusLabel, getStatusColor } from "@/lib/utils";
import { differenceInDays, isPast, parseISO } from "date-fns";

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

  const [noteInterna, setNoteInterna] = useState("");
  const [noteRivenditore, setNoteRivenditore] = useState("");
  const [isEditingOrderId, setIsEditingOrderId] = useState(false);
  const [editedOrderId, setEditedOrderId] = useState("");
  const [showConvertDialog, setShowConvertDialog] = useState(false);

  useEffect(() => {
    if (order) {
      setNoteInterna(order.note_interna || "");
      setNoteRivenditore(order.note_rivenditore || "");
      setEditedOrderId(order.id);
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

        <div className="flex gap-2">
          {isPreventivo ? (
            <>
              {isSuperAdmin && (
                <Button onClick={() => setShowConvertDialog(true)} className="gap-2">
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

      {/* Banner scadenza preventivo */}
      {isPreventivo && scadenzaDate && (
        <div className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
          isScaduto
            ? "border-destructive/50 bg-destructive/10 text-destructive"
            : giorniRimanenti <= 7
              ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
              : "border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-400"
        }`}>
          {isScaduto ? (
            <>
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <span className="font-medium">Preventivo scaduto il {formatDate(scadenzaDate)}</span>
            </>
          ) : (
            <>
              <Clock className="h-5 w-5 shrink-0" />
              <span className="font-medium">
                Valido fino al {formatDate(scadenzaDate)} ({giorniRimanenti} {giorniRimanenti === 1 ? "giorno" : "giorni"} rimanenti)
              </span>
            </>
          )}
        </div>
      )}

      {isPreventivo ? (
        <>
          {/* Layout semplificato preventivo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dettagli Preventivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Rivenditore:</span>
                  <p className="font-medium text-foreground">
                    {order.dealers?.ragione_sociale || "N/D"}
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
                <div>
                  <span className="text-muted-foreground">Data Inserimento:</span>
                  <p className="font-medium text-foreground">
                    {formatDate(new Date(order.data_inserimento))}
                  </p>
                </div>
                {scadenzaDate && (
                  <div>
                    <span className="text-muted-foreground">Data Scadenza:</span>
                    <p className="font-medium text-foreground">
                      {formatDate(scadenzaDate)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Importo Preventivo</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <span className="text-4xl font-bold text-foreground">
                  {formatCurrency(Number(order.importo_totale))}
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Descrizione preventivo */}
          <Card>
            <CardHeader>
              <CardTitle>Descrizione</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
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
            </CardContent>
          </Card>

          {/* Documenti preventivo */}
          <AttachmentsSection orderId={order.id} attachments={orderAttachments as any} />

          {/* Note interne */}
          <Card>
            <CardHeader>
              <CardTitle>Note Interne</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea
                placeholder="Note interne (non visibili al rivenditore)..."
                className="min-h-[100px]"
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
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Layout ordine - invariato */}
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
            <div className="lg:col-span-2 space-y-6">
              <OrderLinesEditor 
                lines={orderLines as any} 
                onLinesChange={() => {}} 
                orderStatus={order.stato}
                readOnly={!isSuperAdmin}
                title="Righe Ordine"
              />
              <PaymentsSection 
                orderId={order.id} 
                payments={orderPayments as any}
                totalAmount={Number(order.importo_totale)}
              />
              <AttachmentsSection orderId={order.id} attachments={orderAttachments as any} />
            </div>

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
                    <span className="text-muted-foreground">Data Consegna Prevista:</span>
                    <p className="font-medium text-foreground">
                      {order.data_consegna_prevista
                        ? formatDate(new Date(order.data_consegna_prevista))
                        : "Da definire"}
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

              <Card>
                <CardHeader>
                  <CardTitle>Note Rivenditore</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Textarea
                    placeholder="Note visibili al rivenditore..."
                    className="min-h-[100px]"
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Note Interne</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Textarea
                    placeholder="Note interne (non visibili al rivenditore)..."
                    className="min-h-[100px]"
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
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Dialog conferma conversione */}
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
