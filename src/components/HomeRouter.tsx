import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "./Layout";
import { Loader2 } from "lucide-react";
import { isAppDomain, APP_URL, redirectTo } from "@/utils/subdomain";

const Home = lazy(() => import("@/pages/Home"));
const SmartDashboard = lazy(() => import("@/pages/SmartDashboard"));

interface HomeRouterProps {
  /** Se true (su thermodmr.com): non mostrare mai il dashboard, solo il sito pubblico */
  publicOnly?: boolean;
}

export const HomeRouter = ({ publicOnly = false }: HomeRouterProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // Su app.thermodmr.com porta direttamente al login
    if (isAppDomain) return <Navigate to="/auth" replace />;
    return <Home />;
  }

  // Utente loggato su thermodmr.com → manda a app.thermodmr.com
  if (publicOnly) {
    redirectTo(APP_URL);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Layout>
      <SmartDashboard />
    </Layout>
  );
};
