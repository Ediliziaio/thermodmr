

## Pulizia, Fix e Miglioramenti UX - Dashboard Super Admin

### 1. PULIZIA CODICE

#### Duplicati da rimuovere

| Cosa | Dove | Problema |
|------|------|----------|
| `getStatusLabel()` locale | `DeadlinesWidget.tsx` (righe 19-28) | Duplica la funzione gia presente in `src/lib/utils.ts` |
| `formatCurrency()` locale | `DeadlinesWidget.tsx` (righe 38-44) | Duplica la funzione gia presente in `src/lib/utils.ts` |
| `useRealtimeDashboard` hook intero | `src/hooks/useRealtimeDashboard.ts` | Duplica quasi interamente `useRealtimeSync` (stesso canale orders/payments/dealers/commissions). La Dashboard dovrebbe usare `useRealtimeSync` |
| Sezione "Ordini per Stato" (badges) | `Dashboard.tsx` (righe 347-398) | Duplica visivamente il Pie Chart sopra. Informazione ridondante |
| Pie Chart in grid mezzo vuoto | `Dashboard.tsx` (righe 333-345) | `md:grid-cols-2` con solo 1 elemento = meta pagina vuota |
| Import `CardDescription` | `Dashboard.tsx` riga 2 | Non usato direttamente nel componente |
| Import `Badge` | `Dashboard.tsx` riga 3 | Usato solo nella sezione badges ridondante che verra rimossa |
| Import `Carousel*` | `Dashboard.tsx` riga 8 | Usato solo nella sezione mobile ridondante |

#### File da eliminare
- `src/hooks/useRealtimeDashboard.ts` -- sostituito da `useRealtimeSync`

### 2. FIX FUNZIONALI

| Bug | Dettaglio | Fix |
|-----|-----------|-----|
| `activeFilter` non si resetta con il picker | Se selezioni "Mese Scorso" poi usi il calendario manuale, il bottone "Mese Scorso" resta evidenziato | Aggiungere `setActiveFilter(null)` nel `onSelect` del Calendar |
| `daSaldare` potenzialmente negativo | Se `totalIncassato > totalRevenue` (pagamenti extra), il valore "Da Saldare" diventa negativo | Wrappare con `Math.max(0, ...)` |
| Percentuale "Da Saldare" puo essere > 100% o NaN | Se totalRevenue e 0 mostra "0% del totale" ma la formula puo dare NaN con dati intermedi | Aggiungere guard clause robusta |
| Pie Chart colori hardcoded con `.includes()` | `getStatusColor(status).includes('yellow')` e fragile -- i colori possono cambiare | Usare un mapping diretto `status -> chart color` |
| Error state troppo minimale | Solo testo rosso senza CTA di retry | Aggiungere bottone "Riprova" con `refetch()` |
| `RevenueChart` dice sempre "Ultimi 6 mesi" | Anche quando il filtro e su "Anno Corrente" la descrizione non cambia | Passare una prop `description` dinamica basata sul filtro attivo |

### 3. MIGLIORAMENTI UX

| Miglioramento | Dettaglio |
|---------------|-----------|
| Error state con retry | Card con icona, messaggio chiaro, e pulsante "Riprova" al posto del testo rosso senza via d'uscita |
| Pie Chart full-width con badges integrati | Unire Pie Chart + sezione "Ordini per Stato" in un'unica card full-width, eliminando la duplicazione |
| Top Dealers cliccabili | Aggiungere `onClick` per navigare a `/rivenditori/:id` per ogni dealer nella lista |
| KPI "Da Saldare" con colore condizionale | Evidenziare in rosso/warning quando la percentuale da saldare e alta (>50%) |
| Grafico ricavi: descrizione dinamica | La CardDescription del grafico riflette il filtro attivo (es. "Anno Corrente 2026" invece di "Ultimi 6 mesi") |

### 4. RIEPILOGO FILE MODIFICATI

| File | Tipo modifica |
|------|---------------|
| `src/pages/Dashboard.tsx` | Rimuovere sezione badges duplicata, fix activeFilter, fix colori pie, fix error state, unire pie chart in full-width, top dealers cliccabili, descrizione dinamica grafico |
| `src/components/dashboard/DeadlinesWidget.tsx` | Rimuovere `getStatusLabel` e `formatCurrency` locali, importare da `src/lib/utils.ts` |
| `src/components/dashboard/RevenueChart.tsx` | Aggiungere prop `description` opzionale |
| `src/hooks/useRealtimeDashboard.ts` | ELIMINARE -- sostituito da `useRealtimeSync` |

### 5. DETTAGLIO TECNICO

#### Dashboard.tsx - Modifiche principali

**Import puliti**: rimuovere `Carousel*`, `Badge`, `CardDescription` (non piu necessari dopo rimozione sezione duplicata).

**Realtime**: cambiare `useRealtimeDashboard()` in `useRealtimeSync()`.

**Pie Chart**: spostare in una card full-width con mapping colori diretto:
```text
const STATUS_CHART_COLORS: Record<string, string> = {
  da_confermare: 'hsl(var(--chart-1))',
  da_pagare_acconto: 'hsl(var(--chart-2))',
  in_lavorazione: 'hsl(var(--chart-3))',
  da_consegnare: 'hsl(var(--chart-4))',
  consegnato: 'hsl(var(--chart-5))',
};
```

**Error state migliorato**:
```text
if (kpisError || !kpis) {
  return (
    <Card con icona AlertCircle>
      <Titolo "Errore nel caricamento">
      <Descrizione "Impossibile caricare i dati della dashboard">
      <Button onClick={refetch}>Riprova</Button>
    </Card>
  );
}
```

**activeFilter fix**: nel `Calendar.onSelect`, aggiungere callback che resetta `activeFilter`:
```text
onSelect={(range) => {
  setDateRange(range);
  setActiveFilter(null);
}}
```

**Top Dealers cliccabili**: wrappare ogni riga con `onClick={() => navigate(`/rivenditori/${dealer.id}`)}` e aggiungere `cursor-pointer hover:bg-accent/50`.

#### DeadlinesWidget.tsx - Import fix
Rimuovere le funzioni locali `getStatusLabel` e `formatCurrency`, importare da `@/lib/utils`.

#### RevenueChart.tsx - Prop description
Aggiungere `description?: string` all'interfaccia props. Usare `props.description || "Ultimi 6 mesi"` nel `CardDescription`.

