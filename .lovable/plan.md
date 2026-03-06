

# Preventivi: Statistiche, Filtri e UX migliorata

## Stato attuale
La pagina `/preventivi` (`DealerPreventivi.tsx`) mostra solo una lista piatta senza statistiche, senza filtri e senza la colonna rivenditore (che pure viene caricata dal DB via join `dealers(ragione_sociale)`).

## Interventi

### 1. Statistiche KPI in alto (4 card)
Calcolare dai dati già in memoria (`preventivi`):
- **Totale Preventivi** — conteggio
- **Valore Totale** — somma `importo_totale`, formattato con `formatCurrency`
- **Validi** — conteggio dove `data_scadenza_preventivo` non scaduto o null
- **Scaduti** — conteggio scaduti
- **Tasso Conversione** — (opzionale, richiede conteggio ordini convertiti; se troppo complesso, mostrare ticket medio al suo posto)

Layout: griglia 2 colonne mobile, 4 colonne desktop. Stile coerente con `MetricCard` ma senza "change" (non serve il confronto periodo).

### 2. Barra Filtri
Aggiungere sotto le statistiche, prima della tabella:
- **Ricerca testo** — filtra per ID preventivo (client-side, dato che i dati sono già in memoria)
- **Filtro Rivenditore** — Select con lista dealer estratta dai preventivi stessi (`dealers.ragione_sociale`). Filtra per `dealer_id`
- **Filtro Stato** — "Tutti", "Validi", "Scaduti" — quick filter buttons come nella pagina Ordini
- **Filtro Importo** — range min/max (opzionale, nei filtri avanzati collassabili)

Tutto client-side: filtrare l'array `preventivi` già caricato.

### 3. Colonna Rivenditore nella tabella
La query già carica `dealers(ragione_sociale)`. Aggiungere:
- **Desktop**: colonna "Rivenditore" nella tabella
- **Mobile**: riga con nome rivenditore nella card

### 4. Conteggio risultati
Mostrare `{filteredPreventivi.length} preventivi` sotto i filtri, per feedback immediato.

## File da modificare

**`src/pages/DealerPreventivi.tsx`** — unico file:
- Aggiungere stati per filtri (`searchTerm`, `dealerFilter`, `statusFilter`)
- Calcolare `filteredPreventivi` da `preventivi` con `useMemo`
- Calcolare statistiche KPI da `preventivi` con `useMemo`
- Renderizzare 4 card KPI sopra la tabella
- Renderizzare barra filtri (search input + select dealer + quick filter buttons)
- Aggiungere colonna Rivenditore al desktop table e alla mobile card
- Mostrare conteggio risultati filtrati

Nessuna modifica DB, nessun nuovo componente. Tutto in-page, filtri client-side.

