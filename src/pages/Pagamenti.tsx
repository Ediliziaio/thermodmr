import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { NewPaymentDialog } from "@/components/payments/NewPaymentDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Link } from "react-router-dom";
import { Euro, TrendingUp, Clock, CreditCard } from "lucide-react";

interface PaymentWithDetails {
  id: string;
  tipo: string;
  importo: number;
  metodo: string;
  data_pagamento: string;
  riferimento: string | null;
  ordine_id: string;
  orders: {
    id: string;
    stato: string;
    importo_totale: number;
    dealer_id: string;
    dealers: {
      ragione_sociale: string;
    };
  };
}

const Pagamenti = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [tipoFilter, setTipoFilter] = useState("all");
  const [metodoFilter, setMetodoFilter] = useState("all");

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["allPayments", dateRange, tipoFilter, metodoFilter],
    queryFn: async () => {
      let query = supabase
        .from("payments")
        .select(`
          *,
          orders!inner(
            id,
            stato,
            importo_totale,
            dealer_id,
            dealers!inner(
              ragione_sociale
            )
          )
        `)
        .order("data_pagamento", { ascending: false });

      if (dateRange?.from) {
        query = query.gte("data_pagamento", format(dateRange.from, "yyyy-MM-dd"));
      }
      if (dateRange?.to) {
        query = query.lte("data_pagamento", format(dateRange.to, "yyyy-MM-dd"));
      }
      if (tipoFilter !== "all") {
        query = query.eq("tipo", tipoFilter as "acconto" | "saldo" | "parziale");
      }
      if (metodoFilter !== "all") {
        query = query.eq("metodo", metodoFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as PaymentWithDetails[];
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: it });
  };

  const getTipoBadgeVariant = (tipo: string) => {
    switch (tipo) {
      case "acconto":
        return "secondary";
      case "saldo":
        return "default";
      case "parziale":
        return "outline";
      default:
        return "outline";
    }
  };

  const totaleIncassato = payments.reduce((sum, p) => sum + Number(p.importo), 0);
  const mediaImporto = payments.length > 0 ? totaleIncassato / payments.length : 0;
  const metodoPiuUsato = payments.reduce((acc, p) => {
    acc[p.metodo] = (acc[p.metodo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const metodoPiuUsatoNome = Object.entries(metodoPiuUsato).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const handleResetFilters = () => {
    setDateRange(undefined);
    setTipoFilter("all");
    setMetodoFilter("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Pagamenti</h1>
          <p className="text-muted-foreground mt-1">
            Storico e gestione di tutti i pagamenti
          </p>
        </div>
        <NewPaymentDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Incassato</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{formatCurrency(totaleIncassato)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {payments.length} pagamenti
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Importo</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{formatCurrency(mediaImporto)}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamenti In Attesa</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">
                {payments.filter(p => p.orders.stato === "da_pagare_acconto" || p.orders.stato === "da_pagare_saldo").length}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metodo Più Usato</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold capitalize">{metodoPiuUsatoNome}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtri</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentFilters
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            tipoFilter={tipoFilter}
            onTipoFilterChange={setTipoFilter}
            metodoFilter={metodoFilter}
            onMetodoFilterChange={setMetodoFilter}
            onReset={handleResetFilters}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tutti i Pagamenti</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : payments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nessun pagamento trovato con i filtri selezionati
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Ordine</TableHead>
                  <TableHead>Dealer</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Metodo</TableHead>
                  <TableHead>Riferimento</TableHead>
                  <TableHead className="text-right">Importo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatDate(payment.data_pagamento)}</TableCell>
                    <TableCell>
                      <Link 
                        to={`/orders/${payment.ordine_id}`}
                        className="font-medium hover:underline"
                      >
                        {payment.ordine_id}
                      </Link>
                    </TableCell>
                    <TableCell>{payment.orders.dealers.ragione_sociale}</TableCell>
                    <TableCell>
                      <Badge variant={getTipoBadgeVariant(payment.tipo)}>
                        {payment.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{payment.metodo}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {payment.riferimento || "-"}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(Number(payment.importo))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Pagamenti;
