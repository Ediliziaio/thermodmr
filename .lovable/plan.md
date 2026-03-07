

# Aggiungere Modalità di Pagamento all'Ordine

## Cosa cambia

Aggiungere un campo `modalita_pagamento` alla tabella `orders` per tracciare le condizioni di pagamento concordate. Le opzioni disponibili saranno:
- **Tutto** (pagamento in un'unica soluzione)
- **50% Acconto + 50% Saldo**
- **A completamento lavori**
- **Alla consegna**
- **Contanti**

## Modifiche

### 1. Migrazione DB
Aggiungere colonna `modalita_pagamento text` nullable alla tabella `orders` e alla view `orders_with_payment_stats`.

```sql
ALTER TABLE orders ADD COLUMN modalita_pagamento text;
```

Ricreare la view `orders_with_payment_stats` includendo il nuovo campo.

### 2. `src/pages/OrderDetail.tsx`
- Aggiungere stato locale `modalitaPagamento` sincronizzato con `order.modalita_pagamento`
- Nella sidebar "Riepilogo Economico", aggiungere un `<Select>` (editabile da super_admin) con le 5 opzioni
- Salvare il valore tramite una nuova mutation o estendendo `useUpdateOrderDates` per includere anche `modalita_pagamento`

### 3. `src/hooks/useOrders.ts`
- Estendere `useUpdateOrderDates` (rinominandolo concettualmente) per accettare anche `modalitaPagamento`, oppure creare un nuovo hook `useUpdateOrderPaymentTerms`
- Aggiungere `modalita_pagamento` nel `useCreateOrder` e `useCreatePreventivo`

### 4. `src/components/orders/NewOrderDialog.tsx`
- Aggiungere campo `modalita_pagamento` allo schema zod e al form
- Inserire un `<Select>` con le 5 opzioni nella sezione "Additional Info"

### 5. `src/components/orders/NewPreventivoDialog.tsx`
- Stesso campo `modalita_pagamento` anche nel form preventivo

### 6. `src/components/orders/OrderPipelineCard.tsx`
- Mostrare la modalità di pagamento nella card se presente

### 7. `src/lib/exportUtils.ts`
- Aggiungere `modalita_pagamento` all'export CSV/Excel

