import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, FileText, Euro, Loader2 } from "lucide-react";
import { useOrdersInfinite, OrderWithDetails } from "@/hooks/useOrdersInfinite";
import { usePaymentsInfinite } from "@/hooks/usePaymentsInfinite";
import type { PaymentWithDetails } from "@/lib/paymentConstants";
import { getTipoBadgeVariant } from "@/lib/paymentConstants";
import { useNavigate } from "react-router-dom";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GlobalSearchProps {
  className?: string;
}

// Utility per evidenziare il testo che matcha la query
const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.trim()})`, "gi");
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-primary/20 text-primary-foreground font-semibold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const OrderResult = ({ order, query, onClick }: { order: OrderWithDetails; query: string; onClick: () => void }) => {
  const dealerName = order.dealers?.ragione_sociale || "N/A";
  const clientName = order.clients ? `${order.clients.nome} ${order.clients.cognome}` : "";
  
  const statusColor = getStatusColor(order.stato) as "default" | "destructive" | "outline" | "secondary";
  
  return (
    <Card 
      className="cursor-pointer hover:border-primary transition-colors"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono text-sm font-semibold">
                {highlightMatch(order.id || "", query)}
              </span>
              <Badge variant={statusColor}>
                {getStatusLabel(order.stato)}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>
                <span className="font-medium">Dealer: </span>
                {highlightMatch(dealerName, query)}
              </div>
              {clientName && (
                <div>
                  <span className="font-medium">Cliente: </span>
                  {highlightMatch(clientName, query)}
                </div>
              )}
              <div>
                <span className="font-medium">Importo: </span>
                {formatCurrency(order.importo_totale || 0)}
              </div>
            </div>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            {order.data_inserimento && format(new Date(order.data_inserimento), "dd MMM yyyy", { locale: it })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentResult = ({ payment, query, onClick }: { payment: PaymentWithDetails; query: string; onClick: () => void }) => {

  return (
    <Card 
      className="cursor-pointer hover:border-primary transition-colors"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">
                {formatCurrency(payment.importo)}
              </span>
              <Badge variant={getTipoBadgeVariant(payment.tipo)}>
                {payment.tipo.charAt(0).toUpperCase() + payment.tipo.slice(1)}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>
                <span className="font-medium">Ordine: </span>
                <span className="font-mono">{payment.ordine_id}</span>
              </div>
              <div>
                <span className="font-medium">Dealer: </span>
                {highlightMatch(payment.orders.dealers.ragione_sociale, query)}
              </div>
              <div>
                <span className="font-medium">Metodo: </span>
                {highlightMatch(payment.metodo, query)}
              </div>
              {payment.riferimento && (
                <div>
                  <span className="font-medium">Rif: </span>
                  {highlightMatch(payment.riferimento, query)}
                </div>
              )}
            </div>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            {format(new Date(payment.data_pagamento), "dd MMM yyyy", { locale: it })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function GlobalSearch({ className }: GlobalSearchProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "orders" | "payments">("all");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch data with search query
  const { data: ordersData, isLoading: ordersLoading } = useOrdersInfinite({
    searchQuery: debouncedQuery,
  });

  const { data: paymentsData, isLoading: paymentsLoading } = usePaymentsInfinite({
    tipoFilter: "all",
    metodoFilter: "all",
    searchQuery: debouncedQuery,
  });

  const orders = useMemo(
    () => (ordersData?.pages.flatMap(p => p.data) || []).slice(0, 20),
    [ordersData]
  );

  const payments = useMemo(
    () => (paymentsData?.pages.flatMap(p => p.data) || []).slice(0, 20),
    [paymentsData]
  );

  const isLoading = ordersLoading || paymentsLoading;
  const hasResults = orders.length > 0 || payments.length > 0;
  const showResults = debouncedQuery.trim().length >= 2;

  const handleOrderClick = (orderId: string) => {
    setOpen(false);
    setSearchQuery("");
    navigate(`/ordini/${orderId}`);
  };

  const handlePaymentClick = (orderId: string) => {
    setOpen(false);
    setSearchQuery("");
    navigate(`/ordini/${orderId}#pagamenti`);
  };

  const handleClear = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Search className="h-4 w-4 mr-2" />
          Ricerca globale...
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Ricerca Globale</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca ordini, pagamenti, dealer, clienti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {!showResults && (
            <p className="text-xs text-muted-foreground mt-2">
              Digita almeno 2 caratteri per iniziare la ricerca
            </p>
          )}
        </div>

        {showResults && (
          <ScrollArea className="h-[500px]">
            <div className="px-6 pb-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !hasResults ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Nessun risultato trovato</p>
                  <p className="text-sm mt-2">Prova con un'altra query di ricerca</p>
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="all">
                      Tutti ({orders.length + payments.length})
                    </TabsTrigger>
                    <TabsTrigger value="orders">
                      Ordini ({orders.length})
                    </TabsTrigger>
                    <TabsTrigger value="payments">
                      Pagamenti ({payments.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-3">
                    {orders.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground">Ordini</h3>
                        {orders.map(order => (
                          <OrderResult
                            key={order.id}
                            order={order}
                            query={debouncedQuery}
                            onClick={() => handleOrderClick(order.id!)}
                          />
                        ))}
                      </div>
                    )}
                    {payments.length > 0 && (
                      <div className="space-y-2 mt-6">
                        <h3 className="text-sm font-semibold text-muted-foreground">Pagamenti</h3>
                        {payments.map(payment => (
                          <PaymentResult
                            key={payment.id}
                            payment={payment}
                            query={debouncedQuery}
                            onClick={() => handlePaymentClick(payment.ordine_id)}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="orders" className="space-y-3">
                    {orders.length > 0 ? (
                      orders.map(order => (
                        <OrderResult
                          key={order.id}
                          order={order}
                          query={debouncedQuery}
                          onClick={() => handleOrderClick(order.id!)}
                        />
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        Nessun ordine trovato
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="payments" className="space-y-3">
                    {payments.length > 0 ? (
                      payments.map(payment => (
                        <PaymentResult
                          key={payment.id}
                          payment={payment}
                          query={debouncedQuery}
                          onClick={() => handlePaymentClick(payment.ordine_id)}
                        />
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        Nessun pagamento trovato
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
