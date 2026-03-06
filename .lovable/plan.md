

# Rimuovere IVA dai Preventivi

## Contesto
I preventivi riguardano acquisti di prodotti esterni, quindi l'IVA non si applica. L'importo inserito è quello finale.

## Interventi

### 1. `NewPreventivoDialog.tsx`
- Rimuovere il campo `iva` dallo schema Zod (hardcodare a `0`)
- Rimuovere l'`IvaSelector` dalla UI delle righe preventivo
- Semplificare `calculateLineTotal`: il totale sarà `quantità × prezzo - sconto`, senza maggiorazione IVA
- Rimuovere l'import di `IvaSelector`
- Aggiornare i default delle righe: `iva: 0` invece di `iva: 22`

### 2. `PreventivoDefaultValues` (interfaccia duplicazione)
- Mantenere `iva` nell'interfaccia per retrocompatibilità con dati esistenti, ma forzarlo a `0` nei default

### 3. Nessuna modifica a
- `OrderLinesEditor.tsx` — usato per ordini confermati dove l'IVA serve
- `IvaSelector.tsx` — usato altrove
- Database `order_lines` — il campo `iva` resta, semplicemente sarà `0` per i preventivi

## Impatto
- I preventivi esistenti con IVA > 0 continueranno a funzionare (dati DB invariati)
- I nuovi preventivi avranno sempre IVA = 0
- La duplicazione forzerà IVA a 0

