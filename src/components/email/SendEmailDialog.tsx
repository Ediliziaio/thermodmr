import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { sendEmail, type EmailTemplate } from "@/services/emailService";
import { toast } from "@/hooks/use-toast";

const TEMPLATE_LABELS: Record<EmailTemplate, string> = {
  ordine_pronto: "Ordine pronto",
  ordine_confermato: "Ordine confermato",
  sollecito_pagamento: "Sollecito pagamento",
  benvenuto_rivenditore: "Benvenuto rivenditore",
};

const TEMPLATE_DESCRIPTIONS: Record<EmailTemplate, string> = {
  ordine_pronto: "Notifica al cliente che l'ordine è pronto per la consegna/ritiro.",
  ordine_confermato: "Conferma al cliente che l'ordine è stato preso in carico.",
  sollecito_pagamento: "Promemoria di pagamento per un importo in sospeso.",
  benvenuto_rivenditore: "Email di benvenuto con credenziali di accesso al portale.",
};

interface SendEmailDialogProps {
  trigger: React.ReactNode;
  template: EmailTemplate;
  defaultTo?: string;
  data: Record<string, unknown>;
  disabled?: boolean;
}

export function SendEmailDialog({
  trigger,
  template,
  defaultTo = "",
  data,
  disabled,
}: SendEmailDialogProps) {
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState(defaultTo);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = (v: boolean) => {
    setOpen(v);
    if (v) {
      setTo(defaultTo);
      setSent(false);
      setError(null);
    }
  };

  const handleSend = async () => {
    if (!to.trim()) {
      setError("Inserisci un indirizzo email valido.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await sendEmail({ to: to.trim(), template, data });
      setSent(true);
      toast({ title: "Email inviata", description: `Email "${TEMPLATE_LABELS[template]}" inviata a ${to.trim()}.` });
      setTimeout(() => setOpen(false), 1200);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Errore durante l'invio.";
      setError(msg);
      toast({ variant: "destructive", title: "Errore invio email", description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild disabled={disabled}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            {TEMPLATE_LABELS[template]}
          </DialogTitle>
          <DialogDescription>
            {TEMPLATE_DESCRIPTIONS[template]}
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-6 text-green-600">
            <CheckCircle2 className="h-10 w-10" />
            <p className="font-medium">Email inviata con successo!</p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="email-to">Destinatario</Label>
              <Input
                id="email-to"
                type="email"
                placeholder="email@esempio.com"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                disabled={loading}
                className="h-10"
                autoFocus={!defaultTo}
              />
            </div>

            {/* Preview dati */}
            <div className="rounded-lg bg-muted px-4 py-3 text-sm space-y-1">
              {Object.entries(data)
                .filter(([, v]) => v !== undefined && v !== null && v !== "")
                .map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-muted-foreground capitalize min-w-[100px]">
                      {k.replace(/_/g, " ")}:
                    </span>
                    <span className="font-medium truncate">{String(v)}</span>
                  </div>
                ))}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>
        )}

        {!sent && (
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Annulla
            </Button>
            <Button onClick={handleSend} disabled={loading || !to.trim()}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Invio…</>
              ) : (
                <><Mail className="mr-2 h-4 w-4" />Invia Email</>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
