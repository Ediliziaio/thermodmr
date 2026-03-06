import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "./Dashboard";
import { Navigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SmartDashboard() {
  const { userRole, loading } = useAuth();

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

  if (userRole === "commerciale" || userRole === "rivenditore") {
    return <Navigate to="/ordini" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4 md:p-6">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
          <CardTitle>Accesso Negato</CardTitle>
          <CardDescription>
            Non hai i permessi per accedere a questa sezione.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
