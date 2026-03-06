import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { HomeRouter } from "./components/HomeRouter";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { Loader2 } from "lucide-react";

// Import immediati per pagine critiche
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazy loading per componenti pesanti
const Analytics = lazy(() => import("./pages/Analytics"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const DealerDetail = lazy(() => import("./pages/DealerDetail"));
const PaymentDetail = lazy(() => import("./pages/PaymentDetail"));
const Orders = lazy(() => import("./pages/Orders"));
const Dealers = lazy(() => import("./pages/Dealers"));
const Pagamenti = lazy(() => import("./pages/Pagamenti"));

const TestDataSeeder = lazy(() => import("./pages/TestDataSeeder"));
const Impostazioni = lazy(() => import("./pages/Impostazioni"));

const DealerArea = lazy(() => import("./pages/DealerArea"));
const DealerPreventivi = lazy(() => import("./pages/DealerPreventivi"));
const ChiSiamoPage = lazy(() => import("./pages/ChiSiamo"));
const ProdottiPubblico = lazy(() => import("./pages/ProdottiPubblico"));
const DmrConfort = lazy(() => import("./pages/products/DmrConfort"));
const DmrDomus = lazy(() => import("./pages/products/DmrDomus"));
const DmrPassive = lazy(() => import("./pages/products/DmrPassive"));
const ProdPortoncini = lazy(() => import("./pages/products/Portoncini"));
const ProdCassonetti = lazy(() => import("./pages/products/Cassonetti"));
const ProdTapparelle = lazy(() => import("./pages/products/Tapparelle"));
const ProdPersiane = lazy(() => import("./pages/products/Persiane"));
const VantaggiPage = lazy(() => import("./pages/VantaggiPage"));
const GaranziePage = lazy(() => import("./pages/GaranziePage"));
const ContattiPage = lazy(() => import("./pages/ContattiPage"));
const DiventaRivenditore = lazy(() => import("./pages/DiventaRivenditore"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <ErrorBoundary>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<HomeRouter />} />
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
              path="/preventivi"
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <Layout>
                    <DealerPreventivi />
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
              path="/rivenditori/:id/area/*"
              element={
                <ProtectedRoute>
                  <DealerArea />
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
              path="/impostazioni"
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <Layout>
                    <Impostazioni />
                  </Layout>
                </ProtectedRoute>
              }
            />
            {import.meta.env.DEV && (
              <>
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
              </>
            )}
            <Route path="/chi-siamo" element={<ChiSiamoPage />} />
            <Route path="/prodotti-pubblico" element={<ProdottiPubblico />} />
            <Route path="/prodotti/dmr-confort" element={<DmrConfort />} />
            <Route path="/prodotti/dmr-domus" element={<DmrDomus />} />
            <Route path="/prodotti/dmr-passive" element={<DmrPassive />} />
            <Route path="/prodotti/portoncini" element={<ProdPortoncini />} />
            <Route path="/prodotti/cassonetti" element={<ProdCassonetti />} />
            <Route path="/prodotti/tapparelle" element={<ProdTapparelle />} />
            <Route path="/prodotti/persiane" element={<ProdPersiane />} />
            <Route path="/vantaggi" element={<VantaggiPage />} />
            <Route path="/garanzie" element={<GaranziePage />} />
            <Route path="/contatti" element={<ContattiPage />} />
            <Route path="/diventa-rivenditore" element={<DiventaRivenditore />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
);

export default App;
