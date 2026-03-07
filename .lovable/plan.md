

# Verifica Allegati Preventivo — Problemi Trovati

## Stato Attuale

L'implementazione degli allegati nel dialog di creazione preventivo e' funzionalmente corretta nella struttura, ma presenta **2 bug reali** e **1 inconsistenza** da correggere.

---

## Bug 1 (CRITICO): `getPublicUrl` su bucket privato

**File coinvolti:** `NewPreventivoDialog.tsx` (riga 185-187), `AttachmentsSection.tsx` (riga 83-85)

Il bucket `order-attachments` e' privato (`Is Public: No`). Il codice usa `getPublicUrl()` che genera un URL non accessibile — il download/visualizzazione degli allegati **non funziona**.

**Fix:** Salvare nel DB il **path dello storage** (es. `preventivoId/timestamp-random.ext`) invece dell'URL pubblico. Quando l'utente vuole scaricare, generare un signed URL temporaneo con `createSignedUrl()`.

Interventi:
- `NewPreventivoDialog.tsx`: salvare `fileName` (path) come `url` nel record `attachments`
- `AttachmentsSection.tsx`: stessa correzione per upload + usare `createSignedUrl` nel download
- Entrambi i file usano lo stesso pattern, la fix e' identica

## Bug 2: `useCreatePreventivo` contiene codice morto

**File:** `src/hooks/useOrders.ts` (righe 500-501, 513, 531-533)

- Riga 513: `data_consegna_prevista: values.data_consegna_prevista || null` — il campo non viene piu' passato dal dialog. Codice morto.
- Righe 500-501 e 531-533: il calcolo `afterDiscount * (1 + line.iva / 100)` include ancora l'IVA. Con `iva: 0` funziona (`* 1`), ma e' inconsistente con il dialog.

**Fix:** Rimuovere `data_consegna_prevista` dal payload e semplificare il calcolo totale rimuovendo la moltiplicazione IVA (allinearlo a `calculateLineTotal` del dialog).

## Riepilogo

| # | Tipo | File | Problema |
|---|------|------|----------|
| 1 | Bug critico | NewPreventivoDialog + AttachmentsSection | `getPublicUrl` su bucket privato, download non funziona |
| 2 | Cleanup | useOrders.ts | Codice morto IVA e data_consegna nel hook preventivo |

