import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Receipt, ShoppingCart, Eye, AlertCircle, RefreshCw, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";
import { getTipoBadgeColor, getPaymentTypeLabel, getMetodoIcon } from "@/lib/paymentConstants";

export default function PaymentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Single consolidated query: payment + order + payment stats
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["payment-detail-full", id],
    queryFn: async () => {
      // Fetch payment with order details in one query
      const { data: payment, error: paymentError } = await supabase
        .from("payments")
        .select(`
          *,
          orders!inner(
            id, stato, importo_totale, dealer_id,
            dealers!inner(ragione_sociale, email)
          )
        `)
        .eq("id", id!)
        .single();
      if (paymentError) throw paymentError;

      // Fetch order payment stats from view
      const { data: orderStats, error: statsError } = await supabase
        .from("orders_with_payment_stats")
        .select("importo_pagato, importo_da_pagare, percentuale_pagata, numero_pagamenti")
        .eq("id", payment.ordine_id)
        .single();
      if (statsError) throw statsError;

      return { payment, orderStats };
    },
    enabled: !!id,
  });

  const payment = data?.payment;
  const orderStats = data?.orderStats;

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader><Skeleton className="h-4 w-24" /></CardHeader>
              <CardContent><Skeleton className="h-8 w-16" /></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-6">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="text-center">
              <h3 className="font-semibold text-lg">Pagamento non trovato</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {error ? "Errore nel caricamento del pagamento." : "Il pagamento richiesto non esiste."}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => refetch()}>
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

  const order = payment.orders;
  const importoPagato = orderStats?.importo_pagato ?? 0;
  const importoDaPagare = orderStats?.importo_da_pagare ?? 0;
  const percentualePagata = orderStats?.percentuale_pagata ?? 0;

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

      {/* Dettagli Pagamento */}
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
              <p className="text-base font-medium">{getMetodoIcon(payment.metodo)} {payment.metodo}</p>
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
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={payment.ricevuta_url} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />Visualizza
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={payment.ricevuta_url} download>
                    <Receipt className="h-4 w-4 mr-2" />Scarica
                  </a>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ordine Collegato */}
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
              <Badge className={getStatusColor(order.stato)}>
                {getStatusLabel(order.stato)}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Importo Totale</p>
              <p className="text-xl font-bold">{formatCurrency(order.importo_totale)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Importo Pagato</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(importoPagato)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Da Pagare</p>
              <p className="text-xl font-bold text-orange-600">{formatCurrency(importoDaPagare)}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-muted-foreground mb-2">Progresso Pagamento</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(percentualePagata, 100)}%` }}
                />
              </div>
              <span className="text-sm font-medium min-w-[60px]">
                {percentualePagata.toFixed(0)}%
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
    </div>
  );
}
