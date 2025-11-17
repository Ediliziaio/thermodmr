import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useDealersInfinite, type DealerFilters } from "@/hooks/useDealersInfinite";
import NewDealerDialog from "@/components/dealers/NewDealerDialog";
import { DealerFilters as DealerFiltersComponent } from "@/components/dealers/DealerFilters";
import { DealerCard } from "@/components/dealers/DealerCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo, useState } from "react";

export default function Dealers() {
  const [filters, setFilters] = useState<DealerFilters>({});
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useDealersInfinite(filters);
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
        <div>
          <h1 className="text-3xl font-bold">Rivenditori</h1>
          <p className="text-muted-foreground">
            Gestisci i rivenditori e monitora le loro performance
          </p>
        </div>
        <NewDealerDialog />
      </div>

      <DealerFiltersComponent
        onFiltersChange={setFilters}
        resultsCount={totalCount}
      />

      {allDealers.length === 0 ? (
        <Card>
          <CardContent className="p-8">
            <p className="text-center text-muted-foreground">
              Nessun rivenditore trovato. Prova a modificare i filtri o aggiungi un nuovo rivenditore.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allDealers.map((dealer) => (
              <DealerCard key={dealer.id} dealer={dealer} />
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