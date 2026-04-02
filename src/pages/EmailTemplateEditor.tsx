import { useRef, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmailEditor, { EditorRef } from "react-email-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Save, Loader2, CheckCircle2, Send, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { sendEmail } from "@/services/emailService";
import { useAuth } from "@/contexts/AuthContext";

// ─── Template metadata ────────────────────────────────────────────────────────
interface TemplateConfig {
  key: string;
  name: string;
  defaultSubject: string;
  mergeTags: Array<{ name: string; value: string; sample: string }>;
  sampleData: Record<string, string>;
}

const TEMPLATE_CONFIGS: Record<string, TemplateConfig> = {
  ordine_pronto: {
    key: "ordine_pronto",
    name: "Ordine Pronto",
    defaultSubject: "Il tuo ordine #{{orderNumber}} è pronto",
    mergeTags: [
      { name: "Numero Ordine", value: "{{orderNumber}}", sample: "ORD-2026-001" },
      { name: "Nome Cliente", value: "{{clientName}}", sample: "Mario Rossi Srl" },
      { name: "Dettagli", value: "{{details}}", sample: "Disponibile in magazzino" },
    ],
    sampleData: { orderNumber: "ORD-2026-001", clientName: "Mario Rossi Srl", details: "Disponibile in magazzino" },
  },
  ordine_confermato: {
    key: "ordine_confermato",
    name: "Ordine Confermato",
    defaultSubject: "Ordine #{{orderNumber}} confermato",
    mergeTags: [
      { name: "Numero Ordine", value: "{{orderNumber}}", sample: "ORD-2026-001" },
      { name: "Nome Cliente", value: "{{clientName}}", sample: "Mario Rossi Srl" },
      { name: "Consegna Stimata", value: "{{estimatedDelivery}}", sample: "15 maggio 2026" },
    ],
    sampleData: { orderNumber: "ORD-2026-001", clientName: "Mario Rossi Srl", estimatedDelivery: "15 maggio 2026" },
  },
  sollecito_pagamento: {
    key: "sollecito_pagamento",
    name: "Sollecito Pagamento",
    defaultSubject: "Sollecito pagamento — Ordine #{{orderNumber}}",
    mergeTags: [
      { name: "Numero Ordine", value: "{{orderNumber}}", sample: "ORD-2026-001" },
      { name: "Nome Cliente", value: "{{clientName}}", sample: "Mario Rossi Srl" },
      { name: "Importo", value: "{{amount}}", sample: "1.250,00" },
      { name: "Scadenza", value: "{{dueDate}}", sample: "30 aprile 2026" },
    ],
    sampleData: { orderNumber: "ORD-2026-001", clientName: "Mario Rossi Srl", amount: "1.250,00", dueDate: "30 aprile 2026" },
  },
  benvenuto_rivenditore: {
    key: "benvenuto_rivenditore",
    name: "Benvenuto Rivenditore",
    defaultSubject: "Benvenuto in ThermoDMR — Le tue credenziali",
    mergeTags: [
      { name: "Nome", value: "{{name}}", sample: "Mario Rossi Srl" },
      { name: "Email", value: "{{email}}", sample: "info@rossi.it" },
      { name: "Password Temporanea", value: "{{tempPassword}}", sample: "Temp#2026!" },
    ],
    sampleData: { name: "Mario Rossi Srl", email: "info@rossi.it", tempPassword: "Temp#2026!" },
  },
};

// ─── Default starter design for a blank template ─────────────────────────────
const makeStarterDesign = (config: TemplateConfig) => ({
  counters: { u_row: 3, u_column: 3, u_content_text: 3, u_content_button: 1, u_content_divider: 1 },
  body: {
    rows: [
      {
        cells: [1],
        columns: [{
          contents: [{
            type: "text",
            values: {
              text: `<div style="background:#111;padding:32px;text-align:center;border-radius:8px 8px 0 0"><h1 style="color:#fff;margin:0;font-size:22px;font-family:sans-serif">ThermoDMR</h1></div>`,
              containerPadding: "0px",
            },
          }],
          values: { backgroundColor: "#111", padding: "0px", border: {} },
        }],
        values: { backgroundColor: "#ffffff", padding: "0px", columnsBackgroundColor: "#111" },
      },
      {
        cells: [1],
        columns: [{
          contents: [{
            type: "text",
            values: {
              text: `<p style="font-family:sans-serif;font-size:15px;color:#374151;">Gentile <strong>{{clientName}}</strong>,</p><p style="font-family:sans-serif;font-size:15px;color:#374151;">questo è il tuo template <strong>${config.name}</strong>. Personalizzalo con i blocchi a sinistra.</p><p style="font-family:sans-serif;font-size:13px;color:#9ca3af;">Numero ordine: {{orderNumber}}</p>`,
              containerPadding: "32px",
              color: "#374151",
            },
          }],
          values: { padding: "0px", border: {}, borderRadius: "0px" },
        }],
        values: { backgroundColor: "#ffffff", padding: "0px" },
      },
      {
        cells: [1],
        columns: [{
          contents: [{
            type: "text",
            values: {
              text: `<p style="font-family:sans-serif;font-size:12px;color:#9ca3af;text-align:center;">© ThermoDMR · <a href="https://thermodmr.com" style="color:#6b7280;">thermodmr.com</a></p>`,
              containerPadding: "16px 32px",
            },
          }],
          values: { backgroundColor: "#f9fafb", padding: "0px", border: { borderTop: "1px solid #e5e7eb" } },
        }],
        values: { backgroundColor: "#f9fafb", padding: "0px" },
      },
    ],
    values: {
      backgroundColor: "#f3f4f6",
      defaultFontFamily: { url: "", label: "Arial" },
      fontFamily: { url: "", label: "Arial" },
      textColor: "#374151",
      linkColor: "#111827",
      contentWidth: "600px",
    },
  },
});

// ─── Component ────────────────────────────────────────────────────────────────
export default function EmailTemplateEditor() {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const emailEditorRef = useRef<EditorRef>(null);

  const config = key ? TEMPLATE_CONFIGS[key] : null;

  const [subject, setSubject] = useState(config?.defaultSubject ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(true);

  // Load existing template from DB when editor is ready
  const loadTemplate = useCallback(async () => {
    if (!key || !emailEditorRef.current?.editor) return;
    setLoadingExisting(true);
    try {
      const { data } = await supabase
        .from("email_templates")
        .select("design, subject")
        .eq("template_key", key)
        .maybeSingle();

      if (data?.design) {
        emailEditorRef.current.editor.loadDesign(data.design as object);
        if (data.subject) setSubject(data.subject);
      } else if (config) {
        // Load starter design
        emailEditorRef.current.editor.loadDesign(makeStarterDesign(config) as object);
      }
    } finally {
      setLoadingExisting(false);
    }
  }, [key, config]);

  useEffect(() => {
    if (editorReady) loadTemplate();
  }, [editorReady, loadTemplate]);

  const handleEditorReady = () => setEditorReady(true);

  // ─── Save ───────────────────────────────────────────────────────────────────
  const handleSave = () => {
    if (!emailEditorRef.current?.editor || !config) return;
    setIsSaving(true);

    emailEditorRef.current.editor.exportHtml(async ({ design, html }) => {
      try {
        await supabase.from("email_templates").upsert(
          {
            template_key: config.key,
            name: config.name,
            subject: subject.trim() || config.defaultSubject,
            design,
            html,
          },
          { onConflict: "template_key" }
        );
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        toast({ title: "Template salvato", description: `"${config.name}" aggiornato con successo.` });
      } catch (err) {
        toast({ variant: "destructive", title: "Errore salvataggio", description: String(err) });
      } finally {
        setIsSaving(false);
      }
    });
  };

  // ─── Test email ─────────────────────────────────────────────────────────────
  const handleTest = async () => {
    if (!config || !user?.email) return;
    setIsTesting(true);
    try {
      await sendEmail({ to: user.email, template: config.key as any, data: config.sampleData });
      toast({ title: "Email di test inviata", description: `Inviata a ${user.email}` });
    } catch (err) {
      toast({ variant: "destructive", title: "Errore test", description: String(err) });
    } finally {
      setIsTesting(false);
    }
  };

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground">Template non trovato: <code>{key}</code></p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Torna indietro
        </Button>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-background">
        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-background z-10 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Indietro
            </Button>
            <div className="h-5 w-px bg-border" />
            <div>
              <span className="font-semibold text-sm">{config.name}</span>
              <span className="text-xs text-muted-foreground ml-2">Template email</span>
            </div>
          </div>

          {/* Subject field */}
          <div className="flex-1 min-w-[200px] max-w-sm">
            <Label htmlFor="subject" className="sr-only">Oggetto email</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Oggetto email…"
              className="h-8 text-sm"
            />
          </div>

          {/* Merge tags pill */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
                  <Info className="h-3.5 w-3.5" />
                  Variabili
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <p className="font-semibold mb-2">Variabili disponibili:</p>
                <div className="space-y-1">
                  {config.mergeTags.map((t) => (
                    <div key={t.value} className="flex justify-between gap-3 text-xs">
                      <code className="bg-muted px-1 rounded">{t.value}</code>
                      <span className="text-muted-foreground">{t.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Incolla le variabili nel testo — verranno sostituite al momento dell'invio.</p>
              </TooltipContent>
            </Tooltip>

            <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={handleTest} disabled={isTesting || !editorReady}>
              {isTesting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              Test
            </Button>

            <Button size="sm" className="h-8 text-xs gap-1.5" onClick={handleSave} disabled={isSaving || !editorReady}>
              {isSaving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : saved ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              {saved ? "Salvato!" : "Salva Template"}
            </Button>
          </div>
        </div>

        {/* ── Editor area ── */}
        <div className="flex-1 relative">
          {(loadingExisting || !editorReady) && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Caricamento editor…</p>
              </div>
            </div>
          )}

          <EmailEditor
            ref={emailEditorRef}
            onReady={handleEditorReady}
            style={{ height: "100%", minHeight: "calc(100vh - 61px)" }}
            options={{
              locale: "it-IT",
              features: {
                textEditor: { spellChecker: false },
              },
              appearance: {
                theme: "modern_light",
                panels: { tools: { dock: "left" } },
              },
              mergeTags: config.mergeTags.reduce(
                (acc, tag) => ({
                  ...acc,
                  [tag.value.replace(/[{}]/g, "")]: {
                    name: tag.name,
                    value: tag.value,
                    sample: tag.sample,
                  },
                }),
                {} as Record<string, { name: string; value: string; sample: string }>
              ),
              tools: {
                image: { enabled: true },
                button: { enabled: true },
                divider: { enabled: true },
                social: { enabled: false },
                video: { enabled: false },
                countdown: { enabled: false },
                menu: { enabled: false },
              },
            }}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
