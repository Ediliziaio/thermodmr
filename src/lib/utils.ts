import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

export const formatPercentage = (value: number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

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
