

# Filtri Ordini: Stile Dashboard con Default Anno Corrente

## Problema
I filtri della pagina Ordini sono brutti e scomodi. Non c'e' un default sull'anno corrente e manca il segmented control compatto come nella Dashboard.

## Soluzione

### `src/pages/Orders.tsx`
- Aggiungere stato `activeFilter` inizializzato a `"year"` e `dateRange` con anno corrente (come Dashboard)
- Aggiungere segmented control pill-style identico alla Dashboard: **3M, 6M, Anno, Anno Scorso, Tutto**
- Posizionarlo nella riga header accanto al titolo (o nella riga dealer/view toggle)
- Passare `dateRange` al filtro `dataInserimentoFrom`/`dataInserimentoTo` nel `filters` state
- Aggiungere funzione `setQuickFilter` identica alla Dashboard
- Aggiungere icona calendario per selezione personalizzata
- Rimuovere i campi date dal pannello filtri avanzati (ora sono nel segmented control)

### `src/components/orders/OrderFilters.tsx`
- Rimuovere la sezione "Periodo" (date range Da/A) dal pannello avanzato, dato che e' gestita dal segmented control in Orders.tsx
- I filtri avanzati rimangono solo: Stato, Pagamento, Importo

### Modifiche minime, stesso pattern della Dashboard.

