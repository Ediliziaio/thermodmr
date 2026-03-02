import { lazy } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "./Layout";
import { Loader2 } from "lucide-react";

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
    return <Home />;
  }

  return (
    <Layout>
      <SmartDashboard />
    </Layout>
  );
};
