import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Euro, Calendar, CreditCard, FileText, Receipt, ShoppingCart, Eye, AlertCircle, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";
import { getTipoBadgeColor, getPaymentTypeLabel } from "@/lib/paymentConstants";

export default function PaymentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Query diretta per singolo pagamento (invece di caricare TUTTI i pagamenti)
  const { data: payment, isLoading: isLoadingPayment, error: paymentError, refetch: refetchPayment } = useQuery({
    queryKey: ["payment-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select(`
          *,
          orders!inner(
            id, stato, importo_totale, dealer_id,
            dealers!inner(ragione_sociale)
          )
        `)
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Query diretta per ordine con stats (solo se payment è caricato)
  const { data: order, isLoading: isLoadingOrder } = useQuery({
    queryKey: ["order-for-payment", payment?.ordine_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders_with_payment_stats")
        .select("*, dealers(ragione_sociale, email), clients(nome, cognome)")
        .eq("id", payment!.ordine_id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!payment?.ordine_id,
  });

  if (isLoadingPayment || isLoadingOrder) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader><Skeleton className="h-4 w-24" /></CardHeader>
              <CardContent><Skeleton className="h-8 w-16" /></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (paymentError || !payment) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-6">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="text-center">
              <h3 className="font-semibold text-lg">Pagamento non trovato</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {paymentError ? "Errore nel caricamento del pagamento." : "Il pagamento richiesto non esiste."}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => refetchPayment()}>
                <RefreshCw className="h-4 w-4 mr-2" />Riprova
              </Button>
              <Link to="/pagamenti">
                <Button variant="ghost">
                  <ArrowLeft className="h-4 w-4 mr-2" />Torna ai pagamenti
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link to="/pagamenti">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />Indietro
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Pagamento #{payment.id.slice(0, 8)}</h1>
            <Badge className={getTipoBadgeColor(payment.tipo)}>
              {getPaymentTypeLabel(payment.tipo)}
            </Badge>
          </div>
          <p className="text-muted-foreground">Registrato il {formatDate(payment.created_at)}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Euro className="h-4 w-4" />Importo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(payment.importo)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />Data Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{formatDate(payment.data_pagamento)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4" />Metodo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{payment.metodo}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Informazioni</TabsTrigger>
          <TabsTrigger value="order">Ordine Collegato</TabsTrigger>
          {payment.ricevuta_url && <TabsTrigger value="receipt">Ricevuta</TabsTrigger>}
        </TabsList>

        {/* Tab: Informazioni */}
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />Dettagli Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tipo Pagamento</p>
                  <Badge className={getTipoBadgeColor(payment.tipo)}>
                    {getPaymentTypeLabel(payment.tipo)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Importo</p>
                  <p className="text-2xl font-bold">{formatCurrency(payment.importo)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data Pagamento</p>
                  <p className="text-base">{formatDate(payment.data_pagamento)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Metodo</p>
                  <p className="text-base font-medium">{payment.metodo}</p>
                </div>
                {payment.riferimento && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Riferimento</p>
                    <p className="text-base font-mono">{payment.riferimento}</p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">ID Pagamento</p>
                  <p className="text-base font-mono text-xs">{payment.id}</p>
                </div>
              </div>

              {payment.ricevuta_url && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Ricevuta</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={payment.ricevuta_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />Visualizza Ricevuta
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Ordine Collegato */}
        <TabsContent value="order" className="space-y-4">
          {order ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />Ordine #{order.id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Stato Ordine</p>
                    <Badge className={getStatusColor(order.stato!)}>
                      {getStatusLabel(order.stato!)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Importo Totale</p>
                    <p className="text-xl font-bold">{formatCurrency(order.importo_totale)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Importo Pagato</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(order.importo_pagato)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Da Pagare</p>
                    <p className="text-xl font-bold text-orange-600">{formatCurrency(order.importo_da_pagare)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Data Inserimento</p>
                    <p className="text-base">{formatDate(order.data_inserimento)}</p>
                  </div>
                  {order.data_consegna_prevista && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Consegna Prevista</p>
                      <p className="text-base">{formatDate(order.data_consegna_prevista)}</p>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Progresso Pagamento</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${order.percentuale_pagata ?? 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium min-w-[60px]">
                      {(order.percentuale_pagata ?? 0).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button variant="default" onClick={() => navigate(`/ordini/${order.id}`)}>
                    <Eye className="h-4 w-4 mr-2" />Visualizza Ordine Completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">Ordine non trovato</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab: Ricevuta */}
        {payment.ricevuta_url && (
          <TabsContent value="receipt" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />Ricevuta Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Visualizza o scarica la ricevuta di pagamento
                  </p>
                  <div className="flex gap-2">
                    <Button variant="default" asChild>
                      <a href={payment.ricevuta_url} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-2" />Visualizza
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={payment.ricevuta_url} download>
                        <Receipt className="h-4 w-4 mr-2" />Scarica
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
