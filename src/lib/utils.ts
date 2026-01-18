import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatta un valore numerico come valuta EUR
 */
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

/**
 * Formatta una percentuale
 */
export const formatPercentage = (value: number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

/**
 * Formatta una data con date-fns (locale italiano)
 * @param date - Data da formattare (Date | string)
 * @param formatStr - Formato stringa (default: "dd MMM yyyy")
 */
export const formatDate = (date: Date | string, formatStr = "dd MMM yyyy") => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: it });
};

/**
 * Formatta una data con orario
 */
export const formatDateTime = (date: Date | string) => {
  return formatDate(date, "dd MMM yyyy HH:mm");
};

/**
 * Restituisce le classi CSS per il colore dello stato ordine
 */
export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    da_confermare: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    da_pagare_acconto: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    in_lavorazione: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    da_consegnare: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    consegnato: "bg-green-500/10 text-green-700 dark:text-green-400",
  };
  return colors[status] || "bg-muted/10 text-muted-foreground";
};

/**
 * Restituisce l'etichetta leggibile per lo stato ordine
 */
export const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    da_confermare: "Da Confermare",
    da_pagare_acconto: "Da Pagare Acconto",
    in_lavorazione: "In Lavorazione",
    da_consegnare: "Da Consegnare",
    consegnato: "Consegnato",
  };
  return labels[status] || status;
};

/**
 * Restituisce la variante Badge per lo stato ordine
 */
export const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "da_confermare":
      return "outline";
    case "da_pagare_acconto":
      return "destructive";
    case "in_lavorazione":
      return "default";
    case "da_consegnare":
      return "secondary";
    case "consegnato":
      return "secondary";
    default:
      return "outline";
  }
};
