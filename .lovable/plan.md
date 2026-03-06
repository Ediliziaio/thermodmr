

# Modifiche al Dialog Creazione Preventivo

## Interventi

### 1. Rimuovere campo "Data Consegna Prevista"
**File:** `src/components/orders/NewPreventivoDialog.tsx`
- Rimuovere il campo `data_consegna_prevista` dal form (righe 315-317)
- Rimuovere dal schema Zod e dai defaultValues
- Rimuovere dalla `PreventivoDefaultValues` interface
- Non passare il valore nella mutazione (il campo DB resta nullable, sara' semplicemente `null`)

### 2. Aggiungere sezione Allegati nel dialog di creazione
**File:** `src/components/orders/NewPreventivoDialog.tsx`
- Aggiungere uno stato locale `pendingFiles: File[]` per i file selezionati prima del salvataggio (il preventivo non esiste ancora, non possiamo caricare su storage)
- Aggiungere una sezione UI con bottone "Aggiungi Allegato" e lista file selezionati con possibilita' di rimuoverli
- Dopo la creazione del preventivo (nel `onSubmit`), caricare i file su storage `order-attachments` e inserire i record nella tabella `attachments`, riutilizzando la stessa logica di `AttachmentsSection`

### 3. Aggiornare `useCreatePreventivo` o `onSubmit`
**File:** `src/components/orders/NewPreventivoDialog.tsx`
- Nel `onSubmit`, dopo `createPreventivoMutation.mutateAsync()`, iterare sui `pendingFiles` e per ognuno:
  1. Upload su storage `order-attachments/{preventivoId}/...`
  2. Insert record in tabella `attachments`
- Mostrare toast di successo anche per gli allegati

### Nessuna modifica a
- `useOrders.ts` — la mutazione resta invariata
- `AttachmentsSection.tsx` — usato nella pagina dettaglio ordine, non nel dialog di creazione
- Database — nessuna migrazione necessaria, le tabelle e RLS sono gia' corrette

