import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

// Ottimizza TanStack Query con configurazione centralizzata
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minuti - i dati rimangono freschi più a lungo
      gcTime: 10 * 60 * 1000, // 10 minuti - mantiene i dati in cache più a lungo
      refetchOnWindowFocus: false, // Non rifare fetch quando torna focus
      refetchOnReconnect: true, // Rifare fetch quando si riconnette
      retry: 1, // Riprova una sola volta in caso di errore
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
