

# Miglioramento UX Dettaglio Ordine + Nuovo stato "Da Saldare" + Colori fasi

## Cosa cambia

### 1. Nuovo stato "Da Saldare" nel workflow
Aggiungere `da_saldare` all'enum `order_status` nel database, posizionato tra `in_lavorazione` e `da_consegnare`. Il workflow diventa:

```text
Preventivo → Da Confermare → Da Pagare Acconto → In Lavorazione → Da Saldare → Da Consegnare → Consegnato
```

**Migrazione DB**: `ALTER TYPE order_status ADD VALUE 'da_saldare' BEFORE 'da_consegnare';`

### 2. Colori distintivi per ogni fase (stepper + badge)
Ogni fase avrà un colore unico e riconoscibile:

| Stato | Colore Stepper (cerchio) | Badge |
|---|---|---|
| Preventivo | Grigio/Slate | `bg-slate-500/10 text-slate-700` |
| Da Confermare | Giallo/Amber | `bg-yellow-500/10 text-yellow-700` |
| Da Pagare Acconto | Arancione | `bg-orange-500/10 text-orange-700` |
| In Lavorazione | Blu | `bg-blue-500/10 text-blue-700` |
| **Da Saldare** | **Rosso** | `bg-red-500/10 text-red-700` |
| Da Consegnare | Viola | `bg-purple-500/10 text-purple-700` |
| Consegnato | Verde | `bg-green-500/10 text-green-700` |

### 3. StatusStepper con colori per fase
Attualmente lo stepper usa un unico colore (`primary`) per completato/corrente. Cambiare per usare il colore specifico di ogni fase sia per il cerchio che per la linea di connessione, rendendo il progresso visivamente più ricco.

### 4. Miglioramento UX pagina dettaglio
- Stepper più compatto e visivamente pulito
- Colori coerenti tra stepper, badge e filtri

## File da modificare

### Migrazione DB
- Aggiungere `da_saldare` all'enum `order_status`

### `src/lib/utils.ts`
- `getStatusColor`: aggiungere `da_saldare` con colore rosso
- `getStatusLabel`: aggiungere `da_saldare` → "Da Saldare"
- `getStatusVariant`: aggiungere caso `da_saldare`

### `src/components/orders/StatusStepper.tsx`
- Aggiungere step `da_saldare` (number 4, spostare da_consegnare a 5, consegnato a 6)
- Usare colori specifici per fase: ogni cerchio completato/corrente ha il suo colore
- Linea di connessione colorata con il colore della fase completata

### `src/pages/OrderDetail.tsx`
- Aggiungere `<SelectItem value="da_saldare">Da Saldare</SelectItem>` nel dropdown stato

### `src/components/orders/OrderFilters.tsx` + `MobileOrderFilters.tsx`
- Aggiungere opzione `da_saldare` nei filtri stato

### `src/components/orders/BulkUpdateStatusDialog.tsx`
- Aggiungere `da_saldare` nelle opzioni di aggiornamento massivo

### `src/lib/exportUtils.ts`
- Aggiungere mapping `da_saldare` → "Da Saldare"

### `src/components/analytics/ConversionFunnelChart.tsx`
- Aggiungere `da_saldare` nel funnel

### `src/components/analytics/charts/OrdersDistributionChart.tsx`
- Aggiungere colore per `da_saldare`

### `src/pages/Dashboard.tsx`
- Aggiungere colore chart per `da_saldare`

### `src/pages/DealerDetail.tsx`
- Aggiungere conteggio `da_saldare` in ordersByStatus

### `src/hooks/useDashboard.ts` + `useDealerDashboard.ts`
- Aggiungere `da_saldare` nei tipi e conteggi

