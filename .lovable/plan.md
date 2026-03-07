

# Rimuovere la Timeline Pagamenti dalla pagina Dettaglio Ordine

## Cosa cambia
Rimuovere il componente `PaymentTimelineChart` dalla pagina di dettaglio ordine (`src/pages/OrderDetail.tsx`). Il riepilogo pagamenti con barra di progresso nella `PaymentsSection` è già sufficiente.

## Modifiche

### `src/pages/OrderDetail.tsx`
1. Rimuovere l'import di `PaymentTimelineChart` (riga 41)
2. Rimuovere il blocco condizionale che renderizza `PaymentTimelineChart` (righe 599-604 circa)

Il componente `PaymentTimelineChart` in `src/components/analytics/charts/` viene mantenuto nel codebase in caso serva altrove (es. Analytics).

