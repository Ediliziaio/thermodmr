import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOrders, getOrderSaldo } from "@/lib/mock-data";
import { OrderStatus } from "@/types";
import { Plus, Eye } from "lucide-react";

export default function Orders() {
  const navigate = useNavigate();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ordini</h1>
          <p className="text-muted-foreground mt-1">
            Gestisci tutti gli ordini dei rivenditori
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuovo Ordine
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Ordini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                  <th className="pb-3 pr-4">ID Ordine</th>
                  <th className="pb-3 pr-4">Rivenditore</th>
                  <th className="pb-3 pr-4">Stato</th>
                  <th className="pb-3 pr-4">Data Inserimento</th>
                  <th className="pb-3 pr-4">Importo Totale</th>
                  <th className="pb-3 pr-4">Acconto</th>
                  <th className="pb-3 pr-4">Da Saldo</th>
                  <th className="pb-3 pr-4">Consegna Prevista</th>
                  <th className="pb-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-4 pr-4">
                      <p className="font-medium">{order.id}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="text-sm">{order.dealer?.ragioneSociale}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.dealer?.citta}
                      </p>
                    </td>
                    <td className="py-4 pr-4">
                      <Badge variant="outline" className={getStatusColor(order.stato)}>
                        {getStatusLabel(order.stato)}
                      </Badge>
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      {formatDate(order.dataInserimento)}
                    </td>
                    <td className="py-4 pr-4 font-medium">
                      {formatCurrency(order.importoTotale)}
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      {formatCurrency(order.importoAcconto)}
                    </td>
                    <td className="py-4 pr-4 font-medium">
                      {formatCurrency(getOrderSaldo(order.id))}
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      {order.dataConsegnaPrevista
                        ? formatDate(order.dataConsegnaPrevista)
                        : "N/A"}
                    </td>
                    <td className="py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/ordini/${order.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Dettagli
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
