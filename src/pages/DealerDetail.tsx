import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, AlertCircle, Building2, MapPin, Phone, Mail, FileText, ShoppingCart, Euro, TrendingUp, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";
import { DealerRevenueChart } from "@/components/dealers/DealerRevenueChart";
import { DealerOrdersDistribution } from "@/components/dealers/DealerOrdersDistribution";

export default function DealerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: dealer, isLoading: isLoadingDealer, error: dealerError, refetch: refetchDealer } = useQuery({
    queryKey: ["dealer-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dealers_with_stats")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: dealerOrders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ["dealer-orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders_with_payment_stats")
        .select("*")
        .eq("dealer_id", id!)
        .order("data_inserimento", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data || [];
    },
    enabled: !!id,
  });

  const totalRevenue = dealer?.total_revenue || 0;
  const totalPaid = dealer?.total_paid || 0;
  const totalToPay = dealer?.total_remaining || 0;
  const ordersCount = dealer?.orders_count || 0;
  const avgTicket = ordersCount > 0 ? totalRevenue / ordersCount : 0;
  const hasMoreOrders = ordersCount > 50;

  if (isLoadingDealer) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader><Skeleton className="h-4 w-24" /></CardHeader>
              <CardContent><Skeleton className="h-8 w-16" /></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (dealerError || !dealer) {
    return (
      <div className="space-y-6 p-6">
        <Link to="/rivenditori">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna ai rivenditori
          </Button>
        </Link>
        <Card className="max-w-md mx-auto">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="text-center">
              <h3 className="font-semibold text-lg">Rivenditore non trovato</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {dealerError ? "Errore nel caricamento dei dati." : "Il rivenditore richiesto non esiste."}
              </p>
            </div>
            <Button onClick={() => refetchDealer()}>Riprova</Button>
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
            <Link to="/rivenditori">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">{dealer.ragione_sociale}</h1>
          </div>
          <p className="text-muted-foreground">P.IVA: {dealer.p_iva}</p>
        </div>
        <Button onClick={() => navigate(`/rivenditori/${dealer.id}/area`)} variant="default">
          <Eye className="h-4 w-4 mr-2" />
          Entra nell'Area Rivenditore
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Ordini Totali
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{ordersCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Fatturato Totale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Ticket Medio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(avgTicket)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Da Incassare
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalToPay)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs — merged Analytics+Statistiche into single "Panoramica" */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Informazioni</TabsTrigger>
          <TabsTrigger value="panoramica">Panoramica</TabsTrigger>
          <TabsTrigger value="orders">Ordini ({ordersCount})</TabsTrigger>
        </TabsList>

        {/* Tab: Informazioni */}
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Dati Anagrafici
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ragione Sociale</p>
                  <p className="text-base">{dealer.ragione_sociale}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">P.IVA</p>
                  <p className="text-base">{dealer.p_iva}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Codice Fiscale</p>
                  <p className="text-base">{dealer.codice_fiscale}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <a href={`mailto:${dealer.email}`} className="text-base text-primary hover:underline">
                      {dealer.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Telefono</p>
                    <a href={`tel:${dealer.telefono}`} className="text-base text-primary hover:underline">
                      {dealer.telefono}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Indirizzo</p>
                    <p className="text-base">
                      {dealer.indirizzo}, {dealer.cap} {dealer.citta} ({dealer.provincia})
                    </p>
                  </div>
                </div>
              </div>

              {dealer.note && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Note
                  </p>
                  <p className="text-base whitespace-pre-wrap">{dealer.note}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Panoramica (merged Analytics + Statistiche) */}
        <TabsContent value="panoramica" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <DealerRevenueChart dealerId={id!} />
            <DealerOrdersDistribution dealerId={id!} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="h-5 w-5" />
                  Riepilogo Finanziario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fatturato Totale</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Incassato</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Da Incassare</p>
                    <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalToPay)}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-muted-foreground">Percentuale Incassata</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${totalRevenue > 0 ? (totalPaid / totalRevenue) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {totalRevenue > 0 ? ((totalPaid / totalRevenue) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Ordini */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Storico Ordini
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : dealerOrders.length > 0 ? (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID Ordine</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Stato</TableHead>
                          <TableHead className="text-right">Importo</TableHead>
                          <TableHead className="text-right">Pagato</TableHead>
                          <TableHead className="text-right">Da Pagare</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dealerOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{formatDate(order.data_inserimento || "")}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.stato || "")}>
                                {getStatusLabel(order.stato || "")}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">{formatCurrency(order.importo_totale || 0)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(order.importo_pagato || 0)}</TableCell>
                            <TableCell className="text-right text-amber-600 font-medium">
                              {formatCurrency(order.importo_da_pagare || 0)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(`/ordini/${order.id}`)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Dettagli
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {hasMoreOrders && (
                    <div className="text-center pt-4">
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/ordini?dealer=${id}`)}
                      >
                        Vedi tutti gli ordini ({ordersCount})
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nessun ordine trovato</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
