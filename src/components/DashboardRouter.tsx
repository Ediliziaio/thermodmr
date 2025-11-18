import { useAuth } from "@/contexts/AuthContext";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/SmartDashboard"));
const DealerDashboard = lazy(() => import("@/pages/DealerDashboard"));
const CommercialeDashboard = lazy(() => import("@/pages/CommercialeDashboard"));

export const DashboardRouter = () => {
  const { userRole } = useAuth();

  if (userRole === "rivenditore") {
    return <DealerDashboard />;
  }
  
  if (userRole === "commerciale") {
    return <CommercialeDashboard />;
  }
  
  return <Dashboard />;
};
