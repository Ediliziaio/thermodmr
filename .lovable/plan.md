

# Conversione Preventivo → Ordine: Nuovo ID e Riferimento

## Problema
Attualmente la conversione cambia solo lo `stato` da `preventivo` a `da_confermare`, mantenendo l'ID `PRV-YYYY-NNNN`. L'utente vuole:
1. Generare un nuovo ID `ORD-YYYY-NNNN` automaticamente
2. Salvare il vecchio ID preventivo nel campo `riferimento_preventivo` (se non già valorizzato)

## Modifiche

### 1. `src/pages/DealerPreventivi.tsx` — convertMutation (riga 138-154)
- Invece di fare solo `update({ stato })`, la mutation deve:
  1. Leggere l'ordine corrente per ottenere l'ID preventivo e il `riferimento_preventivo` esistente
  2. Generare un nuovo ID ordine con `generateOrderId()` (da importare o replicare)
  3. Aggiornare il record con: `id = nuovoOrdId`, `stato = da_confermare`, `riferimento_preventivo = vecchioIdPreventivo` (se non già presente)
- Stessa logica per `bulkConvertMutation` (riga ~176-195)

### 2. `src/pages/OrderDetail.tsx` — convertMutation (riga 255-272)
- Stessa logica: generare nuovo ID ordine, aggiornare `id`, `stato`, e `riferimento_preventivo`
- Dopo la conversione, navigare al nuovo URL `/ordini/{nuovoId}`

### 3. `src/hooks/useOrders.ts` — Esportare `generateOrderId`
- Rendere la funzione `generateOrderId` (attualmente privata, riga ~308) esportabile, così può essere usata dai componenti di conversione

## Dettaglio tecnico
La conversione farà:
```sql
UPDATE orders 
SET id = 'ORD-2026-0005', 
    stato = 'da_confermare',
    riferimento_preventivo = 'PRV-2026-0003'  -- vecchio ID
WHERE id = 'PRV-2026-0003';
```
Le tabelle collegate (`order_lines`, `payments`, `attachments`) si aggiorneranno automaticamente grazie alle foreign key con `ON UPDATE CASCADE` (da verificare; in caso contrario, l'update dell'ID potrebbe richiedere una migration per aggiungere `ON UPDATE CASCADE`).

