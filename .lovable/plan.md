

# Aggiungere ordinamento colonne con frecce su/giù in Ordini e Preventivi

## Cosa cambia
Ogni intestazione di colonna delle tabelle in **Ordini** (`Orders.tsx`) e **Preventivi** (`DealerPreventivi.tsx`) diventerà cliccabile con icone freccia su/giù per ordinare i dati in modo ascendente o discendente.

## Dettaglio tecnico

### 1. Stato di ordinamento
In entrambi i file, aggiungere uno stato `sortConfig`:
- `{ key: string; direction: 'asc' | 'desc' }` — default `{ key: 'data_inserimento', direction: 'desc' }`
- Una funzione `handleSort(key)` che toggli la direzione se si clicca sulla stessa colonna, altrimenti imposta `asc`

### 2. `src/pages/Orders.tsx`
- Aggiungere `sortConfig` state e `handleSort` function
- Nel `useMemo` di `filteredOrders`, dopo il filtraggio, aggiungere un `.sort()` in base a `sortConfig`
- Colonne ordinabili: ID Ordine, Rivenditore, Cliente, Stato, Data Inserimento, Importo Totale, Acconto, Importo da Pagare, Consegna Prevista, Settimana
- Sostituire ogni `<th>` con un `<th>` cliccabile che mostra `ArrowUp`/`ArrowDown`/`ArrowUpDown` da lucide-react

### 3. `src/pages/DealerPreventivi.tsx`
- Stessa logica: `sortConfig` state, `handleSort`, sorting nel `useMemo`
- Colonne ordinabili: ID Preventivo, Rivenditore, Data Creazione, Importo Totale, Scadenza, Stato
- Aggiornare i `<TableHead>` per renderli cliccabili con icone freccia

### 4. Icone
- Colonna attiva ordinamento ascendente: `ArrowUp`
- Colonna attiva ordinamento discendente: `ArrowDown`
- Colonne non attive: `ArrowUpDown` (più piccola e muted)
- Importare `ArrowUp`, `ArrowDown`, `ArrowUpDown` da lucide-react

Nessuna modifica al database o alle API. L'ordinamento è puramente client-side sui dati già filtrati.

