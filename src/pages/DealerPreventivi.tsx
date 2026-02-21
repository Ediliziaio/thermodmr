import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FileText, ArrowRightCircle, Eye, AlertTriangle, CheckCircle2, Plus } from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { NewPreventivoDialog } from "@/components/orders/NewPreventivoDialog";

interface DealerPreventiviProps {
  dealerId?: string;
}

export default function DealerPreventivi({ dealerId }: DealerPreventiviProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userRole } = useAuth();
  const [convertId, setConvertId] = useState<string | null>(null);
  const [preventivoDialogOpen, setPreventivoDialogOpen] = useState(false);

  const { data: preventivi, isLoading } = useQuery({
    queryKey: ["dealer-preventivi", dealerId],
    queryFn: async () => {
      let query = supabase
        .from("orders")
        .select("id, data_inserimento, importo_totale, data_scadenza_preventivo, dealer_id, dealers(ragione_sociale)")
        .eq("stato", "preventivo");

      if (dealerId) {
        query = query.eq("dealer_id", dealerId);
      }

      const { data, error } = await query.order("data_inserimento", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const convertMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("orders")
        .update({ stato: "da_confermare" as any })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Preventivo convertito in ordine con successo");
      queryClient.invalidateQueries({ queryKey: ["dealer-preventivi"] });
      queryClient.invalidateQueries({ queryKey: ["dealer-order-stats"] });
      setConvertId(null);
    },
    onError: () => {
      toast.error("Errore nella conversione del preventivo");
    },
  });

  const isExpired = (date: string | null) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  const basePath = dealerId ? `/rivenditori/${dealerId}/area` : "";

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Preventivi</h1>
         <p className="text-sm text-muted-foreground mt-1">
            Gestisci i tuoi preventivi e convertili in ordini
          </p>
        </div>
        {(userRole === "super_admin" || userRole === "commerciale") && (
          <>
            <Button onClick={() => setPreventivoDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nuovo Preventivo
            </Button>
            <NewPreventivoDialog
              open={preventivoDialogOpen}
              onOpenChange={setPreventivoDialogOpen}
              defaultDealerId={dealerId}
            />
          </>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : preventivi && preventivi.length > 0 ? (
        <>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {preventivi.map((p) => {
              const expired = isExpired(p.data_scadenza_preventivo);
              return (
                <Card
                  key={p.id}
                  className={cn(
                    "cursor-pointer hover:shadow-md transition-shadow",
                    expired && "border-destructive/50 bg-destructive/5"
                  )}
                  onClick={() => navigate(`${basePath}/ordini/${p.id}`)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-medium">{p.id}</span>
                      {expired ? (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Scaduto
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Valido
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Importo</p>
                        <p className="font-medium">{formatCurrency(Number(p.importo_totale))}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Creato il</p>
                        <p>{formatDate(p.data_inserimento)}</p>
                      </div>
                      {p.data_scadenza_preventivo && (
                        <div className="col-span-2">
                          <p className="text-muted-foreground text-xs">Scadenza</p>
                          <p className={expired ? "text-destructive font-medium" : ""}>
                            {formatDate(p.data_scadenza_preventivo)}
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConvertId(p.id);
                      }}
                    >
                      <ArrowRightCircle className="h-4 w-4 mr-2" />
                      Converti in Ordine
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Desktop Table */}
          <Card className="hidden md:block">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Preventivo</TableHead>
                    <TableHead>Data Creazione</TableHead>
                    <TableHead>Importo Totale</TableHead>
                    <TableHead>Scadenza</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preventivi.map((p) => {
                    const expired = isExpired(p.data_scadenza_preventivo);
                    return (
                      <TableRow
                        key={p.id}
                        className={cn(
                          "cursor-pointer",
                          expired && "bg-destructive/5 hover:bg-destructive/10"
                        )}
                        onClick={() => navigate(`${basePath}/ordini/${p.id}`)}
                      >
                        <TableCell className="font-mono font-medium">{p.id}</TableCell>
                        <TableCell>{formatDate(p.data_inserimento)}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(Number(p.importo_totale))}</TableCell>
                        <TableCell className={expired ? "text-destructive font-medium" : ""}>
                          {p.data_scadenza_preventivo
                            ? formatDate(p.data_scadenza_preventivo)
                            : "—"}
                        </TableCell>
                        <TableCell>
                          {expired ? (
                            <Badge variant="destructive">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Scaduto
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Valido
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`${basePath}/ordini/${p.id}`);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConvertId(p.id);
                              }}
                            >
                              <ArrowRightCircle className="h-4 w-4 mr-1" />
                              Converti
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground font-medium">Nessun preventivo</p>
            <p className="text-sm text-muted-foreground mt-1">
              I preventivi appariranno qui quando verranno creati
            </p>
          </CardContent>
        </Card>
      )}

      {/* Confirm Conversion Dialog */}
      <AlertDialog open={!!convertId} onOpenChange={() => setConvertId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Converti in Ordine</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler convertire questo preventivo in un ordine?
              Il preventivo passerà allo stato "Da Confermare" e apparirà nella sezione Ordini.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => convertId && convertMutation.mutate(convertId)}
              disabled={convertMutation.isPending}
            >
              {convertMutation.isPending ? "Conversione..." : "Conferma Conversione"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
