

## Aggiungere Pagamenti alla sidebar e filtrare ordini per dealer

### Modifiche previste

**1. `src/components/DealerAreaLayout.tsx`**
- Aggiungere la voce "Pagamenti" nella sidebar con icona `CreditCard`
- Route: `/rivenditori/:id/area/pagamenti`

**2. `src/pages/DealerArea.tsx`**
- Aggiungere la route per i pagamenti: `pagamenti` -> componente `Pagamenti` (lazy loaded)
- Passare il `dealerId` come prop/context ai componenti figli per filtrare i dati
- Per gli ordini: passare `dealerId` come prop a `Orders` per pre-filtrare
- Per i pagamenti: passare `dealerId` come prop a `Pagamenti` per pre-filtrare

**3. `src/hooks/useOrdersInfinite.ts`**
- Aggiungere parametro opzionale `dealerId` all'interfaccia `UseOrdersInfiniteParams`
- Se `dealerId` e' presente, aggiungere `.eq("dealer_id", dealerId)` alla query
- Aggiungere `dealerId` alla `queryKey` per cache separata

**4. `src/pages/Orders.tsx`**
- Accettare prop opzionale `dealerId?: string`
- Passare `dealerId` a `useOrdersInfinite`
- Quando `dealerId` e' presente: nascondere il filtro per rivenditore (non serve), nascondere il bottone "Nuovo Ordine" (il rivenditore non crea ordini da qui), e aggiornare la navigazione per i dettagli ordine per usare path relativi all'area rivenditore

**5. `src/hooks/usePaymentsInfinite.ts`**
- Aggiungere parametro opzionale `dealerId`
- Se presente, filtrare i pagamenti per ordini appartenenti a quel dealer (join con orders)
- Aggiungere `dealerId` alla `queryKey`

**6. `src/pages/Pagamenti.tsx`**
- Accettare prop opzionale `dealerId?: string`
- Passare `dealerId` a `usePaymentsInfinite`
- Quando `dealerId` e' presente: nascondere il bottone "Nuovo Pagamento" (il rivenditore non registra pagamenti), aggiornare la navigazione ordini per usare path relativi all'area

### Dettagli tecnici

La navigazione ai dettagli ordine dall'area rivenditore usera' il path `/rivenditori/:id/area/ordini/:orderId` invece di `/ordini/:orderId`, cosi' l'utente resta nel contesto dell'area rivenditore.

Il filtro `dealerId` viene applicato a livello di query database (non solo lato client) per efficienza e sicurezza.
