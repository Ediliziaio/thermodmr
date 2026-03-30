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
import { LanguageProvider } from "./i18n/LanguageContext";
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
const Assistenza = lazy(() => import("./pages/Assistenza"));

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
                <ProtectedRoute requiredRole="commerciale">
                  <Layout>
                    <Dealers />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rivenditori/:id"
              element={
                <ProtectedRoute requiredRole="commerciale">
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
                <ProtectedRoute requiredRole="commerciale">
                  <Layout>
                    <Pagamenti />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pagamenti/:id"
              element={
                <ProtectedRoute requiredRole="commerciale">
                  <Layout>
                    <PaymentDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/kpi"
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <Layout>
                    <Analytics />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/assistenza"
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <Layout>
                    <Assistenza />
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
            )}
            {/* ---- Italiano ---- */}
            <Route path="/chi-siamo" element={<LanguageProvider lang="it"><ChiSiamoPage /></LanguageProvider>} />
            <Route path="/prodotti-pubblico" element={<LanguageProvider lang="it"><ProdottiPubblico /></LanguageProvider>} />
            <Route path="/prodotti/dmr-confort" element={<LanguageProvider lang="it"><DmrConfort /></LanguageProvider>} />
            <Route path="/prodotti/dmr-domus" element={<LanguageProvider lang="it"><DmrDomus /></LanguageProvider>} />
            <Route path="/prodotti/dmr-passive" element={<LanguageProvider lang="it"><DmrPassive /></LanguageProvider>} />
            <Route path="/prodotti/portoncini" element={<LanguageProvider lang="it"><ProdPortoncini /></LanguageProvider>} />
            <Route path="/prodotti/cassonetti" element={<LanguageProvider lang="it"><ProdCassonetti /></LanguageProvider>} />
            <Route path="/prodotti/tapparelle" element={<LanguageProvider lang="it"><ProdTapparelle /></LanguageProvider>} />
            <Route path="/prodotti/persiane" element={<LanguageProvider lang="it"><ProdPersiane /></LanguageProvider>} />
            <Route path="/vantaggi" element={<LanguageProvider lang="it"><VantaggiPage /></LanguageProvider>} />
            <Route path="/garanzie" element={<LanguageProvider lang="it"><GaranziePage /></LanguageProvider>} />
            <Route path="/contatti" element={<LanguageProvider lang="it"><ContattiPage /></LanguageProvider>} />
            <Route path="/diventa-rivenditore" element={<LanguageProvider lang="it"><DiventaRivenditore /></LanguageProvider>} />

            {/* ---- Română /ro/* ---- */}
            <Route path="/ro" element={<LanguageProvider lang="ro"><HomeRouter /></LanguageProvider>} />
            <Route path="/ro/despre-noi" element={<LanguageProvider lang="ro"><ChiSiamoPage /></LanguageProvider>} />
            <Route path="/ro/produse" element={<LanguageProvider lang="ro"><ProdottiPubblico /></LanguageProvider>} />
            <Route path="/ro/produse/dmr-confort" element={<LanguageProvider lang="ro"><DmrConfort /></LanguageProvider>} />
            <Route path="/ro/produse/dmr-domus" element={<LanguageProvider lang="ro"><DmrDomus /></LanguageProvider>} />
            <Route path="/ro/produse/dmr-passive" element={<LanguageProvider lang="ro"><DmrPassive /></LanguageProvider>} />
            <Route path="/ro/produse/usi-intrare" element={<LanguageProvider lang="ro"><ProdPortoncini /></LanguageProvider>} />
            <Route path="/ro/produse/casete-rulou" element={<LanguageProvider lang="ro"><ProdCassonetti /></LanguageProvider>} />
            <Route path="/ro/produse/jaluzele" element={<LanguageProvider lang="ro"><ProdTapparelle /></LanguageProvider>} />
            <Route path="/ro/produse/obloane" element={<LanguageProvider lang="ro"><ProdPersiane /></LanguageProvider>} />
            <Route path="/ro/avantaje" element={<LanguageProvider lang="ro"><VantaggiPage /></LanguageProvider>} />
            <Route path="/ro/garantii" element={<LanguageProvider lang="ro"><GaranziePage /></LanguageProvider>} />
            <Route path="/ro/contact" element={<LanguageProvider lang="ro"><ContattiPage /></LanguageProvider>} />
            <Route path="/ro/devino-distribuitor" element={<LanguageProvider lang="ro"><DiventaRivenditore /></LanguageProvider>} />

            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
);

export default App;
