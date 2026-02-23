import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, Upload } from "lucide-react";
import { useSettings, useUpdateSetting } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";

const PDFTemplateSection = () => {
  const { data: settings, isLoading } = useSettings("pdf_template");
  const updateSetting = useUpdateSetting();
  
  const [logoUrl, setLogoUrl] = useState("");
  const [companyName, setCompanyName] = useState("Azienda Serramenti");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyVat, setCompanyVat] = useState("");
  const [companyCf, setCompanyCf] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companySdi, setCompanySdi] = useState("");
  const [footerNotes, setFooterNotes] = useState("");

  useEffect(() => {
    if (settings) {
      const get = (key: string) => {
        const s = settings.find((s) => s.key === key);
        return s ? String(s.value).replace(/"/g, "") : "";
      };
      setLogoUrl(get("pdf_template_logo_url"));
      setCompanyName(get("pdf_template_company_name") || "Azienda Serramenti");
      setCompanyAddress(get("pdf_template_company_address"));
      setCompanyVat(get("pdf_template_company_vat"));
      setCompanyCf(get("pdf_template_company_cf"));
      setCompanyPhone(get("pdf_template_company_phone"));
      setCompanyEmail(get("pdf_template_company_email"));
      setCompanySdi(get("pdf_template_company_sdi"));
      setFooterNotes(get("pdf_template_footer_notes"));
    }
  }, [settings]);

  const validate = () => {
    if (companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail)) {
      toast({ title: "Errore", description: "Email aziendale non valida", variant: "destructive" });
      return false;
    }
    if (logoUrl && !/^https?:\/\/.+/.test(logoUrl)) {
      toast({ title: "Errore", description: "URL logo non valido (deve iniziare con http:// o https://)", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    updateSetting.mutate({ key: "pdf_template_logo_url", value: logoUrl });
    updateSetting.mutate({ key: "pdf_template_company_name", value: companyName });
    updateSetting.mutate({ key: "pdf_template_company_address", value: companyAddress });
    updateSetting.mutate({ key: "pdf_template_company_vat", value: companyVat });
    updateSetting.mutate({ key: "pdf_template_company_cf", value: companyCf });
    updateSetting.mutate({ key: "pdf_template_company_phone", value: companyPhone });
    updateSetting.mutate({ key: "pdf_template_company_email", value: companyEmail });
    updateSetting.mutate({ key: "pdf_template_company_sdi", value: companySdi });
    updateSetting.mutate({ key: "pdf_template_footer_notes", value: footerNotes });
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
          <FileText className="h-5 w-5" />
          Template PDF
        </CardTitle>
        <CardDescription>
          Personalizza l'aspetto dei documenti PDF generati (conferme ordine, DDT, fatture)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Nome Azienda</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Azienda Serramenti S.r.l."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyAddress">Indirizzo Completo</Label>
          <Textarea
            id="companyAddress"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            placeholder="Via Roma 123, 20100 Milano (MI)"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyVat">Partita IVA</Label>
            <Input
              id="companyVat"
              value={companyVat}
              onChange={(e) => setCompanyVat(e.target.value)}
              placeholder="IT01234567890"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyCf">Codice Fiscale</Label>
            <Input
              id="companyCf"
              value={companyCf}
              onChange={(e) => setCompanyCf(e.target.value)}
              placeholder="01234567890"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyPhone">Telefono</Label>
            <Input
              id="companyPhone"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              placeholder="+39 02 1234567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyEmail">Email Aziendale</Label>
            <Input
              id="companyEmail"
              type="email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              placeholder="info@azienda.it"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companySdi">Codice SDI / PEC</Label>
          <Input
            id="companySdi"
            value={companySdi}
            onChange={(e) => setCompanySdi(e.target.value)}
            placeholder="ABCDEFG oppure pec@azienda.it"
          />
          <p className="text-sm text-muted-foreground">
            Codice destinatario SDI (7 caratteri) o indirizzo PEC per la fatturazione elettronica
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoUrl">URL Logo Aziendale</Label>
          <div className="flex gap-2">
            <Input
              id="logoUrl"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            <Button variant="outline" size="icon" title="Carica logo">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            URL pubblico del logo aziendale (formato PNG o JPG, consigliato 200x80px)
          </p>
        </div>

        {logoUrl && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Anteprima Logo:</p>
            <img
              src={logoUrl}
              alt="Logo aziendale"
              className="max-h-20 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="footerNotes">Condizioni di Vendita / Note a piè di pagina</Label>
          <Textarea
            id="footerNotes"
            value={footerNotes}
            onChange={(e) => setFooterNotes(e.target.value)}
            placeholder="Condizioni generali di vendita, termini di pagamento, garanzie..."
            rows={3}
          />
          <p className="text-sm text-muted-foreground">
            Questo testo verrà inserito in calce a tutti i documenti PDF generati
          </p>
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

export default PDFTemplateSection;
