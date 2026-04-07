import { useRef, useState, useEffect, useCallback, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmailEditor = lazy(() => import("react-email-editor"));
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
const makeStarterDesign = (config: TemplateConfig) => {
  const varList = config.mergeTags.map((t) => `<code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:12px;">${t.value}</code> → ${t.name}`).join("<br/>");
  return {
    counters: { u_row: 4, u_column: 4, u_content_text: 4, u_content_button: 1, u_content_divider: 1 },
    body: {
      rows: [
        {
          cells: [1],
          columns: [{
            contents: [{
              type: "text",
              values: {
                text: `<div style="text-align:center;"><span style="color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;font-family:sans-serif;">ThermoDMR</span><br/><span style="color:#9ca3af;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:sans-serif;">Gestione Rivenditori</span></div>`,
                containerPadding: "32px 40px",
              },
            }],
            values: { backgroundColor: "#111111", padding: "0px", border: {} },
          }],
          values: { backgroundColor: "#111111", padding: "0px", columnsBackgroundColor: "#111111" },
        },
        {
          cells: [1],
          columns: [{
            contents: [{
              type: "text",
              values: {
                text: `<p style="font-family:sans-serif;font-size:13px;color:#6b7280;margin:0 0 16px;">Template: <strong style="color:#111;">${config.name}</strong></p><p style="font-family:sans-serif;font-size:15px;color:#374151;margin:0 0 16px;">Personalizza questo template con i blocchi nella barra a sinistra. Usa le variabili seguenti nel testo per inserire dati dinamici:</p><p style="font-family:sans-serif;font-size:13px;color:#374151;line-height:2;margin:0;">${varList}</p>`,
                containerPadding: "32px 40px 24px",
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
              type: "button",
              values: {
                text: "Azione principale",
                href: { name: "web", values: { href: "https://thermodmr.com", target: "_blank" } },
                buttonColors: { color: "#ffffff", backgroundColor: "#111111", hoverColor: "#ffffff", hoverBackgroundColor: "#333333" },
                padding: "12px 30px",
                border: { borderRadius: "8px" },
                textAlign: "center",
                containerPadding: "0px 40px 32px",
                fontFamily: { url: "", label: "Arial" },
                fontSize: "14px",
                fontWeight: 600,
              },
            }],
            values: { padding: "0px", border: {} },
          }],
          values: { backgroundColor: "#ffffff", padding: "0px" },
        },
        {
          cells: [1],
          columns: [{
            contents: [{
              type: "text",
              values: {
                text: `<p style="font-family:sans-serif;font-size:12px;color:#9ca3af;text-align:center;margin:0;">© ${new Date().getFullYear()} ThermoDMR &nbsp;·&nbsp; <a href="https://thermodmr.com" style="color:#6b7280;text-decoration:none;">thermodmr.com</a></p>`,
                containerPadding: "20px 32px",
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
  };
};

// ─── Merge tag validation helper ─────────────────────────────────────────────
const extractMergeTags = (html: string) =>
  [...html.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]);

// ─── Component ────────────────────────────────────────────────────────────────
export default function EmailTemplateEditor() {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emailEditorRef = useRef<any>(null);

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

    emailEditorRef.current.editor.exportHtml(async ({ design, html }: { design: object; html: string }) => {
      try {
        // Validate merge tags before saving
        const usedTags = extractMergeTags(html);
        const allowedTags = config.mergeTags.map((t) => t.value.replace(/[{}]/g, ""));
        const unknownTags = usedTags.filter((t) => !allowedTags.includes(t));
        if (unknownTags.length > 0) {
          toast({
            variant: "destructive",
            title: "Variabili non riconosciute",
            description: `{{${unknownTags.join("}}, {{")}}} non sono variabili valide per questo template.`,
          });
          setIsSaving(false);
          return;
        }

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
            <div className="flex flex-wrap gap-1 mt-1.5">
              {config.mergeTags.map((tag) => (
                <button
                  key={tag.value}
                  type="button"
                  onClick={() => setSubject((prev) => prev + tag.value)}
                  className="text-xs bg-muted hover:bg-muted/80 px-2 py-0.5 rounded border font-mono transition-colors"
                >
                  {tag.value}
                </button>
              ))}
            </div>
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

          <Suspense fallback={null}>
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
          </Suspense>
        </div>
      </div>
    </TooltipProvider>
  );
}
