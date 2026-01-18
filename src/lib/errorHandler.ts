import { toast } from "@/hooks/use-toast";

/**
 * Gestisce errori di mutation in modo standardizzato
 * @param error - Errore da gestire
 * @param context - Contesto dell'operazione (es. "aggiornamento ordine")
 */
export const handleMutationError = (error: Error | unknown, context: string) => {
  const errorMessage = error instanceof Error ? error.message : "Errore sconosciuto";
  
  console.error(`[${context}]`, error);
  
  toast({
    title: "Errore",
    description: errorMessage || `Errore in ${context}`,
    variant: "destructive",
  });
};

/**
 * Gestisce errori di query in modo standardizzato
 * @param error - Errore da gestire
 * @param context - Contesto dell'operazione
 */
export const handleQueryError = (error: Error | unknown, context: string) => {
  const errorMessage = error instanceof Error ? error.message : "Errore sconosciuto";
  
  console.error(`[Query Error - ${context}]`, error);
  
  toast({
    title: "Errore di caricamento",
    description: `Impossibile caricare ${context}. ${errorMessage}`,
    variant: "destructive",
  });
};

/**
 * Mostra un toast di successo standardizzato
 * @param title - Titolo del toast
 * @param description - Descrizione opzionale
 */
export const showSuccessToast = (title: string, description?: string) => {
  toast({
    title,
    description,
  });
};

/**
 * Mostra un toast di warning standardizzato
 * @param title - Titolo del toast
 * @param description - Descrizione
 */
export const showWarningToast = (title: string, description: string) => {
  toast({
    title: `⚠️ ${title}`,
    description,
  });
};
