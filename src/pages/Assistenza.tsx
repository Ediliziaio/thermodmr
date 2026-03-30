import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Headphones, Loader2, Search, ArrowUp, ArrowDown, ArrowUpDown, AlertCircle, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { useAllTickets } from "@/hooks/useTickets";
import { TicketDetailDialog } from "@/components/tickets/TicketDetailDialog";
import {
  TICKET_STATI,
  TICKET_PRIORITA,
  getTicketStatoLabel,
  getTicketStatoColor,
  getTicketPrioritaLabel,
  getTicketPrioritaColor,
} from "@/lib/ticketConstants";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Assistenza() {
  const [statoFilter, setStatoFilter] = useState<string>("");
  const [prioritaFilter, setPrioritaFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'created_at',
    direction: 'desc',
  });
  const [selectedTicket, setSelectedTicket] = useState<{
    id: string;
    oggetto: string;
    stato: string;
    ordine_id: string;
  } | null>(null);

  const isMobile = useIsMobile();
  const { t } = useLanguage();

  // Filtered tickets for the table
  const { data: tickets = [], isLoading } = useAllTickets({
    stato: statoFilter || undefined,
    priorita: prioritaFilter || undefined,
    search: searchQuery || undefined,
  });

  // Global stats — always unfiltered to show real KPIs regardless of active filters
  const { data: allTicketsForStats = [] } = useAllTickets({ limit: 500 });

  // Sort tickets client-side
  const sortedTickets = useMemo(() => {
    return [...tickets].sort((a, b) => {
      const { key, direction } = sortConfig;
      const mult = direction === 'asc' ? 1 : -1;
      
      switch (key) {
        case 'oggetto': return a.oggetto.localeCompare(b.oggetto, 'it') * mult;
        case 'priorita': {
          const order = { urgente: 0, alta: 1, normale: 2, bassa: 3 };
          return ((order[a.priorita as keyof typeof order] ?? 9) - (order[b.priorita as keyof typeof order] ?? 9)) * mult;
        }
        case 'stato': return a.stato.localeCompare(b.stato, 'it') * mult;
        case 'created_at': return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * mult;
        default: return 0;
      }
    });
  }, [tickets, sortConfig]);

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

  // KPI stats — use unfiltered dataset so cards always show global numbers
  const stats = useMemo(() => {
    const open = allTicketsForStats.filter(t => t.stato === "aperto").length;
    const inProgress = allTicketsForStats.filter(t => t.stato === "in_gestione").length;
    const closed = allTicketsForStats.filter(t => t.stato === "chiuso").length;
    const urgent = allTicketsForStats.filter(t => t.priorita === "urgente" || t.priorita === "alta").length;
    return { open, inProgress, closed, urgent };
  }, [allTicketsForStats]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Headphones className="h-6 w-6" />
            {t.area.assistenza.titolo}
            {stats.open > 0 && (
              <Badge variant="destructive" className="ml-2">
                {stats.open} {t.area.assistenza.aperti}
              </Badge>
            )}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.area.assistenza.desc}
          </p>
        </div>
      </div>

      {/* KPI Mini Dashboard */}
      <div className={cn(
        isMobile ? "overflow-x-auto -mx-4 px-4" : ""
      )}>
        <div className={cn(
          isMobile ? "flex gap-3 pb-3" : "grid gap-3 grid-cols-4"
        )} style={isMobile ? { minWidth: 'max-content' } : undefined}>
          <Card className={cn("border-l-4 border-l-destructive", isMobile && "min-w-[140px]")}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <AlertCircle className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{t.area.assistenza.aperti}</span>
              </div>
              <p className="text-xl font-bold">{stats.open}</p>
            </CardContent>
          </Card>
          <Card className={cn("border-l-4 border-l-primary", isMobile && "min-w-[140px]")}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{t.area.assistenza.inGestione}</span>
              </div>
              <p className="text-xl font-bold">{stats.inProgress}</p>
            </CardContent>
          </Card>
          <Card className={cn("border-l-4 border-l-chart-2", isMobile && "min-w-[140px]")}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{t.area.assistenza.chiusi}</span>
              </div>
              <p className="text-xl font-bold">{stats.closed}</p>
            </CardContent>
          </Card>
          <Card className={cn("border-l-4 border-l-orange-500", isMobile && "min-w-[140px]")}>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{t.area.assistenza.urgenti}</span>
              </div>
              <p className="text-xl font-bold">{stats.urgent}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.area.assistenza.cercaOggetto}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={statoFilter} onValueChange={(v) => setStatoFilter(v === "all" ? "" : v)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={t.area.assistenza.tuttiStati} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.area.assistenza.tuttiStati}</SelectItem>
            {TICKET_STATI.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={prioritaFilter} onValueChange={(v) => setPrioritaFilter(v === "all" ? "" : v)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={t.area.assistenza.tuttePriorita} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.area.assistenza.tuttePriorita}</SelectItem>
            {TICKET_PRIORITA.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(statoFilter || prioritaFilter || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatoFilter("");
              setPrioritaFilter("");
              setSearchQuery("");
            }}
          >
            {t.area.assistenza.azzeraFiltri}
          </Button>
        )}
      </div>

      {/* Mobile Cards / Desktop Table */}
      {isMobile ? (
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : sortedTickets.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {t.area.assistenza.nessunoTrovato}
            </div>
          ) : (
            sortedTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() =>
                  setSelectedTicket({
                    id: ticket.id,
                    oggetto: ticket.oggetto,
                    stato: ticket.stato,
                    ordine_id: ticket.ordine_id,
                  })
                }
              >
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm leading-tight">{ticket.oggetto}</p>
                    <Badge className={getTicketStatoColor(ticket.stato)} size-sm>
                      {getTicketStatoLabel(ticket.stato)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>#{ticket.ordine_id}</span>
                    <span>{ticket.orders?.dealers?.ragione_sociale || "N/D"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      className={getTicketPrioritaColor(ticket.priorita)}
                      variant="outline"
                    >
                      {getTicketPrioritaLabel(ticket.priorita)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(ticket.created_at), "dd MMM yyyy", { locale: it })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : sortedTickets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {t.area.assistenza.nessunoTrovato}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('oggetto')}>
                      <span className="flex items-center">{t.area.assistenza.oggetto} <SortIcon columnKey="oggetto" /></span>
                    </TableHead>
                    <TableHead>{t.area.assistenza.ordine}</TableHead>
                    <TableHead>{t.area.assistenza.rivenditore}</TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('priorita')}>
                      <span className="flex items-center">{t.area.assistenza.priorita} <SortIcon columnKey="priorita" /></span>
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('stato')}>
                      <span className="flex items-center">{t.area.assistenza.stato} <SortIcon columnKey="stato" /></span>
                    </TableHead>
                    <TableHead className="cursor-pointer select-none" onClick={() => handleSort('created_at')}>
                      <span className="flex items-center">{t.area.assistenza.data} <SortIcon columnKey="created_at" /></span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTickets.map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      className="cursor-pointer hover:bg-accent/50"
                      onClick={() =>
                        setSelectedTicket({
                          id: ticket.id,
                          oggetto: ticket.oggetto,
                          stato: ticket.stato,
                          ordine_id: ticket.ordine_id,
                        })
                      }
                    >
                      <TableCell className="font-medium">{ticket.oggetto}</TableCell>
                      <TableCell className="text-muted-foreground">
                        #{ticket.ordine_id}
                      </TableCell>
                      <TableCell>
                        {ticket.orders?.dealers?.ragione_sociale || "N/D"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getTicketPrioritaColor(ticket.priorita)}
                          variant="outline"
                        >
                          {getTicketPrioritaLabel(ticket.priorita)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTicketStatoColor(ticket.stato)}>
                          {getTicketStatoLabel(ticket.stato)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(ticket.created_at), "dd MMM yyyy", {
                          locale: it,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      {/* Truncation warning */}
      {tickets.length >= 100 && (
        <div className="flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground bg-muted/50 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <span>{t.area.assistenza.primiCento}</span>
        </div>
      )}

      {selectedTicket && (
        <TicketDetailDialog
          ticketId={selectedTicket.id}
          open={!!selectedTicket}
          onOpenChange={(open) => !open && setSelectedTicket(null)}
          ticketInfo={selectedTicket}
        />
      )}
    </div>
  );
}
