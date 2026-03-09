

# Analisi Dashboard — Stato, Criticita e Miglioramenti

## Struttura Attuale

La Dashboard e composta da:
- **4 KPI Cards** (Ricavi, Acconti, Incassato, Da Saldare) con delta % vs periodo precedente
- **Status Badges Row** — badge cliccabili per stato ordine
- **Collection Progress Bar** — barra progresso incassi
- **Revenue Chart** — grafico linee ricavi/acconti/incassato mensili
- **Deadlines Widget** — scadenze imminenti (14 giorni)
- **Order Status Pie Chart** — distribuzione ordini per stato
- **Recent Orders Widget** — ultimi 5 ordini aggiornati
- **Top 5 Dealers** — classifica rivenditori per fatturato

Hooks: `useDashboardKPIs`, `useRevenueData`, `useRecentOrders`, `useUpcomingDeadlines`

---

## Problemi Trovati

### 1. Revenue Chart: il filtro date non funziona correttamente (MEDIO)

L'RPC `get_revenue_by_month` accetta solo `p_months` (intero), non date precise. Quando l'utente seleziona "Anno 2025" o un range custom, il hook calcola approssimativamente il numero di mesi e poi filtra client-side.

Il problema: l'RPC usa `to_char(month_date, 'Mon YYYY')` che produce label in **inglese** (es. "Mar 2026", "Jan 2026") — ma il codice client include un map con nomi italiani ("Gen", "Mag", "Giu", ecc.). Se il server Postgres ha locale italiano, usciranno "Gen", "Mar" ecc.; se ha locale inglese (default), usciranno "Jan", "Mar" ecc. Il comportamento e **non deterministico** e dipende dalla configurazione del server.

**Fix:** Modificare l'RPC per accettare `p_start_date` e `p_end_date` (timestamptz) e ritornare un campo `month_date` in formato ISO oltre alla label. Cosi il filtro client-side usa date precise.

### 2. RecentOrders non rispetta i filtri temporali (BASSO)

`useRecentOrders` non riceve `startDate`/`endDate` — mostra sempre gli ultimi 5 ordini globali, ignorando il filtro periodo selezionato. Non e necessariamente un bug (puo essere voluto), ma e incoerente con il resto della dashboard.

### 3. Top Dealers: nessun delta indicator (BASSO)

Le KPI cards hanno i delta % (frecce su/giu), ma la sezione Top Dealers no. Non si capisce se un dealer sta crescendo o diminuendo.

### 4. Pie Chart: non filtra per preventivi (BASSO)

Il colore `preventivo` e definito in `STATUS_CHART_COLORS` ma i preventivi non sono inclusi nei dati `ordersByStatus` dell'RPC (che conta solo ordini). Colore morto, nessun impatto ma codice inutile.

### 5. Dashboard non mostra stato "preventivo" nei badge (BASSO)

`StatusBadgesRow` itera solo su `STATUS_ORDER` che non include "preventivo". Coerente con l'RPC, ma se i preventivi sono gestiti nella stessa tabella ordini, potrebbero mancare dal conteggio.

### 6. Nessun empty state per il Revenue Chart (BASSO)

Se `revenueData` e un array vuoto (nessun dato nel periodo), il grafico mostra un rettangolo vuoto senza messaggio. Dovrebbe mostrare "Nessun dato per questo periodo".

---

## Cose che Funzionano Bene

- KPI con delta % e resilienza (comparison errors ignorati silenziosamente)
- Filtri temporali con pill segmentate + calendar picker custom
- Skeleton loading states corretti
- Error state con retry button
- Realtime sync attivo
- Mobile responsive su tutti i widget
- Top Dealers cliccabili con navigazione
- Deadlines con urgency colors e importo residuo
- `staleTime` e `gcTime` configurati (5/10 min)

---

## Piano di Intervento

### Fix 1 — Revenue Chart: RPC con date range (priorita MEDIA)
- Creare una nuova RPC `get_revenue_by_date_range(p_start_date, p_end_date, p_commerciale_id)` che accetta date precise
- L'RPC genera la serie di mesi tra le due date e ritorna sia la label (`to_char` con formato fisso) che un campo `month_iso` (es. "2026-03")
- Aggiornare `useRevenueData` per chiamare la nuova RPC e rimuovere il filtro client-side

### Fix 2 — Empty state Revenue Chart (priorita BASSA)
- In `RevenueChart`, se `data.length === 0`, mostrare un messaggio centrato "Nessun dato per questo periodo"

### Fix 3 — Rimuovere colore "preventivo" inutilizzato (cleanup)
- Rimuovere `preventivo` da `STATUS_CHART_COLORS` dato che non viene mai usato nel pie chart

