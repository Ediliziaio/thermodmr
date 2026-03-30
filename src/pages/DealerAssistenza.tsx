import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Headphones, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import type { SupportTicket } from "@/hooks/useTickets";
import { useLanguage } from "@/i18n/LanguageContext";

interface DealerAssistenzaProps {
  dealerId?: string;
}

export default function DealerAssistenza({ dealerId }: DealerAssistenzaProps) {
  const { t } = useLanguage();
  const [statoFilter, setStatoFilter] = useState<string>("");
  const [selectedTicket, setSelectedTicket] = useState<{
    id: string;
    oggetto: string;
    stato: string;
    ordine_id: string;
  } | null>(null);

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets", "dealer", dealerId, statoFilter],
    queryFn: async () => {
      // Single query: join support_tickets → orders filtered by dealer_id
      let query = supabase
        .from("support_tickets")
        .select("*, profiles:creato_da_user_id(display_name, email), orders!inner(id, dealer_id)")
        .eq("orders.dealer_id", dealerId!)
        .order("created_at", { ascending: false });

      if (statoFilter) query = query.eq("stato", statoFilter);

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as SupportTicket[];
    },
    enabled: !!dealerId,
  });

  // Count only "aperto" (consistent with superadmin badge logic)
  const openCount = tickets.filter((t) => t.stato === "aperto").length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Headphones className="h-6 w-6" />
          {t.area.dealerAssistenza.titolo}
          {openCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {openCount} {t.area.dealerAssistenza.aperti}
            </Badge>
          )}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t.area.dealerAssistenza.desc}
        </p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Select value={statoFilter} onValueChange={(v) => setStatoFilter(v === "all" ? "" : v)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={t.area.dealerAssistenza.tuttiStati} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.area.dealerAssistenza.tuttiStati}</SelectItem>
            {TICKET_STATI.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {statoFilter && (
          <Button variant="ghost" size="sm" onClick={() => setStatoFilter("")}>
            {t.area.dealerAssistenza.azzeraFiltri}
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
              {t.area.dealerAssistenza.nessunoTrovato}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.area.dealerAssistenza.oggetto}</TableHead>
                  <TableHead>{t.area.dealerAssistenza.ordine}</TableHead>
                  <TableHead>{t.area.dealerAssistenza.priorita}</TableHead>
                  <TableHead>{t.area.dealerAssistenza.stato}</TableHead>
                  <TableHead>{t.area.dealerAssistenza.data}</TableHead>
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
                    <TableCell className="text-muted-foreground">#{ticket.ordine_id}</TableCell>
                    <TableCell>
                      <Badge className={getTicketPrioritaColor(ticket.priorita)} variant="outline">
                        {getTicketPrioritaLabel(ticket.priorita)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTicketStatoColor(ticket.stato)}>
                        {getTicketStatoLabel(ticket.stato)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(ticket.created_at), "dd MMM yyyy", { locale: it })}
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
