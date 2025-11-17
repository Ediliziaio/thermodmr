import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Clock, Euro, Download } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { useCommissions, useCommissionsSummary } from "@/hooks/useCommissions";
import { CommissionStatusBadge } from "@/components/commissions/CommissionStatusBadge";
import { LiquidateCommissionDialog } from "@/components/commissions/LiquidateCommissionDialog";
import { ExportColumnsDialog } from "@/components/export/ExportColumnsDialog";
import { exportCommissionsCustom, COMMISSION_COLUMNS } from "@/lib/exportUtils";
import { useAuth } from "@/contexts/AuthContext";

const Provvigioni = () => {
  const [statusFilter, setStatusFilter] = useState<"all" | "dovuta" | "liquidata">("all");
  const [periodFilter, setPeriodFilter] = useState<"all" | "mese" | "trimestre" | "anno">("all");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const { user, hasRole } = useAuth();

  const filters = {
    stato: statusFilter === "all" ? undefined : statusFilter,
    periodo: periodFilter === "all" ? undefined : (periodFilter as "mese" | "trimestre" | "anno"),
    commercialeId: hasRole("commerciale") ? user?.id : undefined,
  };

  const { data: commissions = [], isLoading } = useCommissions(filters);
  const { data: summary } = useCommissionsSummary(
    hasRole("commerciale") ? user?.id : undefined
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: it });
  };

  const getBaseCalcoloLabel = (base: string) => {
    const labels: Record<string, string> = {
      totale: "Totale",
      margine: "Margine",
      personalizzata: "Personalizzata",
    };
    return labels[base] || base;
  };

  const handleExportCSV = (selectedColumns: string[], data: any[]) => {
    exportCommissionsCustom(data, selectedColumns);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Provvigioni</h1>
        <p className="text-muted-foreground mt-1">
          Gestione provvigioni commerciali
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Maturate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary?.totaleMaturate || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {commissions.filter((c) => c.stato_liquidazione === "dovuta").length} provvigioni
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Liquidate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary?.totaleLiquidate || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {commissions.filter((c) => c.stato_liquidazione === "liquidata").length} provvigioni
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Generale</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary?.totaleGenerale || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {commissions.length} provvigioni totali
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Elenco Provvigioni</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setExportDialogOpen(true)}
                disabled={commissions.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Esporta CSV
              </Button>
              
              <Select 
                value={statusFilter} 
                onValueChange={(v) => setStatusFilter(v as "all" | "dovuta" | "liquidata")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="dovuta">Maturate</SelectItem>
                  <SelectItem value="liquidata">Liquidate</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={periodFilter} 
                onValueChange={(v) => setPeriodFilter(v as "all" | "mese" | "trimestre" | "anno")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i periodi</SelectItem>
                  <SelectItem value="mese">Mese corrente</SelectItem>
                  <SelectItem value="trimestre">Trimestre corrente</SelectItem>
                  <SelectItem value="anno">Anno corrente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordine</TableHead>
                  <TableHead>Dealer</TableHead>
                  <TableHead>Base Calcolo</TableHead>
                  <TableHead>Importo Base</TableHead>
                  <TableHead>Percentuale</TableHead>
                  <TableHead>Provvigione</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Data Liquidazione</TableHead>
                  {hasRole("super_admin") && <TableHead className="text-right">Azioni</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={hasRole("super_admin") ? 9 : 8} className="text-center text-muted-foreground">
                      Caricamento...
                    </TableCell>
                  </TableRow>
                ) : commissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={hasRole("super_admin") ? 9 : 8} className="text-center text-muted-foreground">
                      Nessuna provvigione trovata
                    </TableCell>
                  </TableRow>
                ) : (
                  commissions.map((commission) => (
                    <TableRow key={commission.id}>
                      <TableCell className="font-medium">{commission.ordine_id}</TableCell>
                      <TableCell>
                        {commission.orders.dealers.ragione_sociale}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getBaseCalcoloLabel(commission.base_calcolo)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatCurrency(commission.orders.importo_totale)}
                      </TableCell>
                      <TableCell>{commission.percentuale}%</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(commission.importo_calcolato)}
                      </TableCell>
                      <TableCell>
                        <CommissionStatusBadge status={commission.stato_liquidazione} />
                      </TableCell>
                      <TableCell>
                        {commission.data_liquidazione
                          ? formatDate(commission.data_liquidazione)
                          : "-"}
                      </TableCell>
                      {hasRole("super_admin") && (
                        <TableCell className="text-right">
                          {commission.stato_liquidazione === "dovuta" && (
                            <LiquidateCommissionDialog
                              commissionId={commission.id}
                              importo={commission.importo_calcolato}
                            />
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Provvigioni;
