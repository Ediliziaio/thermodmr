/**
 * Categorie prodotto per le righe ordine/preventivo.
 * 
 * ORDER_LINE_CATEGORIES: usate nell'editor righe (OrderLinesEditor)
 * ORDER_FORM_CATEGORIES: usate nei form di creazione (NewOrderDialog, NewPreventivoDialog)
 */
export const ORDER_LINE_CATEGORIES = [
  "Finestra",
  "Portafinestra",
  "Scorrevole",
  "Porta",
  "Accessorio",
] as const;

export const ORDER_FORM_CATEGORIES = [
  "Infissi",
  "Porte",
  "Accessori",
  "Altro",
] as const;

export type OrderLineCategory = (typeof ORDER_LINE_CATEGORIES)[number];
export type OrderFormCategory = (typeof ORDER_FORM_CATEGORIES)[number];
