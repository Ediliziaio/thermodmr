import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockOrders, mockPayments, mockDealers, getOrderSaldo } from "@/lib/mock-data";
import { OrderStatus } from "@/types";
import { Euro, TrendingUp, Package, Clock, AlertCircle, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.importoTotale, 0);
  const totalAcconti = mockPayments
    .filter(p => p.tipo === "ACCONTO")
    .reduce((sum, p) => sum + p.importo, 0);
  const totalIncassato = mockPayments.reduce((sum, p) => sum + p.importo, 0);
  const daSaldare = totalRevenue - totalIncassato;

  const ordersByStatus = {
    [OrderStatus.DA_CONFERMARE]: mockOrders.filter(o => o.stato === OrderStatus.DA_CONFERMARE).length,
    [OrderStatus.DA_PAGARE_ACCONTO]: mockOrders.filter(o => o.stato === OrderStatus.DA_PAGARE_ACCONTO).length,
    [OrderStatus.IN_LAVORAZIONE]: mockOrders.filter(o => o.stato === OrderStatus.IN_LAVORAZIONE).length,
    [OrderStatus.DA_CONSEGNARE]: mockOrders.filter(o => o.stato === OrderStatus.DA_CONSEGNARE).length,
    [OrderStatus.CONSEGNATO]: mockOrders.filter(o => o.stato === OrderStatus.CONSEGNATO).length,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      [OrderStatus.DA_CONFERMARE]: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      [OrderStatus.DA_PAGARE_ACCONTO]: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
      [OrderStatus.IN_LAVORAZIONE]: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      [OrderStatus.DA_CONSEGNARE]: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      [OrderStatus.CONSEGNATO]: "bg-green-500/10 text-green-700 dark:text-green-400",
    };
    return colors[status];
  };

  const getStatusLabel = (status: OrderStatus) => {
    const labels = {
      [OrderStatus.DA_CONFERMARE]: "Da Confermare",
      [OrderStatus.DA_PAGARE_ACCONTO]: "Da Pagare Acconto",
      [OrderStatus.IN_LAVORAZIONE]: "In Lavorazione",
      [OrderStatus.DA_CONSEGNARE]: "Da Consegnare",
      [OrderStatus.CONSEGNATO]: "Consegnato",
    };
    return labels[status];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Panoramica generale degli ordini e delle performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Ricavi Totali</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockOrders.length} ordini totali
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Acconti Incassati</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAcconti)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockPayments.filter(p => p.tipo === "ACCONTO").length} pagamenti
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Totale Incassato</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalIncassato)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockPayments.length} pagamenti totali
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Da Saldare</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(daSaldare)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((daSaldare / totalRevenue) * 100).toFixed(1)}% del totale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders by Status */}
      <Card>
        <CardHeader>
          <CardTitle>Ordini per Stato</CardTitle>
          <CardDescription>Distribuzione degli ordini nelle varie fasi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {Object.entries(ordersByStatus).map(([status, count]) => (
              <Badge
                key={status}
                variant="outline"
                className={getStatusColor(status as OrderStatus)}
              >
                {getStatusLabel(status as OrderStatus)}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Ordini Recenti</CardTitle>
          <CardDescription>Ultimi ordini inseriti nel sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{order.id}</p>
                    <Badge variant="outline" className={getStatusColor(order.stato)}>
                      {getStatusLabel(order.stato)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.dealer?.ragioneSociale}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-semibold">{formatCurrency(order.importoTotale)}</p>
                  <p className="text-xs text-muted-foreground">
                    Saldo: {formatCurrency(getOrderSaldo(order.id))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Dealers */}
      <Card>
        <CardHeader>
          <CardTitle>Rivenditori Attivi</CardTitle>
          <CardDescription>Panoramica dei rivenditori principali</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDealers.map((dealer) => {
              const dealerOrders = mockOrders.filter(o => o.dealerId === dealer.id);
              const dealerRevenue = dealerOrders.reduce((sum, o) => sum + o.importoTotale, 0);
              
              return (
                <div
                  key={dealer.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{dealer.ragioneSociale}</p>
                    <p className="text-sm text-muted-foreground">
                      {dealer.citta}, {dealer.provincia}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold">{formatCurrency(dealerRevenue)}</p>
                    <p className="text-xs text-muted-foreground">
                      {dealerOrders.length} ordini
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
