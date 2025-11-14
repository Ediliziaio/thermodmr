import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "./Dashboard";
import CommercialeDashboard from "./CommercialeDashboard";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function SmartDashboard() {
  const { userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Super admin vede la dashboard generale
  if (userRole === "super_admin") {
    return <Dashboard />;
  }

  // Commerciale vede la propria dashboard
  if (userRole === "commerciale") {
    return <CommercialeDashboard />;
  }

  // Rivenditore viene reindirizzato agli ordini
  if (userRole === "rivenditore") {
    return <Navigate to="/ordini" replace />;
  }

  // Utenti senza ruolo vedono messaggio di errore
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-destructive">Accesso Negato</h2>
        <p className="text-muted-foreground mt-2">
          Non hai i permessi per accedere a questa sezione.
        </p>
      </div>
    </div>
  );
}
