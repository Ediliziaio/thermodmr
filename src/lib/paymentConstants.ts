/**
 * Costanti e helper centralizzati per la sezione Pagamenti.
 * Importare da qui invece di definire localmente nei componenti.
 */

// Re-export del tipo principale da usePaymentsInfinite
export type { PaymentWithDetails } from "@/hooks/usePaymentsInfinite";

/**
 * Badge variant per tipo pagamento (usato con shadcn Badge variant prop)
 */
export const getTipoBadgeVariant = (tipo: string): "default" | "secondary" | "outline" => {
  switch (tipo) {
    case "acconto": return "secondary";
    case "saldo": return "default";
    case "parziale": return "outline";
    default: return "outline";
  }
};

/**
 * Colore CSS per badge tipo pagamento (usato con className)
 */
export const getTipoBadgeColor = (tipo: string): string => {
  switch (tipo) {
    case "acconto": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "saldo": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    case "parziale": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
    default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
  }
};

/**
 * Emoji icon per metodo di pagamento
 */
export const getMetodoIcon = (metodo: string): string => {
  const icons: Record<string, string> = {
    bonifico: "🏦",
    "bonifico bancario": "🏦",
    carta: "💳",
    "carta di credito": "💳",
    contanti: "💵",
    contante: "💵",
    assegno: "📝",
    riba: "🏛️",
    paypal: "💳",
  };
  return icons[metodo.toLowerCase()] || "💰";
};

/**
 * Label leggibile per tipo pagamento
 */
export const getPaymentTypeLabel = (tipo: string): string => {
  const labels: Record<string, string> = {
    acconto: "Acconto",
    saldo: "Saldo",
    parziale: "Parziale",
  };
  return labels[tipo] || tipo;
};
