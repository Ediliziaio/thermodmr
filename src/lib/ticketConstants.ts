export const TICKET_STATI = [
  { value: "aperto", label: "Aperto", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { value: "in_gestione", label: "In Gestione", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  { value: "chiuso", label: "Chiuso", color: "bg-muted text-muted-foreground" },
] as const;

export const TICKET_PRIORITA = [
  { value: "bassa", label: "Bassa", color: "bg-muted text-muted-foreground" },
  { value: "normale", label: "Normale", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { value: "alta", label: "Alta", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
  { value: "urgente", label: "Urgente", color: "bg-destructive/10 text-destructive" },
] as const;

export function getTicketStatoLabel(stato: string) {
  return TICKET_STATI.find((s) => s.value === stato)?.label || stato;
}

export function getTicketStatoColor(stato: string) {
  return TICKET_STATI.find((s) => s.value === stato)?.color || "";
}

export function getTicketPrioritaLabel(priorita: string) {
  return TICKET_PRIORITA.find((p) => p.value === priorita)?.label || priorita;
}

export function getTicketPrioritaColor(priorita: string) {
  return TICKET_PRIORITA.find((p) => p.value === priorita)?.color || "";
}
