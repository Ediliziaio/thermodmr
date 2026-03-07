

# Ottimizzazione UX Filtri Ordini — Eliminare Spazi e Compattare

## Problema
Dallo screenshot si vedono troppi livelli verticali separati: ricerca full-text, quick filters, filtri avanzati — ognuno con spacing `space-y-4` che crea molto "aria morta". Le date nei filtri avanzati usano input `type="date"` poco leggibili. I filtri occupano troppo spazio verticale prima di arrivare ai dati.

## Modifiche

### `src/components/orders/OrderFilters.tsx`
- **Compattare tutto in una riga**: Ricerca + Quick Filters + Filtri Avanzati su una singola riga flex-wrap, eliminando `space-y-4` tra i blocchi
- **Ridurre spacing**: `space-y-4` → `space-y-2`, padding Card filtri avanzati `pt-6` → `pt-4`, gap `gap-4` → `gap-3`
- **Rimuovere campo "Ricerca" duplicato** nei filtri avanzati (è già presente come ricerca full-text sopra)
- **Rimuovere campo "Rivenditore" duplicato** nei filtri avanzati (è già presente come Select nell'header della pagina)
- **Date**: Raggruppare "Da" e "A" in una riga orizzontale con label più corte ("Da" / "A")
- **Importi**: Raggruppare min/max su una riga con placeholder più compatti
- **Filtri avanzati Card**: Rimuovere il wrapper `Card` e usare un semplice div con border-top per risparmiare spazio

### `src/pages/Orders.tsx`
- **Ridurre spacing generale**: `space-y-6` → `space-y-4` nel container principale
- **Compattare KPI cards**: Ridurre padding con `py-3` invece del default, testo più piccolo
- **Rimuovere `CardHeader`+`CardContent` separati** nelle KPI card — usare un singolo `CardContent` con layout inline

