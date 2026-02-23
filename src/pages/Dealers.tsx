import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Building2, LayoutGrid, List, Loader2, Plus } from "lucide-react";
import { useDealersInfinite, type DealerFilters } from "@/hooks/useDealersInfinite";
import NewDealerDialog from "@/components/dealers/NewDealerDialog";
import { DealerFilters as DealerFiltersComponent } from "@/components/dealers/DealerFilters";
import { MobileDealerFilters } from "@/components/dealers/MobileDealerFilters";
import { DealerCard } from "@/components/dealers/DealerCard";
import { DealerRowView } from "@/components/dealers/DealerRowView";
import { MobileDealerCard } from "@/components/dealers/MobileDealerCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

export default function Dealers() {
  const [filters, setFilters] = useState<DealerFilters>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const isMobile = useIsMobile();
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useDealersInfinite(filters);
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
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Caricamento rivenditori...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-6">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div className="text-center">
              <h3 className="font-semibold text-lg">Errore nel caricamento</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Impossibile caricare i rivenditori. Verifica la connessione e riprova.
              </p>
            </div>
            <Button onClick={() => refetch()}>Riprova</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalCount = data?.pages[0]?.totalCount || 0;

  const emptyState = (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 p-8">
        <Building2 className="h-12 w-12 text-muted-foreground" />
        <div className="text-center">
          <h3 className="font-semibold text-lg">Nessun rivenditore trovato</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Prova a modificare i filtri o aggiungi un nuovo rivenditore.
          </p>
        </div>
        <NewDealerDialog
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Rivenditore
            </Button>
          }
        />
      </CardContent>
    </Card>
  );

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="pb-20">
        {/* Mobile Header */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 py-4 space-y-3">
          <div>
            <h1 className="text-2xl font-bold">Rivenditori</h1>
            <p className="text-sm text-muted-foreground">
              {totalCount} {totalCount === 1 ? "rivenditore" : "rivenditori"}
            </p>
          </div>
          <MobileDealerFilters
            onFiltersChange={setFilters}
            resultsCount={totalCount}
          />
        </div>

        {/* Mobile Content */}
        <div className="px-4 py-4">
          {allDealers.length === 0 ? emptyState : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {allDealers.map((dealer, index) => (
                  <motion.div
                    key={dealer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MobileDealerCard dealer={dealer} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {hasNextPage && (
                <div ref={ref} className="flex justify-center py-8">
                  {isFetchingNextPage && (
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* FAB - Floating Action Button */}
        <motion.div
          className="fixed bottom-6 right-6 z-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <NewDealerDialog
            trigger={
              <Button
                size="lg"
                className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <Plus className="h-6 w-6" />
              </Button>
            }
          />
        </motion.div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rivenditori</h1>
          <p className="text-muted-foreground">
            Gestisci i rivenditori e monitora le loro performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <NewDealerDialog />
        </div>
      </div>

      <DealerFiltersComponent
        onFiltersChange={setFilters}
        resultsCount={totalCount}
      />

      {allDealers.length === 0 ? emptyState : (
        <>
          {viewMode === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allDealers.map((dealer) => (
                <DealerCard key={dealer.id} dealer={dealer} />
              ))}
            </div>
          ) : (
            <DealerRowView dealers={allDealers} />
          )}

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
