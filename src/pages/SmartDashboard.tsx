import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "./Dashboard";
import { Navigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SmartDashboard() {
  const { user, userRole, loading } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (userRole === "super_admin") {
    return <Dashboard />;
  }

  // Commerciale gets a scoped dashboard showing only their dealers/orders
  if (userRole === "commerciale") {
    return <Dashboard commercialeId={user?.id} />;
  }

  // Rivenditore has no global dashboard — go directly to orders
  if (userRole === "rivenditore") {
    return <Navigate to="/ordini" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4 md:p-6">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
          <CardTitle>{t.area.smartDashboard.accessoNegato}</CardTitle>
          <CardDescription>
            {t.area.smartDashboard.noPermessi}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
