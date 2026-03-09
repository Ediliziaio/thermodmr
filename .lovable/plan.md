

# Analisi Sezione Ordini — Criticita, Performance e Miglioramenti

## Struttura Analizzata

**Files principali:**
- `Orders.tsx` (637 righe) — Lista ordini con filtri, pipeline, bulk actions
- `OrderDetail.tsx` (927 righe) — Dettaglio ordine/preventivo
- `OrdersTable.tsx` (275 righe) — Tabella desktop estratta
- `useOrdersInfinite.ts` — Query infinita con view pre-aggregata
- `useOrders.ts` (695 righe) — Hooks CRUD per ordini
- `OrderFilters.tsx` — Filtri avanzati
- `OrderPipelineDnD.tsx` — Vista Kanban con drag & drop
- `OrderMobileCard.tsx` — Card mobile con swipe gestures

---

## CRITICITA

### 1. Filtri date duplicati e incoerenti (BUG LOGICO)

`Orders.tsx` mantiene **due stati separati** per le date:
- `dateRange` (riga 57-60): usato dai quick filter pills (3M, 6M, Anno)
- `filters.dataInserimentoFrom/To` (riga 66-69): usato da `OrderFilters`

Un `useEffect` (righe 129-135) sincronizza `dateRange → filters`, ma `OrderFilters.clearFilters()` (riga 43) resetta `filters` a `{}` **senza aggiornare `dateRange`**. Il prossimo render ri-sincronizza dal `dateRange` invariato, rendendo impossibile azzerare i filtri temporali dal pannello filtri avanzati.

Inoltre, la ricerca server-side (`searchQuery`) e i filtri avanzati (`filters`) operano su **due livelli diversi**: la ricerca va al DB (riga 43 di `useOrdersInfinite`), ma tutti gli altri filtri (stato, dealer, importo, date) sono **client-side** sul dataset gia scaricato. Con migliaia di ordini su piu pagine, un filtro "stato = consegnato" mostrera solo i consegnati nelle pagine gia caricate, non tutti.

**Gravita: ALTA** — I filtri possono mostrare dati incompleti.

### 2. OrderDetail.tsx: 927 righe, bottoni placeholder

`OrderDetail.tsx` e il file piu grande del progetto. Contiene:
- Status stepper + modifica stato
- Editing ID ordine inline
- Conversione preventivo → ordine
- Note con tabs
- Calendario produzione/consegna/settimana
- Sezione pagamenti, allegati, ticket
- Navigation guard con unsaved changes
- Save bar globale

I bottoni **"Esporta PDF"** e **"Invia Email"** (righe 396-400, 413-420) non hanno alcun handler — sono decorativi.

**Gravita: MEDIA** — Confusione UX.

### 3. generateOrderId / generatePreventivoId: race condition

`generateOrderId()` (riga 329-348) e `generatePreventivoId()` (riga 308-327) fanno una query per trovare l'ultimo ID e incrementano. Se due utenti creano un ordine contemporaneamente, entrambi leggono lo stesso "ultimo ID" e generano lo stesso nuovo ID, causando un conflitto di primary key.

**Gravita: MEDIA** — Raro con pochi utenti, ma cresce col volume.

### 4. useUpdateOrderLines: delete + insert non atomico

`useUpdateOrderLines` (riga 462-530) fa prima DELETE di tutte le righe, poi INSERT delle nuove. Se l'INSERT fallisce, le righe originali sono gia eliminate — **perdita dati**. Dovrebbe usare una transazione o un RPC.

**Gravita: MEDIA** — Perdita dati possibile in caso di errore di rete.

### 5. OrdersTable: tipo `any[]` per orders

`OrdersTableProps` usa `orders: any[]` (riga 21) — perde tutti i benefici del type-checking. Dovrebbe usare `OrderWithPaymentStats[]`.

**Gravita: BASSA** — No runtime impact, ma facilita bug futuri.

---

## PERFORMANCE

### 6. Filtri client-side su dataset parziale

Come descritto al punto 1, i filtri stato/dealer/importo/date sono tutti client-side (`filteredOrders` useMemo, righe 172-237). Questo significa:
- Con 500 ordini su 10 pagine, se l'utente ha caricato solo 2 pagine (100 ordini), il filtro mostra solo i risultati di quelle 2 pagine
- Le statistiche header (righe 249-255) sono calcolate sui dati parziali, non sul totale reale

**Fix suggerito:** Spostare i filtri critici (stato, dealer, date) nella query server-side dentro `useOrdersInfinite`.

### 7. Sort client-side ricalcolato ad ogni render

Il sort (righe 213-237) viene ricalcolato dentro il `useMemo` di `filteredOrders` ad ogni cambio di filtri o sort direction. Con centinaia di ordini, il `.sort()` con `localeCompare` e multipli switch e relativamente pesante.

**Impatto:** Basso con <500 ordini, ma cresce linearmente.

### 8. OrderPipelineDnD: re-render completo al drop

Il drag & drop usa `useUpdateOrderStatus` che invalida `orders-infinite`, causando il re-fetch di tutte le pagine e il re-render di tutte le card nella pipeline.

---

## MIGLIORAMENTI SUGGERITI

### Fase 1 — Fix filtri (ALTA priorita)
1. **Spostare filtri server-side**: Aggiungere `stato`, `dealerId`, `dataFrom`, `dataTo` come parametri di `useOrdersInfinite`, passandoli alla query Supabase
2. **Rimuovere la duplicazione `dateRange`/`filters`**: Usare un singolo stato per le date
3. **Correggere `clearFilters`**: Deve resettare anche i quick filter pills

### Fase 2 — Sicurezza dati (MEDIA priorita)
4. **generateOrderId**: Migrare a una Postgres sequence o RPC che usa `nextval()` per evitare race condition
5. **useUpdateOrderLines**: Creare un RPC `update_order_lines` che faccia delete+insert+update totale in una transazione

### Fase 3 — Cleanup (BASSA priorita)
6. **Rimuovere o implementare bottoni PDF/Email** in OrderDetail
7. **Tipizzare `OrdersTable`** con `OrderWithPaymentStats[]` invece di `any[]`
8. **OrderDetail.tsx**: Estrarre la sezione "Produzione & Consegna" (righe 718-840) in un componente `OrderSchedulingCard`

