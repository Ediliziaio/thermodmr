import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Dealers from "./pages/Dealers";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ordini" element={<Orders />} />
            <Route path="/rivenditori" element={<Dealers />} />
            <Route path="/commerciali" element={<Placeholder title="Commerciali" description="Gestione dei commerciali e assegnazioni" />} />
            <Route path="/pagamenti" element={<Placeholder title="Pagamenti" description="Storico e gestione pagamenti" />} />
            <Route path="/provvigioni" element={<Placeholder title="Provvigioni" description="Calcolo e liquidazione provvigioni" />} />
            <Route path="/kpi" element={<Placeholder title="KPI & Statistiche" description="Analisi delle performance" />} />
            <Route path="/audit" element={<Placeholder title="Audit Log" description="Storico modifiche e attività" />} />
            <Route path="/impostazioni" element={<Placeholder title="Impostazioni" description="Configurazione sistema" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
