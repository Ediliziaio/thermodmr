import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/SmartDashboard"));

export const DashboardRouter = () => {
  return <Dashboard />;
};
