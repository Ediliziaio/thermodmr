import { useAuth } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

const Dashboard = lazy(() => import("@/pages/SmartDashboard"));
const DealerDashboard = lazy(() => import("@/pages/DealerDashboard"));
const CommercialeDashboard = lazy(() => import("@/pages/CommercialeDashboard"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export const DashboardRouter = () => {
  const { userRole } = useAuth();

  return (
    <Suspense fallback={<PageLoader />}>
      {userRole === "rivenditore" ? (
        <DealerDashboard />
      ) : userRole === "commerciale" ? (
        <CommercialeDashboard />
      ) : (
        <Dashboard />
      )}
    </Suspense>
  );
};
