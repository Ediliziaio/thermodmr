import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/hooks/useOrders";
import { NewOrderDialog } from "@/components/orders/NewOrderDialog";

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

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    da_confermare: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    da_pagare_acconto: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    in_lavorazione: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    da_consegnare: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    consegnato: "bg-green-500/10 text-green-700 dark:text-green-400",
  };
  return colors[status] || "bg-gray-500/10 text-gray-700 dark:text-gray-400";
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    da_confermare: "Da Confermare",
    da_pagare_acconto: "Da Pagare Acconto",
    in_lavorazione: "In Lavorazione",
    da_consegnare: "Da Consegnare",
    consegnato: "Consegnato",
  };
  return labels[status] || status;
};

export default function Orders() {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Errore nel caricamento degli ordini</p>
      </div>
    );
  }

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
        <NewOrderDialog />
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Ordini</CardTitle>
        </CardHeader>
        <CardContent>
          {orders && orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                    <th className="pb-3 pr-4">ID Ordine</th>
                    <th className="pb-3 pr-4">Rivenditore</th>
                    <th className="pb-3 pr-4">Cliente</th>
                    <th className="pb-3 pr-4">Stato</th>
                    <th className="pb-3 pr-4">Data Inserimento</th>
                    <th className="pb-3 pr-4">Importo Totale</th>
                    <th className="pb-3 pr-4">Acconto</th>
                    <th className="pb-3 pr-4">Consegna Prevista</th>
                    <th className="pb-3">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-4 pr-4">
                        <p className="font-medium">{order.id}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm">{order.dealers?.ragione_sociale || "-"}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.dealers?.email || ""}
                        </p>
                      </td>
                      <td className="py-4 pr-4 text-sm">
                        {order.clients 
                          ? `${order.clients.nome} ${order.clients.cognome}` 
                          : "-"}
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant="outline" className={getStatusColor(order.stato)}>
                          {getStatusLabel(order.stato)}
                        </Badge>
                      </td>
                      <td className="py-4 pr-4 text-sm">
                        {formatDate(new Date(order.data_inserimento))}
                      </td>
                      <td className="py-4 pr-4 font-medium">
                        {formatCurrency(order.importo_totale)}
                      </td>
                      <td className="py-4 pr-4 text-sm">
                        {formatCurrency(order.importo_acconto)}
                      </td>
                      <td className="py-4 pr-4 text-sm">
                        {order.data_consegna_prevista
                          ? formatDate(new Date(order.data_consegna_prevista))
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nessun ordine trovato</p>
              <p className="text-sm text-muted-foreground mt-2">
                Crea il tuo primo ordine per iniziare
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
