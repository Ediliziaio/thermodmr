import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Headphones, Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useTicketsByOrder, useCreateTicket } from "@/hooks/useTickets";
import { TicketDetailDialog } from "@/components/tickets/TicketDetailDialog";
import {
  getTicketStatoLabel,
  getTicketStatoColor,
  getTicketPrioritaLabel,
  getTicketPrioritaColor,
  TICKET_PRIORITA,
} from "@/lib/ticketConstants";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface TicketsSectionProps {
  orderId: string;
}

export function TicketsSection({ orderId }: TicketsSectionProps) {
  const { user } = useAuth();
  const { data: tickets = [], isLoading } = useTicketsByOrder(orderId);
  const createTicket = useCreateTicket();

  const [showNewDialog, setShowNewDialog] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [oggetto, setOggetto] = useState("");
  const [priorita, setPriorita] = useState("normale");
  const [messaggio, setMessaggio] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleCreate = async () => {
    if (!user || !oggetto.trim() || !messaggio.trim()) return;

    let allegato = null;
    if (file) {
      setUploading(true);
      const path = `tickets/${orderId}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from("order-attachments")
        .upload(path, file);
      if (error) {
        setUploading(false);
        toast({ title: "Errore upload", description: error.message, variant: "destructive" });
        return;
      }
      allegato = { url: path, nome: file.name, tipo: file.type };
      setUploading(false);
    }

    createTicket.mutate(
      {
        ordine_id: orderId,
        creato_da_user_id: user.id,
        oggetto,
        priorita,
        messaggio_iniziale: messaggio,
        allegato,
      },
      {
        onSuccess: () => {
          setShowNewDialog(false);
          setOggetto("");
          setPriorita("normale");
          setMessaggio("");
          setFile(null);
        },
      }
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Headphones className="h-5 w-5" />
            Assistenza
            {tickets.length > 0 && (
              <Badge variant="secondary" className="ml-1">{tickets.length}</Badge>
            )}
          </CardTitle>
          <Button size="sm" onClick={() => setShowNewDialog(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Nuovo Ticket
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : tickets.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nessun ticket di assistenza per questo ordine.
            </p>
          ) : (
            <div className="space-y-2">
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className="w-full text-left rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-foreground truncate">
                      {ticket.oggetto}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge className={getTicketPrioritaColor(ticket.priorita)} variant="outline">
                        {getTicketPrioritaLabel(ticket.priorita)}
                      </Badge>
                      <Badge className={getTicketStatoColor(ticket.stato)}>
                        {getTicketStatoLabel(ticket.stato)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {ticket.profiles?.display_name || "Utente"} — {format(new Date(ticket.created_at), "dd MMM yyyy HH:mm", { locale: it })}
                  </p>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Ticket Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nuovo Ticket Assistenza</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Oggetto</Label>
              <Input
                value={oggetto}
                onChange={(e) => setOggetto(e.target.value)}
                placeholder="Descrivi brevemente il problema..."
              />
            </div>
            <div className="space-y-2">
              <Label>Priorità</Label>
              <Select value={priorita} onValueChange={setPriorita}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TICKET_PRIORITA.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Messaggio</Label>
              <Textarea
                value={messaggio}
                onChange={(e) => setMessaggio(e.target.value)}
                placeholder="Descrivi il problema in dettaglio..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Allegato (opzionale)</Label>
              <Input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>
              Annulla
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!oggetto.trim() || !messaggio.trim() || createTicket.isPending || uploading}
            >
              {(createTicket.isPending || uploading) ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creazione...</>
              ) : "Crea Ticket"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ticket Detail */}
      {selectedTicketId && (() => {
        const t = tickets.find(tk => tk.id === selectedTicketId);
        return (
          <TicketDetailDialog
            ticketId={selectedTicketId}
            open={!!selectedTicketId}
            onOpenChange={(open) => !open && setSelectedTicketId(null)}
            ticketInfo={t ? { oggetto: t.oggetto, stato: t.stato, ordine_id: t.ordine_id } : undefined}
          />
        );
      })()}
    </>
  );
}
