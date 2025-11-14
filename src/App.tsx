import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Dealers from "./pages/Dealers";
import Placeholder from "./pages/Placeholder";
import Provvigioni from "./pages/Provvigioni";
import Analytics from "./pages/Analytics";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Commerciali from "./pages/Commerciali";
import CommercialeDetail from "./pages/CommercialeDetail";
import Pagamenti from "./pages/Pagamenti";
import CommercialeDashboard from "./pages/CommercialeDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
