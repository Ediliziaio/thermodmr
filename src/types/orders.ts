import type { Tables } from "@/integrations/supabase/types";

/**
 * Tipo ordine base con dettagli dealer e cliente
 */
export interface OrderWithDetails extends Tables<"orders"> {
  dealers: { ragione_sociale: string; email: string } | null;
  clients: { nome: string; cognome: string } | null;
}

/**
 * Tipo ordine con statistiche di pagamento (dalla view orders_with_payment_stats)
 */
export interface OrderWithPaymentStats extends Tables<"orders"> {
  dealers: { ragione_sociale: string; email: string } | null;
  clients: { nome: string; cognome: string } | null;
  importo_pagato: number;
  importo_da_pagare: number;
  percentuale_pagata: number;
  numero_pagamenti: number;
  data_ultimo_pagamento: string | null;
}

