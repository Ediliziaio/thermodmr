

# Piano: Aprire il dettaglio preventivo dalla sezione Rivenditori

## Problema
Quando il rivenditore clicca su un preventivo nella lista, la pagina di dettaglio mostra "Ordine non trovato". Questo perché la route in `DealerArea.tsx` definisce il parametro come `:orderId`, ma `OrderDetail.tsx` lo legge come `useParams<{ id }>()` — risulta `undefined`.

Inoltre, anche se il dettaglio si aprisse, il rivenditore vedrebbe azioni di modifica (textarea note, Duplica, Converti) che non dovrebbe vedere.

## Modifiche

### 1. `src/pages/DealerArea.tsx` — Fix parametro route
Rinominare `:orderId` in `:id` per allinearsi a ciò che `OrderDetail` si aspetta:
```
<Route path="ordini/:id" element={<OrderDetail />} />
```

### 2. `src/pages/OrderDetail.tsx` — Modalità read-only per dealer area
Usare il flag `isDealerArea` già presente per:
- Nascondere i pulsanti "Duplica" e "Converti in Ordine"
- Rendere le textarea delle note in sola lettura
- Nascondere il pulsante "Modifica ID"
- Nascondere l'upload allegati (mostrare solo lista + download)
- Cambiare il testo "Torna agli Ordini" in "Torna ai Preventivi" quando è un preventivo
- Nascondere il FAB "Salva modifiche"

### 3. `src/components/orders/AttachmentsSection.tsx` — Prop read-only
Aggiungere un prop `readOnly?: boolean` per nascondere il pulsante "Carica File" e il pulsante "Elimina" su ogni allegato, mantenendo solo la visualizzazione e il download.

