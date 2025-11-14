import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/hooks/useOrders";
import { NewOrderDialog } from "@/components/orders/NewOrderDialog";
import { OrderFilters, OrderFiltersState } from "@/components/orders/OrderFilters";
import { useDealers } from "@/hooks/useDealers";
import { useMemo, useState } from "react";

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
  const { data: dealers } = useDealers();
  const [filters, setFilters] = useState<OrderFiltersState>({});

  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    return orders.filter((order) => {
      // Filtro per stato
      if (filters.stato && order.stato !== filters.stato) {
        return false;
      }

      // Filtro per rivenditore
      if (filters.dealerId && order.dealer_id !== filters.dealerId) {
        return false;
      }

      // Filtro per data inserimento (da)
      if (filters.dataInserimentoFrom) {
        const orderDate = new Date(order.data_inserimento);
        const filterDate = new Date(filters.dataInserimentoFrom);
        if (orderDate < filterDate) {
          return false;
        }
      }

      // Filtro per data inserimento (a)
      if (filters.dataInserimentoTo) {
        const orderDate = new Date(order.data_inserimento);
        const filterDate = new Date(filters.dataInserimentoTo);
        filterDate.setHours(23, 59, 59, 999);
        if (orderDate > filterDate) {
          return false;
        }
      }

      // Filtro per importo minimo
      if (filters.importoMin && order.importo_totale < filters.importoMin) {
        return false;
      }

      // Filtro per importo massimo
      if (filters.importoMax && order.importo_totale > filters.importoMax) {
        return false;
      }

      // Filtro per ricerca generale
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(searchLower);
        const matchesDealer = order.dealers?.ragione_sociale
          ?.toLowerCase()
          .includes(searchLower);
        const matchesClient = order.clients
          ? `${order.clients.nome} ${order.clients.cognome}`
              .toLowerCase()
              .includes(searchLower)
          : false;

        if (!matchesId && !matchesDealer && !matchesClient) {
          return false;
        }
      }

      return true;
    });
  }, [orders, filters]);

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

      {/* Filtri */}
      <OrderFilters
        filters={filters}
        onFiltersChange={setFilters}
        dealers={dealers || []}
      />

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Ordini</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
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
                  {filteredOrders.map((order) => (
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
              <p className="text-muted-foreground">
                {orders && orders.length > 0
                  ? "Nessun ordine corrisponde ai filtri selezionati"
                  : "Nessun ordine trovato"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {orders && orders.length > 0
                  ? "Prova a modificare i filtri di ricerca"
                  : "Crea il tuo primo ordine per iniziare"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
