

# Abilitare la modifica dei Preventivi

## Problemi identificati
1. **readOnly forzato a true** — nella sezione preventivo di `OrderDetail.tsx` (riga 294), `OrderLinesEditor` ha `readOnly={true}`, impedendo qualsiasi modifica
2. **NaN nei totali** — visibile nello screenshot. Il componente `OrderLinesEditor` usa campi camelCase (`prezzoUnitario`, `quantita`, `sconto`) ma il DB restituisce snake_case (`prezzo_unitario`). Il cast `as any` nasconde il mismatch
3. **Nessun hook di salvataggio** — manca una mutation per aggiornare/aggiungere/rimuovere le righe del preventivo e ricalcolare `importo_totale`

## Interventi

### 1. Fix mapping dati OrderLinesEditor
**File:** `src/components/orders/OrderLinesEditor.tsx`
- Aggiornare l'interfaccia `OrderLine` per usare i nomi DB snake_case (`prezzo_unitario`, `totale_riga`, `ordine_id`) oppure fare il mapping nel componente
- Approccio scelto: mappare i dati in ingresso/uscita nel componente, accettando entrambi i formati con un normalizzatore interno. Questo risolve anche il NaN

### 2. Abilitare editing per preventivi
**File:** `src/components/orders/OrderLinesEditor.tsx`
- Modificare la logica `canEdit`: consentire editing anche quando `orderStatus === "preventivo"` (non solo `da_confermare`)

**File:** `src/pages/OrderDetail.tsx`
- Cambiare `readOnly={true}` a `readOnly={!isSuperAdmin}` nella sezione preventivo
- Collegare `onLinesChange` a una funzione di salvataggio reale

### 3. Hook per salvare le righe del preventivo
**File:** `src/hooks/useOrders.ts`
- Aggiungere `useUpdateOrderLines` mutation che:
  1. Elimina le righe esistenti per l'ordine (`delete where ordine_id = id`)
  2. Inserisce le nuove righe
  3. Ricalcola e aggiorna `importo_totale` sulla tabella orders
  4. Invalida le query `order-lines` e `order`

### 4. Pulsante "Salva Modifiche" nel preventivo
**File:** `src/pages/OrderDetail.tsx`
- Aggiungere stato locale `editedLines` inizializzato dalle `orderLines` DB
- Passare `editedLines` e setter a `OrderLinesEditor`
- Aggiungere pulsante "Salva Prodotti" sotto l'editor che chiama `useUpdateOrderLines`
- Mostrare il pulsante solo se ci sono modifiche non salvate

## File da modificare
1. `src/components/orders/OrderLinesEditor.tsx` — fix mapping snake_case + canEdit per preventivi
2. `src/hooks/useOrders.ts` — nuovo hook `useUpdateOrderLines`
3. `src/pages/OrderDetail.tsx` — collegare editing + salvataggio

