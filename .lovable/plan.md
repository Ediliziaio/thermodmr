

# Ordini come Copilota Operativo: Vista Tabella + Pipeline Kanban con Drag & Drop

## Panoramica

Trasformare la sezione Ordini da semplice lista a un vero **copilota operativo** con tre viste switchabili (Tabella, Pipeline Kanban, Pipeline con D&D), filtro rivenditore sempre visibile, e azioni rapide inline (pagamenti dalla riga).

## Cosa cambia

### 1. Filtro Rivenditore sempre visibile in alto
Aggiungere un **Select dropdown rivenditore** direttamente nell'header della pagina, sopra ai quick filter. Non serve aprire i filtri avanzati per filtrare per dealer — è il caso d'uso più frequente e deve essere a portata di click.

### 2. Toggle Vista: Tabella / Pipeline / Pipeline D&D
Aggiungere un gruppo di toggle (Tabs) sotto i filtri con 3 modalità:
- **Lista** (attuale tabella) — vista default
- **Pipeline** — Kanban con colonne per stato, card con dettagli ordine
- **Pipeline D&D** — Come Pipeline ma con drag & drop per cambiare stato trascinando le card

### 3. Vista Pipeline (Kanban)
Ogni colonna rappresenta uno stato del workflow (7 colonne). Ogni card mostra:
- ID Ordine
- Rivenditore
- Importo totale + barra progresso pagamento
- Settimana consegna
- Badge alert se in ritardo o saldo scoperto
- Click per andare al dettaglio

Le colonne avranno l'header colorato con il colore della fase (stessi colori dello StatusStepper).

### 4. Vista Pipeline con Drag & Drop
Stessa struttura della Pipeline ma con possibilità di **trascinare** una card da una colonna all'altra per aggiornare lo stato. Usa `framer-motion` (già installato) per le animazioni di drag. Al drop, chiama la mutation di update stato con conferma toast.

### 5. Azione rapida "Registra Pagamento" dalla riga tabella
Aggiungere un bottone inline nella colonna "Importo da Pagare" della tabella. Se c'è saldo scoperto, mostra un piccolo bottone `+` che apre un dialog per registrare un pagamento rapido senza dover entrare nel dettaglio ordine. Riusa la logica del `PaymentsSection`.

## File da creare

### `src/components/orders/OrderPipelineView.tsx`
Componente Kanban con 7 colonne (una per stato). Ogni colonna scrollabile verticalmente. Card compatte con info essenziali. Header colonna con conteggio ordini e totale valore.

### `src/components/orders/OrderPipelineCard.tsx`
Card singola per la pipeline. Mostra: ID, dealer, importo, barra pagamento, settimana, badge alert. Click navigazione al dettaglio.

### `src/components/orders/OrderPipelineDnD.tsx`
Versione drag & drop della pipeline. Usa `framer-motion` `Reorder` o gestione drag nativa. Al drop su colonna diversa → mutation update stato ordine.

### `src/components/orders/QuickPaymentDialog.tsx`
Dialog compatto per registrare un pagamento veloce da una riga della tabella. Campi: importo, metodo, riferimento. Pre-popola con il saldo rimanente.

## File da modificare

### `src/pages/Orders.tsx`
- Aggiungere stato `viewMode` (`"lista" | "pipeline" | "pipeline-dnd"`)
- Aggiungere Select rivenditore always-visible nell'header area
- Aggiungere Tabs per switch vista
- Renderizzare condizionalmente la vista appropriata
- Passare `filteredOrders` e `dealers` ai nuovi componenti

### `src/hooks/useOrders.ts`
- Esporre una mutation `useUpdateOrderStatus` (se non già presente) per il D&D

## Dettagli tecnici

### Drag & Drop con framer-motion
Uso di `motion.div` con `drag`, `dragConstraints`, e `onDragEnd` per rilevare il drop su una colonna target. Calcolo della colonna target tramite coordinate. Nessuna nuova dipendenza necessaria.

### Performance Pipeline
Le card nella pipeline sono componenti memoizzati. Le colonne usano `useMemo` per raggruppare gli ordini per stato. Scroll virtuale non necessario dato il PAGE_SIZE di 50.

### Filtro Rivenditore inline
Il filtro dealer nell'header imposta `filters.dealerId` direttamente, stesso meccanismo dei filtri avanzati ma sempre accessibile.

