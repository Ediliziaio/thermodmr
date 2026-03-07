

# Miglioramento UX Dettaglio Ordine

## Cosa cambia

### 1. Nuove colonne DB
Aggiungere due campi alla tabella `orders`:
- `data_fine_produzione` (date, nullable) — data di fine produzione
- `settimana_consegna` (integer, nullable) — settimana dell'anno per la consegna (1-53)

### 2. Righe ordine editabili (semplificate)
Attualmente le righe ordine nel dettaglio sono read-only (tranne per stato `da_confermare`). Cambiamenti:
- Rendere le righe **sempre editabili** per super_admin, indipendentemente dallo stato
- Semplificare la vista: mostrare solo **Descrizione** e **Prezzo** (usare `simplified` mode come nei preventivi)
- Aggiungere il pulsante "Salva Prodotti" sotto l'editor (come già fatto per i preventivi)

### 3. Nuovi campi date nella sidebar
Nella card "Informazioni Ordine" aggiungere:
- **Data Fine Produzione**: input date editabile da super_admin
- **Settimana Consegna**: input numerico (1-53) con label che mostra il range di date corrispondente
- Entrambi salvabili con un'unica mutation `useUpdateOrderDates`

### 4. Layout ordine migliorato
Riorganizzare il layout ordine per allinearlo a quello dei preventivi:
- Note Rivenditore e Note Interne spostate in Tabs nella colonna principale (come i preventivi)
- Sidebar più pulita: Riepilogo Economico + Informazioni Ordine + Date Produzione/Consegna

## File da modificare

### Migrazione DB
- Aggiungere `data_fine_produzione date` e `settimana_consegna integer` alla tabella `orders`

### `src/hooks/useOrders.ts`
- Aggiungere `useUpdateOrderDates` mutation per salvare `data_fine_produzione`, `settimana_consegna`, `data_consegna_prevista`

### `src/pages/OrderDetail.tsx`
- Righe ordine: passare `simplified`, aggiungere `onLinesChange` con stato e pulsante salva
- Sidebar: aggiungere input per data fine produzione e settimana consegna
- Note: unificare in Tabs come i preventivi
- Rendere `data_consegna_prevista` editabile inline

### `src/components/orders/OrderLinesEditor.tsx`
- Rimuovere restrizione su `canEdit` per super_admin (permettere editing in tutti gli stati)

