import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, TrendingUp, Euro, Award, Loader2, Plus, Trash2, Download, X } from "lucide-react";
import { useCommercialiInfinite } from "@/hooks/useCommercialiInfinite";
import { CommercialeCard } from "@/components/commerciali/CommercialeCard";
import { NewCommercialeDialog } from "@/components/commerciali/NewCommercialeDialog";
import { CommercialFilters } from "@/components/commerciali/CommercialFilters";
import { MobileCommercialCard } from "@/components/commerciali/MobileCommercialCard";
import { MobileCommercialFilters } from "@/components/commerciali/MobileCommercialFilters";
import { BulkDeleteCommercialiDialog } from "@/components/commerciali/BulkDeleteCommercialiDialog";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { exportCommerciali } from "@/lib/exportUtils";
import { toast } from "sonner";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

export default function Commerciali() {
  const isMobile = useIsMobile();
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useCommercialiInfinite();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
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

  // Selection handlers
  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredCommerciali.length && filteredCommerciali.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredCommerciali.map(c => c.id)));
    }
  };

  const clearSelection = () => setSelectedIds(new Set());

  const handleBulkExport = () => {
    const selected = filteredCommerciali.filter(c => selectedIds.has(c.id));
    exportCommerciali(selected);
    toast.success(`${selected.length} commerciali esportati`);
  };

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

  // Mobile view
  if (isMobile) {
    return (
      <div className="space-y-4 pb-20">
        <div className="flex items-center justify-between px-4 pt-4">
          <h1 className="text-2xl font-bold">Commerciali</h1>
        </div>

        {/* Mobile Stats Cards - Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-w-[160px] snap-start"
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground">Totale</p>
                </div>
                <p className="text-2xl font-bold">{stats.totalCommerciali}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="min-w-[160px] snap-start"
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <p className="text-xs font-medium text-muted-foreground">Attivi</p>
                </div>
                <p className="text-2xl font-bold">{stats.activeCommerciali}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="min-w-[180px] snap-start"
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Euro className="h-5 w-5 text-blue-500" />
                  <p className="text-xs font-medium text-muted-foreground">Fatturato</p>
                </div>
                <p className="text-lg font-bold">{formatCurrency(stats.totalRevenue)}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="min-w-[180px] snap-start"
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-orange-500" />
                  <p className="text-xs font-medium text-muted-foreground">Provvigioni</p>
                </div>
                <p className="text-lg font-bold">{formatCurrency(stats.totalCommissions)}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Mobile Filters */}
        <MobileCommercialFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          resultsCount={filteredCommerciali.length}
        />

        {/* Mobile Commercial Cards */}
        <div className="space-y-3 px-4">
          {filteredCommerciali.map((commerciale, index) => (
            <motion.div
              key={commerciale.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MobileCommercialCard
                commercial={commerciale}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </motion.div>
          ))}

          {/* Infinite Scroll Trigger */}
          {hasNextPage && (
            <div ref={ref} className="flex justify-center py-4">
              {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin" />}
            </div>
          )}
        </div>

        {/* FAB for New Commercial */}
        <NewCommercialeDialog open={newDialogOpen} onOpenChange={setNewDialogOpen}>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
            onClick={() => setNewDialogOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </NewCommercialeDialog>
      </div>
    );
  }

  // Desktop view
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
        onStatusChange={setStatusFilter}
      />

      {/* Bulk Actions Toolbar */}
      {selectedIds.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/20 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedIds.size === filteredCommerciali.length}
                onCheckedChange={toggleSelectAll}
              />
              <p className="text-sm font-medium">
                {selectedIds.size} commerciale/i selezionato/i
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Esporta
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setBulkDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Elimina
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}

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
              <div key={commerciale.id} className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <Checkbox
                    checked={selectedIds.has(commerciale.id)}
                    onCheckedChange={() => toggleSelection(commerciale.id)}
                    className="bg-background border-2"
                  />
                </div>
                <CommercialeCard commerciale={commerciale} />
              </div>
            ))}
          </div>

          {hasNextPage && (
            <div ref={ref} className="flex justify-center py-8">
              {isFetchingNextPage && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
            </div>
          )}
        </>
      )}

      <BulkDeleteCommercialiDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        commercialeIds={Array.from(selectedIds)}
        onSuccess={clearSelection}
      />
    </div>
  );
}