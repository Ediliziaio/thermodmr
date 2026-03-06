import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagementSection from "@/components/settings/UserManagementSection";
import OrderNumberingSection from "@/components/settings/OrderNumberingSection";
import PDFTemplateSection from "@/components/settings/PDFTemplateSection";
import IntegrationSection from "@/components/settings/IntegrationSection";
import AuditLogSection from "@/components/settings/AuditLogSection";
import { Settings, Users, Hash, FileText, Plug, ClipboardList } from "lucide-react";

const Impostazioni = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Impostazioni</h1>
          <p className="text-muted-foreground">
            Configura il sistema, gestisci utenti e personalizza l'applicazione
          </p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="flex w-full overflow-x-auto">
          <TabsTrigger value="users" className="flex items-center gap-1.5 min-w-fit">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Utenti e Ruoli</span>
            <span className="sm:hidden">Utenti</span>
          </TabsTrigger>
          <TabsTrigger value="numbering" className="flex items-center gap-1.5 min-w-fit">
            <Hash className="h-4 w-4" />
            <span className="hidden sm:inline">Numerazione</span>
            <span className="sm:hidden">Num.</span>
          </TabsTrigger>
          <TabsTrigger value="pdf" className="flex items-center gap-1.5 min-w-fit">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Template PDF</span>
            <span className="sm:hidden">PDF</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-1.5 min-w-fit">
            <Plug className="h-4 w-4" />
            <span className="hidden sm:inline">Integrazioni</span>
            <span className="sm:hidden">Integ.</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-1.5 min-w-fit">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Audit Log</span>
            <span className="sm:hidden">Audit</span>
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
      </Tabs>
    </div>
  );
};

export default Impostazioni;
