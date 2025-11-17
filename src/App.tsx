import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Loader2 } from "lucide-react";

// Import immediati per pagine critiche
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazy loading per componenti pesanti
const Dashboard = lazy(() => import("./pages/SmartDashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const DealerDetail = lazy(() => import("./pages/DealerDetail"));
const PaymentDetail = lazy(() => import("./pages/PaymentDetail"));
const CommercialeDetail = lazy(() => import("./pages/CommercialeDetail"));
const CommercialeDashboard = lazy(() => import("./pages/CommercialeDashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Dealers = lazy(() => import("./pages/Dealers"));
const Commerciali = lazy(() => import("./pages/Commerciali"));
const Pagamenti = lazy(() => import("./pages/Pagamenti"));
const Provvigioni = lazy(() => import("./pages/Provvigioni"));
const RLSTest = lazy(() => import("./pages/RLSTest"));
const TestDataSeeder = lazy(() => import("./pages/TestDataSeeder"));
const Placeholder = lazy(() => import("./pages/Placeholder"));

// Ottimizza TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minuti
      gcTime: 10 * 60 * 1000, // 10 minuti
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/ordini"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Orders />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/ordini/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <OrderDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rivenditori"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dealers />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rivenditori/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DealerDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/commerciali"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Commerciali />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/commerciali/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CommercialeDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-commerciale"
              element={
                <ProtectedRoute requiredRole="commerciale">
                  <Layout>
                    <CommercialeDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pagamenti"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Pagamenti />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pagamenti/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PaymentDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/provvigioni"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Provvigioni />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/kpi"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Analytics />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/audit"
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <Layout>
                    <Placeholder title="Audit Log" description="Storico modifiche e attività" />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/impostazioni"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Placeholder title="Impostazioni" description="Configurazione sistema" />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rls-test"
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <RLSTest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seed-test-data"
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <Layout>
                    <TestDataSeeder />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
