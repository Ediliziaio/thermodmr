import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/utils";

const PAGE_SIZE = 15;

const entityLabels: Record<string, string> = {
  order: "Ordine",
  dealer: "Dealer",
  payment: "Pagamento",
  commission: "Commissione",
  user: "Utente",
  setting: "Impostazione",
};

const actionColors: Record<string, string> = {
  INSERT: "default",
  UPDATE: "secondary",
  DELETE: "destructive",
};

const AuditLogSection = () => {
  const [entityFilter, setEntityFilter] = useState<string>("all");
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["auditLog", entityFilter, page],
    queryFn: async () => {
      let query = supabase
        .from("audit_log")
        .select("*, profiles!audit_log_user_id_fkey(display_name)", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (entityFilter !== "all") {
        query = query.eq("entity", entityFilter);
      }

      const { data, error, count } = await query;
      if (error) throw error;
      return { rows: data, total: count ?? 0 };
    },
  });

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Audit Log
        </CardTitle>
        <CardDescription>
          Storico delle modifiche effettuate nel sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Select value={entityFilter} onValueChange={(v) => { setEntityFilter(v); setPage(0); }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtra per entità" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le entità</SelectItem>
              <SelectItem value="order">Ordini</SelectItem>
              <SelectItem value="dealer">Dealer</SelectItem>
              <SelectItem value="payment">Pagamenti</SelectItem>
              <SelectItem value="commission">Commissioni</SelectItem>
              <SelectItem value="user">Utenti</SelectItem>
              <SelectItem value="setting">Impostazioni</SelectItem>
            </SelectContent>
          </Select>
          {data && (
            <span className="text-sm text-muted-foreground">
              {data.total} {data.total === 1 ? "risultato" : "risultati"}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : data && data.rows.length > 0 ? (
          <>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">Data</TableHead>
                    <TableHead className="w-36">Utente</TableHead>
                    <TableHead className="w-24">Azione</TableHead>
                    <TableHead className="w-28">Entità</TableHead>
                    <TableHead>ID Entità</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.rows.map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-sm">
                        {formatDateTime(row.created_at)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {row.profiles?.display_name || "Sistema"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={actionColors[row.azione] as any || "outline"}>
                          {row.azione}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {entityLabels[row.entity] || row.entity}
                      </TableCell>
                      <TableCell className="text-sm font-mono text-muted-foreground truncate max-w-32">
                        {row.entity_id}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Pagina {page + 1} di {totalPages}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 0}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Nessuna voce di audit trovata
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuditLogSection;
