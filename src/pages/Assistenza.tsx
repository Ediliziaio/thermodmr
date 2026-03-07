import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Headphones, Loader2 } from "lucide-react";
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

export default function Assistenza() {
  const [statoFilter, setStatoFilter] = useState<string>("");
  const [prioritaFilter, setPrioritaFilter] = useState<string>("");
  const [selectedTicket, setSelectedTicket] = useState<{
    id: string;
    oggetto: string;
    stato: string;
    ordine_id: string;
  } | null>(null);

  const { data: tickets = [], isLoading } = useAllTickets({
    stato: statoFilter || undefined,
    priorita: prioritaFilter || undefined,
  });

  const openCount = tickets.filter((t) => t.stato !== "chiuso").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Headphones className="h-6 w-6" />
            Assistenza
            {openCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {openCount} aperti
              </Badge>
            )}
          </h1>
          <p className="text-sm text-muted-foreground">
            Gestisci i ticket di assistenza dei rivenditori
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <Select value={statoFilter} onValueChange={(v) => setStatoFilter(v === "all" ? "" : v)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Tutti gli stati" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti gli stati</SelectItem>
            {TICKET_STATI.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={prioritaFilter} onValueChange={(v) => setPrioritaFilter(v === "all" ? "" : v)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Tutte le priorità" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le priorità</SelectItem>
            {TICKET_PRIORITA.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(statoFilter || prioritaFilter) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatoFilter("");
              setPrioritaFilter("");
            }}
          >
            Azzera filtri
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Nessun ticket trovato.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Oggetto</TableHead>
                  <TableHead>Ordine</TableHead>
                  <TableHead>Rivenditore</TableHead>
                  <TableHead>Priorità</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
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
