import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, ShoppingCart, Euro, TrendingUp, ArrowRightLeft } from "lucide-react";
import { AssignDealersDialog } from "@/components/commerciali/AssignDealersDialog";
import { useCommercialeById } from "@/hooks/useCommerciali";
import { useDealers } from "@/hooks/useDealers";
import { useCommissionsByCommerciale } from "@/hooks/useCommissions";
import { useOrders } from "@/hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const CommercialeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<{
    id: string;
    name: string;
  } | null>(null);
  
  const { data: commerciale, isLoading: isLoadingCommerciale } = useCommercialeById(id);
  const { data: dealers = [], isLoading: isLoadingDealers } = useDealers();
  const { data: commissions = [], isLoading: isLoadingCommissions } = useCommissionsByCommerciale(id || "");
  const { data: orders = [], isLoading: isLoadingOrders } = useOrders();

  const commercialeDealers = dealers.filter((d) => d.commerciale_owner_id === id);
  const commercialeOrders = orders.filter((o) => o.commerciale_id === id);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: it });
  };

  const totaleFatturato = commercialeOrders.reduce((sum, o) => sum + Number(o.importo_totale), 0);
  const provvigioniDovute = commissions
    .filter((c) => c.stato_liquidazione === "dovuta")
    .reduce((sum, c) => sum + Number(c.importo_calcolato), 0);
  const provvigioniLiquidate = commissions
    .filter((c) => c.stato_liquidazione === "liquidata")
    .reduce((sum, c) => sum + Number(c.importo_calcolato), 0);

  if (isLoadingCommerciale) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!commerciale) {
    return (
      <div className="space-y-6">
        <div>
          <Link to="/commerciali">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna ai commerciali
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Commerciale non trovato</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/commerciali">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna ai commerciali
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">{commerciale.display_name}</h1>
          <p className="text-muted-foreground mt-1">{commerciale.email}</p>
        </div>
        <Badge variant={commerciale.is_active ? "default" : "secondary"}>
          {commerciale.is_active ? "Attivo" : "Inattivo"}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dealers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commercialeDealers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordini</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commercialeOrders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fatturato</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totaleFatturato)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Provvigioni</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(provvigioniDovute + provvigioniLiquidate)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(provvigioniDovute)} dovute
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dealers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dealers">Dealers</TabsTrigger>
          <TabsTrigger value="orders">Ordini</TabsTrigger>
          <TabsTrigger value="commissions">Provvigioni</TabsTrigger>
        </TabsList>

        <TabsContent value="dealers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dealers Assegnati</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingDealers ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : commercialeDealers.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nessun dealer assegnato
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ragione Sociale</TableHead>
                      <TableHead>P.IVA</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Ordini</TableHead>
                      <TableHead className="text-right">Fatturato</TableHead>
                      <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commercialeDealers.map((dealer) => (
                      <TableRow key={dealer.id}>
                        <TableCell>
                          <Link 
                            to={`/dealers/${dealer.id}`}
                            className="font-medium hover:underline"
                          >
                            {dealer.ragione_sociale}
                          </Link>
                        </TableCell>
                        <TableCell>{dealer.p_iva}</TableCell>
                        <TableCell>{dealer.email}</TableCell>
                        <TableCell>{dealer.ordersCount || 0}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(dealer.totalRevenue || 0)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedDealer({
                                id: dealer.id,
                                name: dealer.ragione_sociale,
                              });
                              setAssignDialogOpen(true);
                            }}
                          >
                            <ArrowRightLeft className="h-4 w-4 mr-1" />
                            Riassegna
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ordini del Commerciale</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : commercialeOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nessun ordine trovato
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Ordine</TableHead>
                      <TableHead>Dealer</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Stato</TableHead>
                      <TableHead className="text-right">Importo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commercialeOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Link 
                            to={`/orders/${order.id}`}
                            className="font-medium hover:underline"
                          >
                            {order.id}
                          </Link>
                        </TableCell>
                        <TableCell>{order.dealers?.ragione_sociale}</TableCell>
                        <TableCell>{formatDate(order.data_inserimento)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{order.stato}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(Number(order.importo_totale))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Provvigioni</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingCommissions ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : commissions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nessuna provvigione trovata
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ordine</TableHead>
                      <TableHead>Dealer</TableHead>
                      <TableHead>Base</TableHead>
                      <TableHead>%</TableHead>
                      <TableHead>Stato</TableHead>
                      <TableHead className="text-right">Importo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissions.map((commission) => (
                      <TableRow key={commission.id}>
                        <TableCell>
                          <Link 
                            to={`/orders/${commission.ordine_id}`}
                            className="font-medium hover:underline"
                          >
                            {commission.ordine_id}
                          </Link>
                        </TableCell>
                        <TableCell>{commission.orders?.dealers?.ragione_sociale}</TableCell>
                        <TableCell>{commission.base_calcolo}</TableCell>
                        <TableCell>{commission.percentuale}%</TableCell>
                        <TableCell>
                          <Badge 
                            variant={commission.stato_liquidazione === "liquidata" ? "default" : "secondary"}
                          >
                            {commission.stato_liquidazione}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(Number(commission.importo_calcolato))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedDealer && commerciale && (
        <AssignDealersDialog
          dealerId={selectedDealer.id}
          dealerName={selectedDealer.name}
          currentCommercialeId={id || ""}
          currentCommercialeName={commerciale.display_name}
          open={assignDialogOpen}
          onOpenChange={setAssignDialogOpen}
        />
      )}
    </div>
  );
};

export default CommercialeDetail;
