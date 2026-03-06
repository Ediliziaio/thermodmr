import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  FileText, ArrowRightCircle, Eye, AlertTriangle, CheckCircle2, Plus, Copy,
  Search, BarChart3, Euro, Clock, XCircle, CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { NewPreventivoDialog, type PreventivoDefaultValues } from "@/components/orders/NewPreventivoDialog";

interface DealerPreventiviProps {
  dealerId?: string;
}

type StatusFilter = "tutti" | "validi" | "non_validi";

const isNonValido = (date: string | null) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

export default function DealerPreventivi({ dealerId }: DealerPreventiviProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userRole } = useAuth();
  const canManage = userRole === "super_admin" || userRole === "commerciale";
  const [convertId, setConvertId] = useState<string | null>(null);
  const [preventivoDialogOpen, setPreventivoDialogOpen] = useState(false);
  const [duplicateData, setDuplicateData] = useState<PreventivoDefaultValues | undefined>(undefined);
  const [isDuplicating, setIsDuplicating] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [dealerFilter, setDealerFilter] = useState<string>("tutti");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("tutti");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

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

  // Unique dealers for filter dropdown
  const dealerOptions = useMemo(() => {
    if (!preventivi) return [];
    const map = new Map<string, string>();
    preventivi.forEach((p) => {
      const name = (p.dealers as any)?.ragione_sociale;
      if (name && p.dealer_id) map.set(p.dealer_id, name);
    });
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [preventivi]);

  // Filtered data
  const filteredPreventivi = useMemo(() => {
    if (!preventivi) return [];
    return preventivi.filter((p) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const dealerName = ((p.dealers as any)?.ragione_sociale || "").toLowerCase();
        if (!p.id.toLowerCase().includes(term) && !dealerName.includes(term)) return false;
      }
      if (dealerFilter !== "tutti" && p.dealer_id !== dealerFilter) return false;
      if (statusFilter === "validi" && isNonValido(p.data_scadenza_preventivo)) return false;
      if (statusFilter === "non_validi" && !isNonValido(p.data_scadenza_preventivo)) return false;
      if (dateFrom) {
        const d = new Date(p.data_inserimento);
        if (d < dateFrom) return false;
      }
      if (dateTo) {
        const d = new Date(p.data_inserimento);
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        if (d > end) return false;
      }
      return true;
    });
  }, [preventivi, searchTerm, dealerFilter, statusFilter, dateFrom, dateTo]);

  // KPI stats (from ALL preventivi, not filtered)
  const stats = useMemo(() => {
    if (!preventivi) return { total: 0, value: 0, valid: 0, expired: 0, avgTicket: 0 };
    const total = preventivi.length;
    const value = preventivi.reduce((sum, p) => sum + Number(p.importo_totale), 0);
    const expired = preventivi.filter((p) => isNonValido(p.data_scadenza_preventivo)).length;
    const valid = total - expired;
    const avgTicket = total > 0 ? value / total : 0;
    return { total, value, valid, expired, avgTicket };
  }, [preventivi]);

  const convertMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("orders")
        .update({ stato: "da_confermare" as any })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Preventivo convertito in ordine con successo" });
      queryClient.invalidateQueries({ queryKey: ["dealer-preventivi"] });
      queryClient.invalidateQueries({ queryKey: ["dealer-order-stats"] });
      setConvertId(null);
    },
    onError: () => {
      toast({ title: "Errore nella conversione del preventivo", variant: "destructive" });
    },
  });

  const handleDuplicate = async (id: string) => {
    setIsDuplicating(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("dealer_id, note_rivenditore, note_interna, data_consegna_prevista, cliente_finale_id")
        .eq("id", id)
        .single();
      if (orderError) throw orderError;

      const { data: lines, error: linesError } = await supabase
        .from("order_lines")
        .select("categoria, descrizione, quantita, prezzo_unitario, sconto, iva")
        .eq("ordine_id", id);
      if (linesError) throw linesError;

      let clientData: PreventivoDefaultValues = {};
      if (order.cliente_finale_id) {
        const { data: client } = await supabase
          .from("clients")
          .select("nome, cognome, email, telefono, indirizzo")
          .eq("id", order.cliente_finale_id)
          .single();
        if (client) {
          clientData = {
            cliente_nome: client.nome || "",
            cliente_cognome: client.cognome || "",
            cliente_email: client.email || "",
            cliente_telefono: client.telefono || "",
            cliente_indirizzo: client.indirizzo || "",
          };
        }
      }

      setDuplicateData({
        dealer_id: order.dealer_id,
        note_rivenditore: order.note_rivenditore || "",
        note_interna: order.note_interna || "",
        ...clientData,
        order_lines: lines?.map(l => ({
          categoria: l.categoria,
          descrizione: l.descrizione,
          quantita: l.quantita,
          prezzo_unitario: Number(l.prezzo_unitario),
          sconto: Number(l.sconto),
          iva: Number(l.iva),
        })) || [],
      });
      setPreventivoDialogOpen(true);
    } catch {
      toast({ title: "Errore nel caricamento dei dati per la duplicazione", variant: "destructive" });
    } finally {
      setIsDuplicating(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setPreventivoDialogOpen(open);
    if (!open) setDuplicateData(undefined);
  };

  const basePath = dealerId ? `/rivenditori/${dealerId}/area` : "";

  const hasActiveFilters = searchTerm || dealerFilter !== "tutti" || statusFilter !== "tutti" || dateFrom || dateTo;

  const resetFilters = () => {
    setSearchTerm("");
    setDealerFilter("tutti");
    setStatusFilter("tutti");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Preventivi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestisci i tuoi preventivi e convertili in ordini
          </p>
        </div>
        {canManage && (
          <Button onClick={() => { setDuplicateData(undefined); setPreventivoDialogOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Nuovo Preventivo
          </Button>
        )}
      </div>

      {/* KPI Cards */}
      {!isLoading && preventivi && preventivi.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Totale</span>
              </div>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-accent-foreground/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Euro className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Valore</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(stats.value)}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-chart-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CheckCircle2 className="h-4 w-4 text-chart-2" />
                <span className="text-xs font-medium uppercase tracking-wide">Validi</span>
              </div>
              <p className="text-2xl font-bold text-chart-2">{stats.valid}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <XCircle className="h-4 w-4 text-destructive" />
                <span className="text-xs font-medium uppercase tracking-wide">Non Validi</span>
              </div>
              <p className="text-2xl font-bold text-destructive">{stats.expired}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      {!isLoading && preventivi && preventivi.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca per ID o rivenditore..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            {!dealerId && dealerOptions.length > 1 && (
              <Select value={dealerFilter} onValueChange={setDealerFilter}>
                <SelectTrigger className="w-full sm:w-[220px]">
                  <SelectValue placeholder="Tutti i rivenditori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutti">Tutti i rivenditori</SelectItem>
                  {dealerOptions.map(([id, name]) => (
                    <SelectItem key={id} value={id}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className={cn("justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "dd MMM yyyy", { locale: it }) : "Da"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                  locale={it}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className={cn("justify-start text-left font-normal", !dateTo && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "dd MMM yyyy", { locale: it }) : "A"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                  locale={it}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(["tutti", "validi", "non_validi"] as StatusFilter[]).map((s) => (
              <Button
                key={s}
                variant={statusFilter === s ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(s)}
              >
                {s === "tutti" && "Tutti"}
                {s === "validi" && (
                  <><CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />Validi</>
                )}
                {s === "non_validi" && (
                  <><AlertTriangle className="h-3.5 w-3.5 mr-1.5" />Non Validi</>
                )}
              </Button>
            ))}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground"
              >
                Cancella filtri
              </Button>
            )}
            <span className="ml-auto text-sm text-muted-foreground">
              {filteredPreventivi.length} preventiv{filteredPreventivi.length === 1 ? "o" : "i"}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : filteredPreventivi.length > 0 ? (
        <>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredPreventivi.map((p) => {
              const expired = isNonValido(p.data_scadenza_preventivo);
              const dealerName = (p.dealers as any)?.ragione_sociale;
              return (
                <Card
                  key={p.id}
                  className={cn(
                    "cursor-pointer hover:shadow-md transition-shadow border-l-4",
                    expired
                      ? "border-l-destructive bg-destructive/5"
                      : "border-l-chart-2"
                  )}
                  onClick={() => navigate(`${basePath}/ordini/${p.id}`)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-medium">{p.id}</span>
                      {expired ? (
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          <AlertTriangle className="h-3 w-3 mr-1" />Non Valido
                        </Badge>
                      ) : (
                        <Badge className="text-xs bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />Valido
                        </Badge>
                      )}
                    </div>
                    {dealerName && !dealerId && (
                      <p className="text-sm text-muted-foreground">{dealerName}</p>
                    )}
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
                    {canManage && (
                      <div className="flex gap-2">
                        <Button
                          size="sm" variant="outline" className="flex-1"
                          disabled={isDuplicating}
                          onClick={(e) => { e.stopPropagation(); handleDuplicate(p.id); }}
                        >
                          <Copy className="h-4 w-4 mr-2" />Duplica
                        </Button>
                        <Button
                          size="sm" className="flex-1"
                          onClick={(e) => { e.stopPropagation(); setConvertId(p.id); }}
                        >
                          <ArrowRightCircle className="h-4 w-4 mr-2" />Converti
                        </Button>
                      </div>
                    )}
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
                    {!dealerId && <TableHead>Rivenditore</TableHead>}
                    <TableHead>Data Creazione</TableHead>
                    <TableHead>Importo Totale</TableHead>
                    <TableHead>Scadenza</TableHead>
                    <TableHead>Stato</TableHead>
                    {canManage && <TableHead className="text-right">Azioni</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPreventivi.map((p) => {
                    const expired = isExpired(p.data_scadenza_preventivo);
                    const dealerName = (p.dealers as any)?.ragione_sociale;
                    return (
                      <TableRow
                        key={p.id}
                        className={cn(
                          "cursor-pointer",
                          expired
                            ? "bg-destructive/5 hover:bg-destructive/10"
                            : "hover:bg-chart-2/5"
                        )}
                        onClick={() => navigate(`${basePath}/ordini/${p.id}`)}
                      >
                        <TableCell className="font-mono font-medium">{p.id}</TableCell>
                        {!dealerId && <TableCell>{dealerName || "—"}</TableCell>}
                        <TableCell>{formatDate(p.data_inserimento)}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(Number(p.importo_totale))}</TableCell>
                        <TableCell className={expired ? "text-destructive font-medium" : ""}>
                          {p.data_scadenza_preventivo ? formatDate(p.data_scadenza_preventivo) : "—"}
                        </TableCell>
                        <TableCell>
                          {expired ? (
                            <Badge variant="destructive" className="animate-pulse">
                              <AlertTriangle className="h-3 w-3 mr-1" />Scaduto
                            </Badge>
                          ) : (
                            <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/20">
                              <CheckCircle2 className="h-3 w-3 mr-1" />Valido
                            </Badge>
                          )}
                        </TableCell>
                        {canManage && (
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`${basePath}/ordini/${p.id}`); }}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" disabled={isDuplicating} onClick={(e) => { e.stopPropagation(); handleDuplicate(p.id); }}>
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button size="sm" onClick={(e) => { e.stopPropagation(); setConvertId(p.id); }}>
                                <ArrowRightCircle className="h-4 w-4 mr-1" />Converti
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : preventivi && preventivi.length > 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground font-medium">Nessun risultato</p>
            <p className="text-sm text-muted-foreground mt-1">Prova a modificare i filtri di ricerca</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>
              Cancella filtri
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground font-medium">Nessun preventivo</p>
            <p className="text-sm text-muted-foreground mt-1">
              {canManage
                ? "I preventivi appariranno qui quando verranno creati"
                : "I preventivi verranno creati dal tuo commerciale di riferimento"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Preventivo Dialog */}
      {canManage && (
        <NewPreventivoDialog
          open={preventivoDialogOpen}
          onOpenChange={handleDialogClose}
          defaultDealerId={dealerId}
          defaultValues={duplicateData}
        />
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
