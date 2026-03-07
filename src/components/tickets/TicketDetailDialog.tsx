import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Send, Paperclip, Image, FileText, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  useTicketMessages,
  useCreateTicketMessage,
  useUpdateTicketStatus,
  type TicketMessage,
} from "@/hooks/useTickets";
import {
  TICKET_STATI,
  getTicketStatoLabel,
  getTicketStatoColor,
} from "@/lib/ticketConstants";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface TicketDetailDialogProps {
  ticketId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketInfo?: { oggetto: string; stato: string; ordine_id: string } | null;
}

export function TicketDetailDialog({
  ticketId,
  open,
  onOpenChange,
  ticketInfo,
}: TicketDetailDialogProps) {
  const { user, userRole } = useAuth();
  const { data: messages = [], isLoading } = useTicketMessages(ticketId);
  const createMessage = useCreateTicketMessage();
  const updateStatus = useUpdateTicketStatus();
  const isSuperAdmin = userRole === "super_admin";

  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentStato, setCurrentStato] = useState(ticketInfo?.stato || "aperto");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ticketInfo?.stato) setCurrentStato(ticketInfo.stato);
  }, [ticketInfo?.stato]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!user || (!newMessage.trim() && !file)) return;

    let allegato = null;
    if (file) {
      setUploading(true);
      const path = `tickets/${ticketId}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from("order-attachments")
        .upload(path, file);
      if (error) {
        setUploading(false);
        return;
      }
      allegato = { url: path, nome: file.name, tipo: file.type };
      setUploading(false);
    }

    createMessage.mutate(
      {
        ticket_id: ticketId,
        user_id: user.id,
        messaggio: newMessage.trim() || (file ? `Allegato: ${file.name}` : ""),
        allegato,
      },
      {
        onSuccess: () => {
          setNewMessage("");
          setFile(null);
        },
      }
    );
  };

  const handleStatusChange = (newStato: string) => {
    setCurrentStato(newStato);
    updateStatus.mutate({ ticketId, stato: newStato });
  };

  const getSignedUrl = async (path: string) => {
    const { data } = await supabase.storage
      .from("order-attachments")
      .createSignedUrl(path, 3600);
    return data?.signedUrl;
  };

  const isImage = (tipo: string | null) =>
    tipo?.startsWith("image/") || false;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <div className="flex items-center justify-between gap-2">
            <DialogTitle className="truncate">
              {ticketInfo?.oggetto || "Ticket Assistenza"}
            </DialogTitle>
            {isSuperAdmin ? (
              <Select value={currentStato} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TICKET_STATI.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Badge className={getTicketStatoColor(currentStato)}>
                {getTicketStatoLabel(currentStato)}
              </Badge>
            )}
          </div>
          {ticketInfo?.ordine_id && (
            <p className="text-xs text-muted-foreground">
              Ordine #{ticketInfo.ordine_id}
            </p>
          )}
        </DialogHeader>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto min-h-0 space-y-3 py-4 px-1">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : messages.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nessun messaggio ancora.
            </p>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isOwn={msg.user_id === user?.id}
                getSignedUrl={getSignedUrl}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        {currentStato !== "chiuso" && (
          <div className="shrink-0 border-t pt-3 space-y-2">
            {file && (
              <div className="flex items-center gap-2 text-sm bg-muted rounded-md px-3 py-1.5">
                <Paperclip className="h-3.5 w-3.5" />
                <span className="truncate flex-1">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setFile(null)}
                >
                  ×
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Scrivi un messaggio..."
                className="min-h-[40px] max-h-[100px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button
                size="icon"
                className="shrink-0"
                onClick={handleSend}
                disabled={
                  (!newMessage.trim() && !file) ||
                  createMessage.isPending ||
                  uploading
                }
              >
                {createMessage.isPending || uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function MessageBubble({
  message,
  isOwn,
  getSignedUrl,
}: {
  message: TicketMessage;
  isOwn: boolean;
  getSignedUrl: (path: string) => Promise<string | undefined>;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (
      message.allegato_url &&
      message.allegato_tipo?.startsWith("image/")
    ) {
      getSignedUrl(message.allegato_url).then((url) => {
        if (url) setImageUrl(url);
      });
    }
  }, [message.allegato_url]);

  const handleDownload = async () => {
    if (!message.allegato_url) return;
    const url = await getSignedUrl(message.allegato_url);
    if (url) window.open(url, "_blank");
  };

  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-4 py-2.5 space-y-1.5",
          isOwn
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <p className={cn("text-xs font-medium", isOwn ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {message.profiles?.display_name || "Utente"}
        </p>
        <p className="text-sm whitespace-pre-wrap">{message.messaggio}</p>

        {/* Image attachment */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={message.allegato_nome || "Allegato"}
            className="rounded-lg max-w-full max-h-48 object-cover cursor-pointer mt-1"
            onClick={handleDownload}
          />
        )}

        {/* File attachment (non-image) */}
        {message.allegato_url &&
          !message.allegato_tipo?.startsWith("image/") && (
            <button
              onClick={handleDownload}
              className={cn(
                "flex items-center gap-2 text-xs rounded-md px-2 py-1 mt-1",
                isOwn
                  ? "bg-primary-foreground/10 hover:bg-primary-foreground/20"
                  : "bg-background hover:bg-accent"
              )}
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="truncate">{message.allegato_nome || "File"}</span>
              <Download className="h-3 w-3 ml-1" />
            </button>
          )}

        <p className={cn("text-[10px]", isOwn ? "text-primary-foreground/50" : "text-muted-foreground/60")}>
          {format(new Date(message.created_at), "dd MMM HH:mm", { locale: it })}
        </p>
      </div>
    </div>
  );
}
