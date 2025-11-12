import { useState } from "react";
import { mockCommissions, mockOrders } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Clock, Euro } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const Provvigioni = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("all");

  const filteredCommissions = mockCommissions.filter((commission) => {
    if (statusFilter !== "all" && commission.statoLiquidazione !== statusFilter) {
      return false;
    }
    // Period filter would normally check dates, simplified for mock data
    return true;
  });

  const totalMaturate = filteredCommissions
    .filter((c) => c.statoLiquidazione === "DOVUTA")
    .reduce((sum, c) => sum + c.importoCalcolato, 0);

  const totalLiquidate = filteredCommissions
    .filter((c) => c.statoLiquidazione === "LIQUIDATA")
    .reduce((sum, c) => sum + c.importoCalcolato, 0);

  const getOrder = (orderId: string) => {
    return mockOrders.find((o) => o.id === orderId);
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
              € {totalMaturate.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredCommissions.filter((c) => c.statoLiquidazione === "DOVUTA").length} provvigioni
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
              € {totalLiquidate.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredCommissions.filter((c) => c.statoLiquidazione === "LIQUIDATA").length} provvigioni
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
              € {(totalMaturate + totalLiquidate).toLocaleString("it-IT", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredCommissions.length} provvigioni totali
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Elenco Provvigioni</CardTitle>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="DOVUTA">Maturate</SelectItem>
                  <SelectItem value="LIQUIDATA">Liquidate</SelectItem>
                </SelectContent>
              </Select>

              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i periodi</SelectItem>
                  <SelectItem value="current-month">Mese corrente</SelectItem>
                  <SelectItem value="current-quarter">Trimestre corrente</SelectItem>
                  <SelectItem value="current-year">Anno corrente</SelectItem>
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
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                      Nessuna provvigione trovata
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCommissions.map((commission) => {
                    const order = getOrder(commission.ordineId);
                    return (
                      <TableRow key={commission.id}>
                        <TableCell className="font-medium">{commission.ordineId}</TableCell>
                        <TableCell>
                          {order?.dealer?.ragioneSociale || "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{commission.baseCalcolo}</Badge>
                        </TableCell>
                        <TableCell>
                          € {order?.importoTotale.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>{commission.percentuale}%</TableCell>
                        <TableCell className="font-semibold">
                          € {commission.importoCalcolato.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>
                          {commission.statoLiquidazione === "LIQUIDATA" ? (
                            <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Liquidata
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">
                              <Clock className="mr-1 h-3 w-3" />
                              Maturata
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {commission.dataLiquidazione
                            ? format(commission.dataLiquidazione, "dd MMM yyyy", { locale: it })
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          {commission.statoLiquidazione === "DOVUTA" && (
                            <Button size="sm" variant="outline">
                              Liquida
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
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
