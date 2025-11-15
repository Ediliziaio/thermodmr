import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useDealersInfinite } from "@/hooks/useDealersInfinite";
import NewDealerDialog from "@/components/dealers/NewDealerDialog";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

export default function Dealers() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useDealersInfinite();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allDealers = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">Errore nel caricamento dei rivenditori</p>
      </div>
    );
  }

  const totalCount = data?.pages[0]?.totalCount || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rivenditori</h1>
        <NewDealerDialog />
      </div>

      <div className="text-sm text-muted-foreground">
        Mostrando {allDealers.length} di {totalCount} rivenditori
      </div>

      {allDealers.length === 0 ? (
        <Card>
          <CardContent className="p-8">
            <p className="text-center text-muted-foreground">
              Nessun rivenditore trovato. Aggiungi il primo rivenditore.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allDealers.map((dealer) => (
              <Card key={dealer.id}>
                <CardHeader>
                  <CardTitle>{dealer.ragione_sociale}</CardTitle>
                  <CardDescription>P.IVA: {dealer.p_iva}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Contatti</p>
                    <p className="text-sm">{dealer.email}</p>
                    <p className="text-sm">{dealer.telefono}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Indirizzo</p>
                    <p className="text-sm">
                      {dealer.indirizzo}, {dealer.cap}
                    </p>
                    <p className="text-sm">
                      {dealer.citta} ({dealer.provincia})
                    </p>
                  </div>
                  <div className="pt-4 border-t space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ordini:</span>
                      <span className="font-medium">{dealer.ordersCount || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fatturato totale:</span>
                      <span className="font-semibold">
                        {formatCurrency(dealer.totalRevenue || 0)}
                      </span>
                    </div>
                    {dealer.commissione_personalizzata && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Commissione:</span>
                        <span>{dealer.commissione_personalizzata}%</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {hasNextPage && (
            <div ref={ref} className="flex justify-center py-8">
              {isFetchingNextPage && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
            </div>
          )}
        </>
      )}
    </div>
  );
}