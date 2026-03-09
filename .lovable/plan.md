

# Piano: Abilitare la chat assistenza nel dettaglio preventivo per il rivenditore

## Problema
Attualmente, quando `isDealerArea` è `true`, la sezione `TicketsSection` è nascosta (righe 543 e 707 di `OrderDetail.tsx`). Il rivenditore non può quindi conversare tramite chat dal dettaglio preventivo.

## Soluzione
Mostrare `TicketsSection` anche nell'area dealer, mantenendo tutto il resto in sola lettura. Il rivenditore potrà creare ticket e conversare, ma non modificare dati del preventivo.

## Modifiche

### `src/pages/OrderDetail.tsx`
- **Riga 543**: Rimuovere la condizione `!isDealerArea` dal rendering di `TicketsSection` nella sezione preventivo.
- **Riga 707**: Rimuovere la condizione `!isDealerArea` dal rendering di `TicketsSection` nella sezione ordine.

In entrambi i casi, passare da:
```tsx
{!isDealerArea && <TicketsSection orderId={order.id} />}
```
a:
```tsx
<TicketsSection orderId={order.id} />
```

Nessun'altra modifica necessaria: `TicketsSection` e `TicketDetailDialog` funzionano già correttamente per i rivenditori (RLS permette creazione e visualizzazione dei propri ticket).

