import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plug, Save, Mail, Webhook } from "lucide-react";
import { useSettings, useUpdateSetting } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const IntegrationSection = () => {
  const { data: settings, isLoading } = useSettings("integration");
  const updateSetting = useUpdateSetting();
  
  const [smtpEnabled, setSmtpEnabled] = useState(false);
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUsername, setSmtpUsername] = useState("");
  const [smtpFromEmail, setSmtpFromEmail] = useState("");
  
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");

  useEffect(() => {
    if (settings) {
      const smtpEnabledSetting = settings.find((s) => s.key === "smtp_enabled");
      const smtpHostSetting = settings.find((s) => s.key === "smtp_host");
      const smtpPortSetting = settings.find((s) => s.key === "smtp_port");
      const smtpUsernameSetting = settings.find((s) => s.key === "smtp_username");
      const smtpFromSetting = settings.find((s) => s.key === "smtp_from_email");
      const webhookEnabledSetting = settings.find((s) => s.key === "webhook_enabled");
      const webhookUrlSetting = settings.find((s) => s.key === "webhook_url");
      
      if (smtpEnabledSetting) setSmtpEnabled(smtpEnabledSetting.value === true);
      if (smtpHostSetting) setSmtpHost(String(smtpHostSetting.value).replace(/"/g, ""));
      if (smtpPortSetting) setSmtpPort(String(smtpPortSetting.value));
      if (smtpUsernameSetting) setSmtpUsername(String(smtpUsernameSetting.value).replace(/"/g, ""));
      if (smtpFromSetting) setSmtpFromEmail(String(smtpFromSetting.value).replace(/"/g, ""));
      if (webhookEnabledSetting) setWebhookEnabled(webhookEnabledSetting.value === true);
      if (webhookUrlSetting) setWebhookUrl(String(webhookUrlSetting.value).replace(/"/g, ""));
    }
  }, [settings]);

  const handleSave = () => {
    updateSetting.mutate({ key: "smtp_enabled", value: smtpEnabled });
    updateSetting.mutate({ key: "smtp_host", value: smtpHost });
    updateSetting.mutate({ key: "smtp_port", value: smtpPort });
    updateSetting.mutate({ key: "smtp_username", value: smtpUsername });
    updateSetting.mutate({ key: "smtp_from_email", value: smtpFromEmail });
    updateSetting.mutate({ key: "webhook_enabled", value: webhookEnabled });
    updateSetting.mutate({ key: "webhook_url", value: webhookUrl });
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
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plug className="h-5 w-5" />
          Integrazioni
        </CardTitle>
        <CardDescription>
          Configura integrazioni esterne (SMTP, Webhook, Zapier/Make)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SMTP Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <h3 className="text-lg font-medium">Configurazione SMTP</h3>
            </div>
            <Switch checked={smtpEnabled} onCheckedChange={setSmtpEnabled} />
          </div>

          {smtpEnabled && (
            <div className="space-y-4 pl-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">Host SMTP</Label>
                  <Input
                    id="smtpHost"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Porta</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpUsername">Username</Label>
                <Input
                  id="smtpUsername"
                  value={smtpUsername}
                  onChange={(e) => setSmtpUsername(e.target.value)}
                  placeholder="utente@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpFromEmail">Email Mittente</Label>
                <Input
                  id="smtpFromEmail"
                  type="email"
                  value={smtpFromEmail}
                  onChange={(e) => setSmtpFromEmail(e.target.value)}
                  placeholder="noreply@azienda.it"
                />
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Webhook Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Webhook className="h-5 w-5" />
              <h3 className="text-lg font-medium">Webhook / Zapier / Make</h3>
            </div>
            <Switch checked={webhookEnabled} onCheckedChange={setWebhookEnabled} />
          </div>

          {webhookEnabled && (
            <div className="space-y-4 pl-7">
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">URL Webhook</Label>
                <Input
                  id="webhookUrl"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                />
                <p className="text-sm text-muted-foreground">
                  Inserisci l'URL del webhook per ricevere notifiche su cambi stato ordini,
                  nuovi ordini, pagamenti, ecc.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateSetting.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {updateSetting.isPending ? "Salvataggio..." : "Salva Modifiche"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationSection;