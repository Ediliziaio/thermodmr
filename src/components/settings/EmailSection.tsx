import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Save, Eye, EyeOff, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { useSettings, useUpdateSetting } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { sendEmail } from "@/services/emailService";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const EmailSection = () => {
  const { data: settings, isLoading } = useSettings("integration");
  const updateSetting = useUpdateSetting();
  const { user } = useAuth();

  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    if (settings) {
      const keySetting = settings.find((s) => s.key === "resend_api_key");
      if (keySetting) {
        const raw = String(keySetting.value).replace(/^"|"$/g, "");
        setApiKey(raw);
        setIsConfigured(!!raw);
      }
    }
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSetting.mutateAsync({
        key: "resend_api_key",
        value: JSON.stringify(apiKey),
      });
      setIsConfigured(!!apiKey);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    const testTo = user?.email;
    if (!testTo) {
      toast({
        title: "Errore",
        description: "Impossibile determinare l'email del destinatario.",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    try {
      await sendEmail({
        to: testTo,
        template: "ordine_confermato",
        data: {
          clientName: "Superadmin (test)",
          orderNumber: "TEST-001",
          estimatedDelivery: "—",
        },
      });
      toast({
        title: "Email di test inviata",
        description: `Email inviata a ${testTo}`,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Errore sconosciuto";
      toast({
        title: "Errore invio email di test",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email &amp; Notifiche (Resend)
        </CardTitle>
        <CardDescription>
          Configura Resend per inviare email transazionali: conferma ordini, solleciti pagamento,
          benvenuto rivenditore e altro.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          {isConfigured ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <Badge variant="outline" className="border-green-600 text-green-700">
                API Key configurata
              </Badge>
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <Badge variant="outline" className="border-amber-500 text-amber-600">
                API Key non configurata
              </Badge>
            </>
          )}
        </div>

        {/* API Key field */}
        <div className="space-y-2">
          <Label htmlFor="resendApiKey">Resend API Key</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="resendApiKey"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="re_..."
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showKey ? "Nascondi API key" : "Mostra API key"}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Genera la tua API key su{" "}
            <a
              href="https://resend.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              resend.com/api-keys
            </a>
            . Assicurati di aver verificato il dominio <strong>thermodmr.com</strong>.
          </p>
        </div>

        {/* Templates info */}
        <div className="rounded-md border p-4 space-y-2">
          <p className="text-sm font-medium">Template email disponibili:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              <code className="text-xs bg-muted px-1 rounded">ordine_pronto</code> — Notifica
              ordine pronto per la consegna
            </li>
            <li>
              <code className="text-xs bg-muted px-1 rounded">sollecito_pagamento</code> —
              Promemoria pagamento in sospeso
            </li>
            <li>
              <code className="text-xs bg-muted px-1 rounded">benvenuto_rivenditore</code> —
              Email di benvenuto con credenziali
            </li>
            <li>
              <code className="text-xs bg-muted px-1 rounded">ordine_confermato</code> —
              Conferma presa in carico ordine
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Salvataggio..." : "Salva API Key"}
          </Button>

          <Button
            variant="outline"
            onClick={handleTest}
            disabled={isTesting || !isConfigured}
            title={!isConfigured ? "Configura prima la API key" : undefined}
          >
            <Send className="h-4 w-4 mr-2" />
            {isTesting ? "Invio in corso..." : "Invia email di test"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailSection;
