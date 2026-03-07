

# Aggiungere cambio stato inline nella tabella Ordini

## Cosa
Nella colonna "Stato" della tabella ordini (vista lista), sostituire il Badge statico con un Select dropdown che permette di cambiare lo stato direttamente dalla tabella, senza dover entrare nel dettaglio ordine.

## Come

### `src/pages/Orders.tsx`
- Importare `useUpdateOrderStatus` da `@/hooks/useOrders`
- Importare `Select, SelectContent, SelectItem, SelectTrigger, SelectValue` (già importati)
- Nella cella dello stato (righe ~511-522), sostituire il Badge statico con un `Select` inline:
  - Il trigger mostra il Badge colorato attuale
  - Le opzioni sono i 6 stati del workflow (da_confermare → consegnato)
  - Al cambio, chiama `updateStatus.mutate({ orderId, stato })`
  - Visibile solo per `super_admin` (i rivenditori vedono il badge statico)
- Aggiungere `e.stopPropagation()` sul Select per evitare conflitti con il click sulla riga

### Dettagli UI
- Il Select trigger avrà stile compatto, senza bordo visibile (variant ghost), mostrando il Badge colorato come contenuto
- Ogni opzione nel dropdown mostra il pallino colorato + label dello stato
- Feedback tramite toast già gestito dal hook `useUpdateOrderStatus`

