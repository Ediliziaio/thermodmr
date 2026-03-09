

# Miglioramento UX Rivenditori con Mini-Dashboard e Indicatori di Attività

## Cosa cambia

La pagina Rivenditori avrà una **mini-dashboard in alto** con KPI aggregati su tutti i rivenditori, e ogni rivenditore mostrerà indicatori di attività come "ultimo ordine" e "giorni dall'ultimo ordine" con badge colorati per evidenziare rivenditori inattivi.

## Modifiche

### 1. Database: Aggiornare la view `dealers_with_stats`
Aggiungere alla view:
- `last_order_date` — data dell'ultimo ordine inserito
- `last_order_id` — ID dell'ultimo ordine
- `preventivi_count` — numero preventivi attivi

Questi dati vengono calcolati dal subquery laterale esistente senza impatto sulle performance.

### 2. Nuovo componente: `src/components/dealers/DealersMiniDashboard.tsx`
Una riga di 4-5 card KPI compatte sopra i filtri:
- **Rivenditori Totali** — conteggio
- **Fatturato Totale** — somma `total_revenue`
- **Incassato Totale** — somma `total_paid`
- **Da Incassare** — somma `total_remaining` (ambra se > 0)
- **Rivenditori Inattivi** — quanti non fanno ordini da >30 giorni (badge rosso)

I dati vengono calcolati client-side da `allDealers` già disponibili, senza query extra.

### 3. `src/pages/Dealers.tsx`
- Inserire `DealersMiniDashboard` tra header e filtri
- Passare `allDealers` e `totalCount` al componente

### 4. `src/components/dealers/DealerRowView.tsx`
- Aggiungere colonna "Ultimo Ordine" nel grid (con data formattata)
- Mostrare un badge colorato nell'espansione:
  - **Verde**: ultimo ordine < 15 giorni
  - **Giallo**: 15-30 giorni
  - **Rosso**: > 30 giorni o mai ordinato
- Aggiornare grid a `grid-cols-[2fr_1.2fr_0.6fr_1fr_1fr_1fr_0.8fr]`

### 5. `src/components/dealers/DealerCard.tsx`
- Aggiungere indicatore "Ultimo ordine: X giorni fa" con colore semantico nella sezione stats

### 6. `src/components/dealers/MobileDealerCard.tsx`
- Aggiungere badge "Ultimo ordine: X gg fa" con colore semantico

### 7. `src/hooks/useDealers.ts` — Aggiornare tipo `DealerWithStats`
- Aggiungere campi opzionali: `last_order_date?: string`, `last_order_id?: string`, `preventivi_count?: number`

## Dettaglio tecnico

La view aggiornata aggiungerà al subquery laterale:
```sql
max(o.data_inserimento) AS last_order_date,
(SELECT o2.id FROM orders o2 WHERE o2.dealer_id = d.id ORDER BY o2.data_inserimento DESC LIMIT 1) AS last_order_id,
count(o.id) FILTER (WHERE o.stato = 'preventivo') AS preventivi_count
```

La logica "giorni di inattività" è calcolata client-side con `differenceInDays(new Date(), new Date(dealer.last_order_date))` usando `date-fns`.

