import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, Upload } from "lucide-react";
import { useSettings, useUpdateSetting } from "@/hooks/useSettings";
import { Skeleton } from "@/components/ui/skeleton";

const PDFTemplateSection = () => {
  const { data: settings, isLoading } = useSettings("pdf_template");
  const updateSetting = useUpdateSetting();
  
  const [logoUrl, setLogoUrl] = useState("");
  const [companyName, setCompanyName] = useState("Azienda Serramenti");
  const [companyAddress, setCompanyAddress] = useState("");

  useEffect(() => {
    if (settings) {
      const logoSetting = settings.find((s) => s.key === "pdf_template_logo_url");
      const nameSetting = settings.find((s) => s.key === "pdf_template_company_name");
      const addressSetting = settings.find((s) => s.key === "pdf_template_company_address");
      
      if (logoSetting) setLogoUrl(String(logoSetting.value).replace(/"/g, ""));
      if (nameSetting) setCompanyName(String(nameSetting.value).replace(/"/g, ""));
      if (addressSetting) setCompanyAddress(String(addressSetting.value).replace(/"/g, ""));
    }
  }, [settings]);

  const handleSave = () => {
    updateSetting.mutate({ key: "pdf_template_logo_url", value: logoUrl });
    updateSetting.mutate({ key: "pdf_template_company_name", value: companyName });
    updateSetting.mutate({ key: "pdf_template_company_address", value: companyAddress });
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
            rows={3}
          />
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