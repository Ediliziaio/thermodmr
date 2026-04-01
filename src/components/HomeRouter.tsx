import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "./Layout";
import { Loader2 } from "lucide-react";

// Se l'utente accede da app.thermodmr.com la root "/" va all'area riservata
const isAppSubdomain =
  typeof window !== "undefined" &&
  window.location.hostname === "app.thermodmr.com";

const Home = lazy(() => import("@/pages/Home"));
const SmartDashboard = lazy(() => import("@/pages/SmartDashboard"));

export const HomeRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // Su app.thermodmr.com porta direttamente al login, non al sito pubblico
    if (isAppSubdomain) return <Navigate to="/auth" replace />;
    return <Home />;
  }

  return (
    <Layout>
      <SmartDashboard />
    </Layout>
  );
};
