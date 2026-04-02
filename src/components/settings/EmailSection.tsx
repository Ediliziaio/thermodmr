import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail, Save, Eye, EyeOff, CheckCircle2, AlertTriangle, Send, Pencil, LayoutTemplate,
} from "lucide-react";
import { useSettings, useUpdateSetting } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { sendEmail, type EmailTemplate } from "@/services/emailService";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// ─── Template card definitions ───────────────────────────────────────────────
const TEMPLATES: Array<{ key: EmailTemplate; label: string; desc: string }> = [
  {
    key: "ordine_confermato",
    label: "Ordine Confermato",
    desc: "Inviata quando un ordine viene preso in carico dalla produzione.",
  },
  {
    key: "ordine_pronto",
    label: "Ordine Pronto",
    desc: "Inviata quando l'ordine è pronto per la consegna o il ritiro.",
  },
  {
    key: "sollecito_pagamento",
    label: "Sollecito Pagamento",
    desc: "Promemoria per pagamenti in sospeso.",
  },
  {
    key: "benvenuto_rivenditore",
    label: "Benvenuto Rivenditore",
    desc: "Email di accesso inviata a un nuovo rivenditore.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const EmailSection = () => {
  const { data: settings, isLoading } = useSettings("integration");
  const updateSetting = useUpdateSetting();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Which templates have custom designs saved
  const { data: customTemplateKeys = [] } = useQuery({
    queryKey: ["email-templates-saved"],
    queryFn: async () => {
      const { data } = await supabase
        .from("email_templates")
        .select("template_key")
        .not("html", "is", null);
      return (data || []).map((r) => r.template_key as string);
    },
    staleTime: 30_000,
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSetting.mutateAsync({
        key: "resend_api_key",
        value: JSON.stringify(apiKey),
      });
      setIsConfigured(!!apiKey);
      toast({ title: "API key salvata" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    const testTo = user?.email;
    if (!testTo) return;
    setIsTesting(true);
    try {
      await sendEmail({
        to: testTo,
        template: "ordine_confermato",
        data: { clientName: "Superadmin (test)", orderNumber: "TEST-001", estimatedDelivery: "—" },
      });
      toast({ title: "Email di test inviata", description: `Inviata a ${testTo}` });
    } catch (err: unknown) {
      toast({ variant: "destructive", title: "Errore invio", description: String(err) });
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── API Key Card ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email &amp; Notifiche (Resend)
          </CardTitle>
          <CardDescription>
            Configura la tua API key Resend per inviare email transazionali.
            Verifica prima il dominio <strong>thermodmr.com</strong> su{" "}
            <a href="https://resend.com/domains" target="_blank" rel="noopener noreferrer" className="underline">
              resend.com/domains
            </a>
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-2">
            {isConfigured ? (
              <><CheckCircle2 className="h-4 w-4 text-green-600" /><Badge variant="outline" className="border-green-600 text-green-700">API Key configurata</Badge></>
            ) : (
              <><AlertTriangle className="h-4 w-4 text-amber-500" /><Badge variant="outline" className="border-amber-500 text-amber-600">API Key non configurata</Badge></>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="resendApiKey">Resend API Key</Label>
            <div className="relative flex gap-2">
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Salvataggio…" : "Salva API Key"}
            </Button>
            <Button variant="outline" onClick={handleTest} disabled={isTesting || !isConfigured}>
              <Send className="h-4 w-4 mr-2" />
              {isTesting ? "Invio…" : "Invia email di test"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Template Builder Card ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5" />
            Template Email
          </CardTitle>
          <CardDescription>
            Personalizza i template con il builder drag-and-drop. Usa le variabili{" "}
            <code className="bg-muted px-1 rounded text-xs">{"{{orderNumber}}"}</code>{" "}
            direttamente nel testo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {TEMPLATES.map((tpl) => {
              const isCustom = customTemplateKeys.includes(tpl.key);
              return (
                <div
                  key={tpl.key}
                  className="flex items-start justify-between gap-3 rounded-lg border p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{tpl.label}</p>
                      {isCustom ? (
                        <Badge variant="outline" className="text-xs border-green-600 text-green-700 h-5">
                          Personalizzato
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs h-5 text-muted-foreground">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{tpl.desc}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0 gap-1.5 text-xs h-8"
                    onClick={() => navigate(`/email-template-editor/${tpl.key}`)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Modifica
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSection;
