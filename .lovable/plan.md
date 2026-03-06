

# Stato preventivo modificabile + Azioni massive

## Cosa aggiungere

### 1. Cambio stato singolo preventivo
Attualmente lo stato (Valido/Non Valido) è derivato dalla `data_scadenza_preventivo`. L'utente vuole poterlo cambiare manualmente. Due approcci possibili:
- **Approccio scelto**: aggiungere un dropdown inline per ogni riga che permetta di cambiare lo stato tra "Valido" e "Non Valido" aggiornando la `data_scadenza_preventivo` (impostandola a ieri per "Non Valido", o rimuovendola/spostandola avanti per "Valido"). Questo non richiede modifiche al DB.
- In alternativa, si potrebbe convertire il preventivo in ordine direttamente dal dropdown (già esiste il pulsante Converti).

Il dropdown nella colonna Stato (desktop) e nella card (mobile) permetterà di scegliere: **Valido**, **Non Valido**, **Converti in Ordine**. Solo per utenti `canManage`.

### 2. Selezione multipla + Barra azioni massive
Seguendo il pattern già esistente nel progetto (ordini, pagamenti, dealers):

- **Checkbox** su ogni riga (desktop: prima colonna, mobile: nella card)
- **Checkbox "seleziona tutti"** nell'header della tabella
- **Barra azioni flottante** che appare quando ci sono elementi selezionati, con:
  - Conteggio selezionati
  - **Imposta come Valido** — bulk update `data_scadenza_preventivo` a null o +30 giorni
  - **Imposta come Non Valido** — bulk update `data_scadenza_preventivo` a ieri
  - **Converti in Ordini** — bulk convert a `da_confermare`
  - **Elimina** — bulk delete con dialog di conferma
  - **Deseleziona tutto**

### 3. File da modificare

**`src/pages/DealerPreventivi.tsx`**:
- Aggiungere stato `selectedIds: Set<string>`
- Aggiungere checkbox nella tabella e nelle card
- Aggiungere la barra azioni flottante in basso (fixed bottom)
- Aggiungere dropdown stato inline nelle righe (solo canManage)
- Aggiungere mutations per bulk update stato e bulk delete
- Riutilizzare `useBulkUpdateOrderStatus` e `useBulkDeleteOrders` da `useOrders.ts` (già esistenti)
- Aggiungere invalidazione query `dealer-preventivi` nelle mutations

Nessuna modifica DB necessaria. Nessun nuovo componente — tutto inline nella pagina come già fatto per ordini.

