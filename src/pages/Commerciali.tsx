import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCommerciali } from "@/hooks/useCommerciali";
import { CommercialeCard } from "@/components/commerciali/CommercialeCard";
import { NewCommercialeDialog } from "@/components/commerciali/NewCommercialeDialog";
import { CommercialFilters } from "@/components/commerciali/CommercialFilters";
import { Users, Euro, TrendingUp } from "lucide-react";
import { useState, useMemo } from "react";

const Commerciali = () => {
  const { data: commerciali = [], isLoading } = useCommerciali();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const filteredCommerciali = useMemo(() => {
    return commerciali.filter((commerciale) => {
      const matchesSearch =
        searchTerm === "" ||
        commerciale.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commerciale.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && commerciale.is_active) ||
        (statusFilter === "inactive" && !commerciale.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [commerciali, searchTerm, statusFilter]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const totaleCommerciali = filteredCommerciali.length;
  const commercialiAttivi = filteredCommerciali.filter((c) => c.is_active).length;
  const fatturatoTotale = filteredCommerciali.reduce((sum, c) => sum + c.fatturato_totale, 0);
  const provvigioniTotali = filteredCommerciali.reduce(
    (sum, c) => sum + c.provvigioni_dovute + c.provvigioni_liquidate,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Commerciali</h1>
          <p className="text-muted-foreground mt-1">
            Gestione dei commerciali e loro performance
          </p>
        </div>
        <NewCommercialeDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Commerciali</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{totaleCommerciali}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {commercialiAttivi} attivi
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dealers Totali</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">
                {commerciali.reduce((sum, c) => sum + c.dealers_count, 0)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fatturato Totale</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{formatCurrency(fatturatoTotale)}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Provvigioni Totali</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{formatCurrency(provvigioniTotali)}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <CommercialFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <div>
          <h2 className="text-xl font-semibold mb-4">Lista Commerciali</h2>
          {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          ) : filteredCommerciali.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all"
                    ? "Nessun commerciale trovato con i filtri selezionati"
                    : "Nessun commerciale trovato"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCommerciali.map((commerciale) => (
                <CommercialeCard key={commerciale.id} commerciale={commerciale} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Commerciali;
