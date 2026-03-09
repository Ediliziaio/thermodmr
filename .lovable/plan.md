

# Aggiungere "Riferimento Preventivo" alla creazione preventivo

## Problema
Manca la possibilità di inserire un riferimento (es. numero preventivo del rivenditore, codice interno) quando si crea un nuovo preventivo.

## Modifiche

### 1. Database Migration
- Aggiungere colonna `riferimento_preventivo TEXT` (nullable) alla tabella `orders`

### 2. `src/components/orders/NewPreventivoDialog.tsx`
- Aggiungere campo `riferimento_preventivo` allo schema zod (stringa opzionale)
- Aggiungere input text "Riferimento Preventivo" nel form, posizionato dopo la selezione rivenditore e prima della data scadenza
- Passare il valore nel submit e nel pre-fill per duplicazione

### 3. `src/hooks/useOrders.ts`
- In `useCreatePreventivo`, passare `riferimento_preventivo` nell'insert dell'ordine

### 4. `src/pages/OrderDetail.tsx` (se mostra i dettagli)
- Mostrare il riferimento preventivo nella vista dettaglio quando presente

Modifiche minime, un campo opzionale in più.

