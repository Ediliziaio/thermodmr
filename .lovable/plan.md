

# Fix errore "Invalid time value" nella sezione Pagamenti

## Problema
Il componente `PaymentsSection` usa un'interfaccia `Payment` con campi camelCase (`dataPagamento`, `ordineId`, `ricevutaURL`) ma riceve dati dal database in snake_case (`data_pagamento`, `ordine_id`, `ricevuta_url`). Il cast `as any` nasconde il mismatch. Quando chiama `formatDate(payment.dataPagamento)`, il valore è `undefined` → errore "Invalid time value".

Inoltre, l'enum `PaymentType` usa valori uppercase (`ACCONTO`) ma il DB restituisce lowercase (`acconto`), quindi i badge tipo/colore non funzionano.

## Soluzione in `src/components/orders/PaymentsSection.tsx`

1. **Rimuovere** l'interfaccia `Payment` locale e l'enum `PaymentType`
2. **Usare direttamente i campi snake_case** dal database (`data_pagamento`, `ordine_id`, `tipo`, `metodo`, `riferimento`, `importo`)
3. **Aggiornare l'interfaccia props** per accettare il tipo corretto dal DB (array di record dalla tabella `payments`)
4. **Aggiornare i riferimenti** nel template:
   - `payment.dataPagamento` → `payment.data_pagamento`
   - `payment.ordineId` → `payment.ordine_id`
   - `payment.ricevutaURL` → `payment.ricevuta_url`
   - `payment.tipo` confrontato con `"acconto"` / `"saldo"` / `"parziale"` (lowercase)
5. **Aggiornare le funzioni helper** `getPaymentTypeLabel` e `getPaymentTypeColor` per usare valori lowercase

## In `src/pages/OrderDetail.tsx`
- Rimuovere il cast `as any` su `orderPayments` nel prop di `PaymentsSection`

