import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagementSection from "@/components/settings/UserManagementSection";
import CommissionSettingsSection from "@/components/settings/CommissionSettingsSection";
import OrderNumberingSection from "@/components/settings/OrderNumberingSection";
import PDFTemplateSection from "@/components/settings/PDFTemplateSection";
import IntegrationSection from "@/components/settings/IntegrationSection";
import { Settings } from "lucide-react";

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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">Utenti e Ruoli</TabsTrigger>
          <TabsTrigger value="commissions">Commissioni</TabsTrigger>
          <TabsTrigger value="numbering">Numerazione</TabsTrigger>
          <TabsTrigger value="pdf">Template PDF</TabsTrigger>
          <TabsTrigger value="integrations">Integrazioni</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserManagementSection />
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <CommissionSettingsSection />
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
      </Tabs>
    </div>
  );
};

export default Impostazioni;