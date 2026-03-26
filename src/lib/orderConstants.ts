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

export const MODALITA_PAGAMENTO_OPTIONS = [
  { value: "tutto", label: "Tutto" },
  { value: "50_50", label: "50% Acconto + 50% Saldo" },
  { value: "completamento_lavori", label: "A completamento lavori" },
  { value: "alla_consegna", label: "Alla consegna" },
  { value: "contanti", label: "Contanti" },
] as const;

export type ModalitaPagamento = (typeof MODALITA_PAGAMENTO_OPTIONS)[number]["value"];

export const getModalitaPagamentoLabel = (value: string | null | undefined): string => {
  if (!value) return "";
  return MODALITA_PAGAMENTO_OPTIONS.find(o => o.value === value)?.label || value;
};

export type OrderLineCategory = (typeof ORDER_LINE_CATEGORIES)[number];
export type OrderFormCategory = (typeof ORDER_FORM_CATEGORIES)[number];

/**
 * Calcola il totale di una riga ordine/preventivo (IVA inclusa).
 * Unica fonte di verità per evitare divergenze tra creazione ordine e preventivo.
 */
export const calcLineTotal = (line: {
  quantita: number;
  prezzo_unitario: number;
  sconto: number;
  iva: number;
}): number => {
  const subtotal = line.quantita * line.prezzo_unitario;
  const afterDiscount = subtotal * (1 - line.sconto / 100);
  return afterDiscount * (1 + line.iva / 100);
};
