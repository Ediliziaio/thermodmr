

# Fix: Dashboard crash — `kpis.deltas` undefined

## Problema
L'errore `Cannot read properties of undefined (reading 'revenue')` avviene perché `kpis.deltas` è `undefined`. Probabilmente dati in cache (React Query) da prima dell'aggiunta del campo `deltas`, oppure la RPC `get_dashboard_kpis_comparison` fallisce silenziosamente in un caso edge.

## Soluzione
Aggiungere optional chaining e valori di fallback in due punti:

### `src/pages/Dashboard.tsx`
- Sostituire tutti i riferimenti `kpis.deltas.X` con `kpis.deltas?.X ?? 0` nelle 4 KPI cards (revenue, acconti, incassato, e aggiungere orders se usato)

### `src/hooks/useDashboard.ts`
- Rimuovere il cast `as any` dalla chiamata RPC `get_dashboard_kpis_comparison` dato che il tipo esiste già in types.ts
- Wrappare la chiamata comparison in un try-catch separato per evitare che un errore nella comparison blocchi l'intera dashboard

Modifica minima, risolutiva e difensiva.

