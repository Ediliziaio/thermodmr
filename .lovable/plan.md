

# KPI Preventivi dinamici in base ai filtri

## Problema
Le 4 KPI cards (Totale, Valore, Validi, Non Validi) calcolano le statistiche su **tutti** i preventivi, ignorando i filtri attivi (rivenditore, stato, date, ricerca). L'utente si aspetta che selezionando un rivenditore, i totali si aggiornino di conseguenza.

## Modifica

### `src/pages/DealerPreventivi.tsx` — linee 126-134
- Cambiare la sorgente dati del `useMemo` `stats` da `preventivi` a `filteredPreventivi`
- Aggiornare la dependency array da `[preventivi]` a `[filteredPreventivi]`

Questo fa si che le KPI cards mostrino sempre i valori coerenti con i filtri attualmente attivi (rivenditore selezionato, stato, range date, ricerca testuale).

Una modifica di 2 righe.

