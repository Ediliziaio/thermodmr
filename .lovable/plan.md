

# Miglioramento UX Preventivi: Filtri Data e Colori Stato

## Modifiche in `src/pages/DealerPreventivi.tsx`

### 1. Filtri data (Da / A)
- Aggiungere due stati: `dateFrom: Date | undefined` e `dateTo: Date | undefined`
- Due date picker (Popover + Calendar) nella barra filtri, inline con search e dealer select
- Filtrare `data_inserimento` nel `filteredPreventivi` useMemo
- Includere date nei `hasActiveFilters` e nel reset filtri

### 2. Colori migliorati per stato
- **KPI Cards**: aggiungere bordo colorato sinistro (`border-l-4`) — blu per Totale, amber per Valore, emerald per Validi, red per Scaduti
- **Badge Valido**: passare da `variant="secondary"` a stile con sfondo verde chiaro (`bg-emerald-500/10 text-emerald-700`)
- **Badge Scaduto**: mantenere `variant="destructive"` ma aggiungere icona animata (pulse)
- **Righe tabella Valide**: leggero sfondo verde (`bg-emerald-50/50 dark:bg-emerald-950/20`) per distinguerle visivamente dai scaduti (già rossi)
- **Mobile cards Valide**: bordo sinistro verde, Scadute: bordo sinistro rosso (già presente parzialmente)

### 3. Import aggiuntivi
- `format` da `date-fns`, `CalendarIcon` da lucide
- `Popover, PopoverContent, PopoverTrigger` e `Calendar` da shadcn

Tutto client-side, nessuna modifica DB.

