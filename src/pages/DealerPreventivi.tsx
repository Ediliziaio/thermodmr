import { useState, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  FileText, ArrowRightCircle, Eye, AlertTriangle, CheckCircle2, Plus, Copy,
  Search, BarChart3, Euro, Clock, XCircle, CalendarIcon, ChevronDown, Trash2, X,
  ArrowUp, ArrowDown, ArrowUpDown,
} from "lucide-react";
import { format, subDays, addDays } from "date-fns";
import { it } from "date-fns/locale";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { generateOrderId } from "@/hooks/useOrders";
import { useAuth } from "@/contexts/AuthContext";
import { NewPreventivoDialog, type PreventivoDefaultValues } from "@/components/orders/NewPreventivoDialog";
import { useLanguage } from "@/i18n/LanguageContext";

interface DealerPreventiviProps {
  dealerId?: string;
  readOnly?: boolean;
}

type StatusFilter = "tutti" | "validi" | "non_validi";

const isNonValido = (date: string | null) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

export default function DealerPreventivi({ dealerId, readOnly = false }: DealerPreventiviProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userRole } = useAuth();
  const { t } = useLanguage();
  const canManage = !readOnly && (userRole === "super_admin" || userRole === "commerciale");
  const [convertId, setConvertId] = useState<string | null>(null);
  const [preventivoDialogOpen, setPreventivoDialogOpen] = useState(false);
  const [duplicateData, setDuplicateData] = useState<PreventivoDefaultValues | undefined>(undefined);
  const [isDuplicating, setIsDuplicating] = useState(false);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkConvertOpen, setBulkConvertOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [dealerFilter, setDealerFilter] = useState<string>("tutti");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("tutti");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  // Sort state
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'data_inserimento',
    direction: 'desc',
  });

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown className="h-3 w-3 ml-1 text-muted-foreground/50" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-3 w-3 ml-1" /> 
      : <ArrowDown className="h-3 w-3 ml-1" />;
  };

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

      const { data, error } = await query
        .order("data_inserimento", { ascending: false })
        .limit(500);
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
    }).sort((a, b) => {
      const { key, direction } = sortConfig;
      const mult = direction === 'asc' ? 1 : -1;
      
      const getVal = (p: any) => {
        switch (key) {
          case 'id': return p.id || '';
          case 'dealer': return (p.dealers as any)?.ragione_sociale || '';
          case 'data_inserimento': return p.data_inserimento || '';
          case 'importo_totale': return Number(p.importo_totale) || 0;
          case 'data_scadenza_preventivo': return p.data_scadenza_preventivo || '';
          case 'stato': return isNonValido(p.data_scadenza_preventivo) ? 1 : 0;
          default: return '';
        }
      };
      
      const va = getVal(a);
      const vb = getVal(b);
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * mult;
      return String(va).localeCompare(String(vb), 'it') * mult;
    });
  }, [preventivi, searchTerm, dealerFilter, statusFilter, dateFrom, dateTo, sortConfig]);

  // KPI stats (dynamically based on active filters)
  const stats = useMemo(() => {
    if (!filteredPreventivi) return { total: 0, value: 0, valid: 0, expired: 0, avgTicket: 0 };
    const total = filteredPreventivi.length;
    const value = filteredPreventivi.reduce((sum, p) => sum + Number(p.importo_totale), 0);
    const expired = filteredPreventivi.filter((p) => isNonValido(p.data_scadenza_preventivo)).length;
    const valid = total - expired;
    const avgTicket = total > 0 ? value / total : 0;
    return { total, value, valid, expired, avgTicket };
  }, [filteredPreventivi]);

  // --- Mutations ---

  const convertMutation = useMutation({
    mutationFn: async (preventivoId: string) => {
      // Generate new order ID
      const newOrderId = await generateOrderId();
      
      // Update: new ID, status, and save old preventivo ID as reference
      const { error } = await supabase
        .from("orders")
        .update({
          id: newOrderId,
          stato: "da_confermare" as any,
          riferimento_preventivo: preventivoId,
        })
        .eq("id", preventivoId);
      if (error) throw error;
      return newOrderId;
    },
    onSuccess: (newOrderId) => {
      toast({ title: t.area.preventivi.convertito, description: `Nuovo ID: ${newOrderId}` });
      queryClient.invalidateQueries({ queryKey: ["dealer-preventivi"] });
      queryClient.invalidateQueries({ queryKey: ["dealer-order-stats"] });
      queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["orders-kpi"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
      setConvertId(null);
    },
    onError: () => {
      toast({ title: t.area.preventivi.erroreConversione, variant: "destructive" });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ ids, makeValid }: { ids: string[]; makeValid: boolean }) => {
      const newDate = makeValid
        ? format(addDays(new Date(), 30), "yyyy-MM-dd")
        : format(subDays(new Date(), 1), "yyyy-MM-dd");
      
      const { error } = await supabase
        .from("orders")
        .update({ data_scadenza_preventivo: newDate })
        .in("id", ids);
      if (error) throw error;
    },
    onSuccess: (_, { makeValid }) => {
      toast({ title: `Preventiv${selectedIds.size === 1 ? t.area.preventivi.aggiornato : t.area.preventivi.aggiornatoPlur} a "${makeValid ? t.area.preventivi.valido : t.area.preventivi.nonValido}"` });
      queryClient.invalidateQueries({ queryKey: ["dealer-preventivi"] });
      setSelectedIds(new Set());
    },
    onError: () => {
      toast({ title: t.area.preventivi.erroreAggiornamentoStato, variant: "destructive" });
    },
  });

  const bulkConvertMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      // Use allSettled so partial failures don't abort the whole batch
      const results = await Promise.allSettled(
        ids.map(async (preventivoId) => {
          const newOrderId = await generateOrderId();
          const { error } = await supabase
            .from("orders")
            .update({
              id: newOrderId,
              stato: "da_confermare" as any,
              riferimento_preventivo: preventivoId,
            })
            .eq("id", preventivoId);
          if (error) throw error;
          return newOrderId;
        })
      );
      const succeeded = results.filter(r => r.status === "fulfilled").length;
      const failed = results.filter(r => r.status === "rejected").length;
      return { succeeded, failed };
    },
    onSuccess: ({ succeeded, failed }) => {
      if (succeeded > 0) {
        toast({
          title: `${succeeded} preventiv${succeeded === 1 ? t.area.preventivi.preventiviConvertiti + "o" : t.area.preventivi.preventiviConvertiti + "i"} in ordini`,
          description: failed > 0 ? `${failed} ${t.area.preventivi.nonConvertitiPerErrore}` : undefined,
          variant: failed > 0 ? "destructive" : "default",
        });
        queryClient.invalidateQueries({ queryKey: ["dealer-preventivi"] });
        queryClient.invalidateQueries({ queryKey: ["dealer-order-stats"] });
        queryClient.invalidateQueries({ queryKey: ["orders-infinite"] });
        queryClient.invalidateQueries({ queryKey: ["orders-kpi"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
      } else {
        toast({ title: t.area.preventivi.erroreNessunoConvertito, variant: "destructive" });
      }
      setSelectedIds(new Set());
      setBulkConvertOpen(false);
    },
    onError: () => {
      toast({ title: t.area.preventivi.erroreConversione, variant: "destructive" });
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      // Delete order lines first, then orders
      const { error: linesError } = await supabase
        .from("order_lines")
        .delete()
        .in("ordine_id", ids);
      if (linesError) throw linesError;

      const { error } = await supabase
        .from("orders")
        .delete()
        .in("id", ids);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: `${selectedIds.size} preventiv${selectedIds.size === 1 ? t.area.preventivi.eliminato : t.area.preventivi.eliminati}` });
      queryClient.invalidateQueries({ queryKey: ["dealer-preventivi"] });
      queryClient.invalidateQueries({ queryKey: ["dealer-order-stats"] });
      queryClient.invalidateQueries({ queryKey: ["orders-kpi"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-kpis"] });
      setSelectedIds(new Set());
      setBulkDeleteOpen(false);
    },
    onError: () => {
      toast({ title: t.area.preventivi.erroreEliminazione, variant: "destructive" });
    },
  });

  // --- Selection helpers ---

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredPreventivi.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredPreventivi.map((p) => p.id)));
    }
  };

  const handleSingleStatusChange = (id: string, makeValid: boolean) => {
    updateStatusMutation.mutate({ ids: [id], makeValid });
  };

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
      toast({ title: t.area.preventivi.erroreCaricamentoDuplicazione, variant: "destructive" });
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

  const isAllSelected = filteredPreventivi.length > 0 && selectedIds.size === filteredPreventivi.length;
  const isSomeSelected = selectedIds.size > 0 && selectedIds.size < filteredPreventivi.length;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{readOnly ? t.area.preventivi.titolo_dealer : t.area.preventivi.titolo_super}</h1>
         <p className="text-sm text-muted-foreground mt-1">
            {readOnly ? t.area.preventivi.desc_dealer : t.area.preventivi.desc_super}
          </p>
        </div>
        {canManage && (
          <Button onClick={() => { setDuplicateData(undefined); setPreventivoDialogOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            {t.area.preventivi.nuovoPreventivo}
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
                <span className="text-xs font-medium uppercase tracking-wide">{t.area.preventivi.totaleKpi}</span>
              </div>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-accent-foreground/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Euro className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wide">{t.area.preventivi.valoreKpi}</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(stats.value)}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-chart-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CheckCircle2 className="h-4 w-4 text-chart-2" />
                <span className="text-xs font-medium uppercase tracking-wide">{t.area.preventivi.validiKpi}</span>
              </div>
              <p className="text-2xl font-bold text-chart-2">{stats.valid}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <XCircle className="h-4 w-4 text-destructive" />
                <span className="text-xs font-medium uppercase tracking-wide">{t.area.preventivi.nonValidiKpi}</span>
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
                placeholder={t.area.preventivi.cerca}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            {!dealerId && dealerOptions.length > 1 && (
              <Select value={dealerFilter} onValueChange={setDealerFilter}>
                <SelectTrigger className="w-full sm:w-[220px]">
                  <SelectValue placeholder={t.area.preventivi.tuttiRivenditori} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutti">{t.area.preventivi.tuttiRivenditori}</SelectItem>
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
                  {dateFrom ? format(dateFrom, "dd MMM yyyy", { locale: it }) : t.area.preventivi.da}
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
                  {dateTo ? format(dateTo, "dd MMM yyyy", { locale: it }) : t.area.preventivi.a}
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
                {s === "tutti" && t.area.preventivi.tutti}
                {s === "validi" && (
                  <><CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />{t.area.preventivi.validiKpi}</>
                )}
                {s === "non_validi" && (
                  <><AlertTriangle className="h-3.5 w-3.5 mr-1.5" />{t.area.preventivi.nonValidiKpi}</>
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
                {t.area.common.azzeraFiltri}
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
              const isSelected = selectedIds.has(p.id);
              return (
                <Card
                  key={p.id}
                  className={cn(
                    "cursor-pointer hover:shadow-md transition-shadow border-l-4",
                    isSelected && "ring-2 ring-primary",
                    expired
                      ? "border-l-destructive bg-destructive/5"
                      : "border-l-chart-2"
                  )}
                  onClick={() => navigate(`${basePath}/ordini/${p.id}`)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {canManage && (
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleSelect(p.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                        <span className="font-mono text-sm font-medium">{p.id}</span>
                      </div>
                      {canManage ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-7 px-2 gap-1">
                              {expired ? (
                                <Badge variant="destructive" className="text-xs">
                                  <AlertTriangle className="h-3 w-3 mr-1" />{t.area.preventivi.nonValido}
                                </Badge>
                              ) : (
                                <Badge className="text-xs bg-chart-2/10 text-chart-2 border-chart-2/20">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />{t.area.preventivi.valido}
                                </Badge>
                              )}
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem onClick={() => handleSingleStatusChange(p.id, true)} disabled={!expired}>
                              <CheckCircle2 className="h-4 w-4 mr-2 text-chart-2" />{t.area.preventivi.impostaValido}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSingleStatusChange(p.id, false)} disabled={expired}>
                              <XCircle className="h-4 w-4 mr-2 text-destructive" />{t.area.preventivi.impostaNonValido}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setConvertId(p.id)}>
                              <ArrowRightCircle className="h-4 w-4 mr-2" />{t.area.preventivi.convertiInOrdine}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        expired ? (
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            <AlertTriangle className="h-3 w-3 mr-1" />{t.area.preventivi.nonValido}
                          </Badge>
                        ) : (
                          <Badge className="text-xs bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/20">
                            <CheckCircle2 className="h-3 w-3 mr-1" />{t.area.preventivi.valido}
                          </Badge>
                        )
                      )}
                    </div>
                    {dealerName && !dealerId && (
                      <p className="text-sm text-muted-foreground">{dealerName}</p>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">{t.area.preventivi.importoTotale}</p>
                        <p className="font-medium">{formatCurrency(Number(p.importo_totale))}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">{t.area.preventivi.dataCreazione}</p>
                        <p>{formatDate(p.data_inserimento)}</p>
                      </div>
                      {p.data_scadenza_preventivo && (
                        <div className="col-span-2">
                          <p className="text-muted-foreground text-xs">{t.area.preventivi.scadenza}</p>
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
                          <Copy className="h-4 w-4 mr-2" />{t.area.preventivi.duplica}
                        </Button>
                        <Button
                          size="sm" className="flex-1"
                          onClick={(e) => { e.stopPropagation(); setConvertId(p.id); }}
                        >
                          <ArrowRightCircle className="h-4 w-4 mr-2" />{t.area.preventivi.converti}
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
                    {canManage && (
                      <TableHead className="w-12">
                        <Checkbox
                          checked={isAllSelected}
                          ref={(el) => {
                            if (el) (el as any).indeterminate = isSomeSelected;
                          }}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                    )}
                    {[
                      { key: 'id', label: t.area.preventivi.idPreventivo },
                      ...(!dealerId ? [{ key: 'dealer', label: t.area.preventivi.rivenditore }] : []),
                      { key: 'data_inserimento', label: t.area.preventivi.dataCreazione },
                      { key: 'importo_totale', label: t.area.preventivi.importoTotale },
                      { key: 'data_scadenza_preventivo', label: t.area.preventivi.scadenza },
                      { key: 'stato', label: t.area.preventivi.stato },
                    ].map(col => (
                      <TableHead
                        key={col.key}
                        className="cursor-pointer select-none hover:text-foreground transition-colors"
                        onClick={() => handleSort(col.key)}
                      >
                        <span className="inline-flex items-center">
                          {col.label}
                          <SortIcon columnKey={col.key} />
                        </span>
                      </TableHead>
                    ))}
                    {canManage && <TableHead className="text-right">{t.area.preventivi.azioni}</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPreventivi.map((p) => {
                    const expired = isNonValido(p.data_scadenza_preventivo);
                    const dealerName = (p.dealers as any)?.ragione_sociale;
                    const isSelected = selectedIds.has(p.id);
                    return (
                      <TableRow
                        key={p.id}
                        className={cn(
                          "cursor-pointer",
                          isSelected && "bg-primary/5",
                          expired
                            ? "bg-destructive/5 hover:bg-destructive/10"
                            : "hover:bg-chart-2/5"
                        )}
                        onClick={() => navigate(`${basePath}/ordini/${p.id}`)}
                      >
                        {canManage && (
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleSelect(p.id)}
                            />
                          </TableCell>
                        )}
                        <TableCell className="font-mono font-medium">{p.id}</TableCell>
                        {!dealerId && <TableCell>{dealerName || "—"}</TableCell>}
                        <TableCell>{formatDate(p.data_inserimento)}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(Number(p.importo_totale))}</TableCell>
                        <TableCell className={expired ? "text-destructive font-medium" : ""}>
                          {p.data_scadenza_preventivo ? formatDate(p.data_scadenza_preventivo) : "—"}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          {canManage ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 px-2 gap-1">
                                  {expired ? (
                                    <Badge variant="destructive">
                                      <AlertTriangle className="h-3 w-3 mr-1" />{t.area.preventivi.nonValido}
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                                      <CheckCircle2 className="h-3 w-3 mr-1" />{t.area.preventivi.valido}
                                    </Badge>
                                  )}
                                  <ChevronDown className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => handleSingleStatusChange(p.id, true)} disabled={!expired}>
                                  <CheckCircle2 className="h-4 w-4 mr-2 text-chart-2" />{t.area.preventivi.impostaValido}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSingleStatusChange(p.id, false)} disabled={expired}>
                                  <XCircle className="h-4 w-4 mr-2 text-destructive" />{t.area.preventivi.impostaNonValido}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setConvertId(p.id)}>
                                  <ArrowRightCircle className="h-4 w-4 mr-2" />{t.area.preventivi.convertiInOrdine}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            expired ? (
                              <Badge variant="destructive" className="animate-pulse">
                                <AlertTriangle className="h-3 w-3 mr-1" />{t.area.preventivi.nonValido}
                              </Badge>
                            ) : (
                              <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/20">
                                <CheckCircle2 className="h-3 w-3 mr-1" />{t.area.preventivi.valido}
                              </Badge>
                            )
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
                                <ArrowRightCircle className="h-4 w-4 mr-1" />{t.area.preventivi.converti}
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
            <p className="text-muted-foreground font-medium">{t.area.preventivi.nessunRisultato}</p>
            <p className="text-sm text-muted-foreground mt-1">{t.area.preventivi.provaModificareFiltri}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>
              {t.area.common.azzeraFiltri}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground font-medium">{t.area.preventivi.titolo_super}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {canManage
                ? t.area.preventivi.nessunoCreato
                : t.area.preventivi.nessunoCreatoDealer}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Floating Bulk Action Bar */}
      {canManage && selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-background border rounded-lg shadow-lg p-3 flex items-center gap-3 flex-wrap max-w-[95vw]">
          <span className="text-sm font-medium whitespace-nowrap">
            {selectedIds.size} {t.area.common.selezionati}
          </span>
          <div className="h-6 w-px bg-border" />
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateStatusMutation.mutate({ ids: Array.from(selectedIds), makeValid: true })}
            disabled={updateStatusMutation.isPending}
          >
            <CheckCircle2 className="h-4 w-4 mr-1.5 text-chart-2" />{t.area.preventivi.valido}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateStatusMutation.mutate({ ids: Array.from(selectedIds), makeValid: false })}
            disabled={updateStatusMutation.isPending}
          >
            <XCircle className="h-4 w-4 mr-1.5 text-destructive" />{t.area.preventivi.nonValido}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setBulkConvertOpen(true)}
            disabled={bulkConvertMutation.isPending}
          >
            <ArrowRightCircle className="h-4 w-4 mr-1.5" />{t.area.preventivi.converti}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setBulkDeleteOpen(true)}
            disabled={bulkDeleteMutation.isPending}
          >
            <Trash2 className="h-4 w-4 mr-1.5" />{t.area.common.elimina}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedIds(new Set())}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
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

      {/* Confirm Conversion Dialog (single) */}
      <AlertDialog open={!!convertId} onOpenChange={() => setConvertId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.area.preventivi.convertiTitolo}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.area.preventivi.convertiDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.area.common.annulla}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => convertId && convertMutation.mutate(convertId)}
              disabled={convertMutation.isPending}
            >
              {convertMutation.isPending ? t.area.preventivi.conversioneLoading : t.area.preventivi.confermaConversioneBtn}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Convert Dialog */}
      <AlertDialog open={bulkConvertOpen} onOpenChange={setBulkConvertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.area.preventivi.convertiBulkTitolo}{selectedIds.size === 1 ? "o" : "i"} ({selectedIds.size})</AlertDialogTitle>
            <AlertDialogDescription>
              {t.area.preventivi.convertiBulkDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.area.common.annulla}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => bulkConvertMutation.mutate(Array.from(selectedIds))}
              disabled={bulkConvertMutation.isPending}
            >
              {bulkConvertMutation.isPending ? t.area.preventivi.conversioneLoading : t.area.preventivi.confermaConversioneBtn}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Dialog */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              {t.area.preventivi.eliminaBulkTitolo}{selectedIds.size === 1 ? "o" : "i"} ({selectedIds.size})
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t.area.preventivi.eliminaBulkDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.area.common.annulla}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => bulkDeleteMutation.mutate(Array.from(selectedIds))}
              disabled={bulkDeleteMutation.isPending}
            >
              {bulkDeleteMutation.isPending ? t.area.common.caricamento : t.area.preventivi.elimina}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
