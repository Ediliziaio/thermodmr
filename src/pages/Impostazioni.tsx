import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagementSection from "@/components/settings/UserManagementSection";
import OrderNumberingSection from "@/components/settings/OrderNumberingSection";
import PDFTemplateSection from "@/components/settings/PDFTemplateSection";
import IntegrationSection from "@/components/settings/IntegrationSection";
import AuditLogSection from "@/components/settings/AuditLogSection";
import EmailSection from "@/components/settings/EmailSection";
import { Settings, Users, Hash, FileText, Plug, ClipboardList, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Impostazioni = () => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">{t.area.impostazioni.titolo}</h1>
          <p className="text-muted-foreground">
            {t.area.impostazioni.desc}
          </p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="flex w-full overflow-x-auto">
          <TabsTrigger value="users" className="flex items-center gap-1.5 min-w-fit">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">{t.area.impostazioni.utentiRuoli}</span>
            <span className="sm:hidden">{t.area.impostazioni.utenti}</span>
          </TabsTrigger>
          <TabsTrigger value="numbering" className="flex items-center gap-1.5 min-w-fit">
            <Hash className="h-4 w-4" />
            <span className="hidden sm:inline">{t.area.impostazioni.numerazione}</span>
            <span className="sm:hidden">{t.area.impostazioni.num}</span>
          </TabsTrigger>
          <TabsTrigger value="pdf" className="flex items-center gap-1.5 min-w-fit">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">{t.area.impostazioni.templatePdf}</span>
            <span className="sm:hidden">{t.area.impostazioni.pdf}</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-1.5 min-w-fit">
            <Plug className="h-4 w-4" />
            <span className="hidden sm:inline">{t.area.impostazioni.integrazioni}</span>
            <span className="sm:hidden">{t.area.impostazioni.integ}</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-1.5 min-w-fit">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">{t.area.impostazioni.auditLog}</span>
            <span className="sm:hidden">{t.area.impostazioni.audit}</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-1.5 min-w-fit">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email & Notifiche</span>
            <span className="sm:hidden">Email</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserManagementSection />
        </TabsContent>

        <TabsContent value="numbering" className="space-y-4">
          <OrderNumberingSection />
        </TabsContent>

        <TabsContent value="pdf" className="space-y-4">
          <PDFTemplateSection />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <IntegrationSection />
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <AuditLogSection />
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <EmailSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Impostazioni;
