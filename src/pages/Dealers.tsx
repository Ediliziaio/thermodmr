import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useDealersInfinite, type DealerFilters } from "@/hooks/useDealersInfinite";
import NewDealerDialog from "@/components/dealers/NewDealerDialog";
import { DealerFilters as DealerFiltersComponent } from "@/components/dealers/DealerFilters";
import { MobileDealerFilters } from "@/components/dealers/MobileDealerFilters";
import { DealerCard } from "@/components/dealers/DealerCard";
import { MobileDealerCard } from "@/components/dealers/MobileDealerCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

export default function Dealers() {
  const [filters, setFilters] = useState<DealerFilters>({});
  const [showNewDealerDialog, setShowNewDealerDialog] = useState(false);
  const isMobile = useIsMobile();
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
          {allDealers.length === 0 ? (
            <Card>
              <CardContent className="p-8">
                <p className="text-center text-muted-foreground">
                  Nessun rivenditore trovato. Prova a modificare i filtri o aggiungi un nuovo rivenditore.
                </p>
              </CardContent>
            </Card>
          ) : (
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