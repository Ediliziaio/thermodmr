import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Euro, Award, Loader2 } from "lucide-react";
import { useCommercialiInfinite } from "@/hooks/useCommercialiInfinite";
import { CommercialeCard } from "@/components/commerciali/CommercialeCard";
import { NewCommercialeDialog } from "@/components/commerciali/NewCommercialeDialog";
import { CommercialFilters } from "@/components/commerciali/CommercialFilters";
import { useInView } from "react-intersection-observer";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

export default function Commerciali() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useCommercialiInfinite();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allCommerciali = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const filteredCommerciali = useMemo(() => {
    return allCommerciali.filter((commerciale) => {
      const matchesSearch =
        commerciale.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commerciale.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && commerciale.is_active) ||
        (statusFilter === "inactive" && !commerciale.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [allCommerciali, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    return {
      totalCommerciali: allCommerciali.length,
      activeCommerciali: allCommerciali.filter((c) => c.is_active).length,
      totalRevenue: allCommerciali.reduce((sum, c) => sum + c.fatturato_totale, 0),
      totalCommissions: allCommerciali.reduce(
        (sum, c) => sum + c.provvigioni_dovute + c.provvigioni_liquidate,
        0
      ),
    };
  }, [allCommerciali]);

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
        <p className="text-destructive">Errore nel caricamento dei commerciali</p>
      </div>
    );
  }

  const totalCount = data?.pages[0]?.totalCount || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Commerciali</h1>
        <NewCommercialeDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Totale Commerciali</p>
                <p className="text-2xl font-bold">{stats.totalCommerciali}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attivi</p>
                <p className="text-2xl font-bold">{stats.activeCommerciali}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fatturato Totale</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <Euro className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Provvigioni Totali</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalCommissions)}</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <CommercialFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="text-sm text-muted-foreground">
        Mostrando {filteredCommerciali.length} di {totalCount} commerciali
      </div>

      {filteredCommerciali.length === 0 ? (
        <Card>
          <CardContent className="p-8">
            <p className="text-center text-muted-foreground">Nessun commerciale trovato</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCommerciali.map((commerciale) => (
              <CommercialeCard key={commerciale.id} commerciale={commerciale} />
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