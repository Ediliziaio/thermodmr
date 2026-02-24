

## Audit Sezione Ordini - Report e Piano Interventi

---

### A) MAPPA ARCHITETTURA ORDINI

```text
Orders.tsx (lista ordini, infinite scroll, filtri, bulk actions)
  |-- useOrdersInfinite (query view orders_with_payment_stats)
  |-- OrderFilters / MobileOrderFilters (filtri avanzati + quick filters)
  |-- MobileOrdersList -> OrderMobileCard (swipe cards)
  |-- NewOrderDialog / NewPreventivoDialog (form creazione)
  |-- BulkUpdateStatusDialog / BulkDeleteOrdersDialog
  |-- ExportColumnsDialog

OrderDetail.tsx (dettaglio singolo ordine)
  |-- useOrderById, useOrderLines, useOrderPayments, useOrderAttachments
  |-- StatusStepper, OrderLinesEditor, PaymentsSection, AttachmentsSection
  |-- PaymentTimelineChart

DealerPreventivi.tsx (lista preventivi per dealer)
  |-- Query diretta su orders con stato="preventivo"
  |-- NewPreventivoDialog (duplica/crea)

useOrders.ts (hook principale: 10 export tra query e mutation)
useOrdersInfinite.ts (infinite scroll con view)
```

**Componenti:** 15 file nella sezione ordini
**Hook:** 2 file dedicati (useOrders.ts ~570 righe, useOrdersInfinite.ts ~74 righe)

---

### B) PROBLEMI IDENTIFICATI

#### P0 - CRITICI

| # | Problema | Dettaglio | Intervento |
|---|----------|-----------|------------|
| 1 | **`toast` da "sonner" in OrderDetail.tsx** | Usa `import { toast } from "sonner"` (toast.success/toast.error) mentre il resto del progetto usa `@/hooks/use-toast`. Incoerenza + due sistemi toast in parallelo | Sostituire con `toast` da `@/hooks/use-toast` |
| 2 | **`toast` da "sonner" in DealerPreventivi.tsx** | Stesso problema: `toast.success()` e `toast.error()` da sonner | Sostituire con pattern `toast({ title, description })` |
| 3 | **`toast` da "sonner" in BulkDeleteDealersDialog.tsx e BulkDeleteCommercialiDialog.tsx** | Stessi file usano sonner | Standardizzare |
| 4 | **`process.env.NODE_ENV` in useOrdersInfinite.ts** | Vite non espone `process.env`. Dovrebbe usare `import.meta.env.DEV` | Correggere il check del dev logging |
| 5 | **`formatCurrency` duplicata in PaymentsSection.tsx** | Definisce la propria `formatCurrency` locale (riga 64-69) identica a quella in `@/lib/utils` | Importare da utils |
| 6 | **`formatCurrency` duplicata in OrderLinesEditor.tsx** | Definisce la propria `formatCurrency` locale (riga 50-55) identica a quella in utils | Importare da utils |
| 7 | **`formatDate` duplicata in PaymentsSection.tsx** | Definisce la propria `formatDate` locale (riga 71-77) identica a quella in utils | Importare da utils |
| 8 | **Inline `Intl.NumberFormat` in NewOrderDialog.tsx** | Usa `new Intl.NumberFormat("it-IT", ...)` inline (riga 411) invece di `formatCurrency` | Importare da utils |
| 9 | **Inline `Intl.NumberFormat` in NewPreventivoDialog.tsx** | Usa `new Intl.NumberFormat("it-IT", ...)` inline (righe 315, 344) | Importare da utils |

#### P1 - IMPORTANTI (Performance + Architettura)

| # | Problema | Dettaglio | Intervento |
|---|----------|-----------|------------|
| 10 | **Filtri client-side su dati gia paginati** | `Orders.tsx` carica con infinite scroll (50 per pagina) ma filtra client-side. Se l'utente filtra per stato "consegnato" e ci sono 200 ordini, potrebbe non vedere risultati finche non carica abbastanza pagine | Documentare come limitazione nota. Il filtering server-side richiederebbe un refactor significativo dell'infinite scroll. I filtri funzionano correttamente sulle pagine gia caricate |
| 11 | **`useOrdersInfinite` query view con JOIN** | Fa SELECT su `orders_with_payment_stats` (view) con JOIN `dealers` e `clients`. Le views con JOIN sono piu lente delle tabelle dirette | Accettabile: la view e ottimizzata e l'indice su `data_inserimento` copre l'ORDER BY. Non cambiare |
| 12 | **`NewOrderDialog` e `NewPreventivoDialog`: form duplicati ~80%** | I due dialog condividono ~80% del codice (schema Zod, selezione dealer, sezione cliente, sezione righe ordine). Solo la sezione "data scadenza" e l'ID sono diversi | Valutare estrazione di un componente condiviso `OrderFormFields` in futuro (P2) |
| 13 | **`useRLSTests.ts` usa sonner** | Import da sonner invece di use-toast | Standardizzare |

#### P2 - MIGLIORAMENTI (UX + Pulizia)

| # | Problema | Dettaglio | Intervento |
|---|----------|-----------|------------|
| 14 | **Categories non allineate tra componenti** | `NewOrderDialog` usa ["Infissi", "Porte", "Accessori", "Altro"]. `OrderLinesEditor` usa ["Finestra", "Portafinestra", "Scorrevole", "Porta", "Accessorio"]. Incoerenza nelle categorie disponibili | Estrarre costante condivisa `ORDER_CATEGORIES` in un file di costanti |
| 15 | **`OrderDetail.tsx`: `convertMutation` inline** | Definisce una mutation inline (`useMutation`) per convertire preventivo, duplicando logica che potrebbe stare in `useOrders.ts` | Spostare in useOrders.ts come `useConvertPreventivo` |
| 16 | **`Separator` importato ma non usato in NewOrderDialog** | Import `Separator` (riga 36) non utilizzato nel JSX del form visibile | Verificare se usato piu in basso nel file |

---

### C) PIANO DI IMPLEMENTAZIONE

#### Fase 1: Standardizzazione Toast (P0)

Sostituire `import { toast } from "sonner"` con `import { toast } from "@/hooks/use-toast"` nei seguenti file, adattando le chiamate da `toast.success("msg")` a `toast({ title: "msg" })`:

1. `src/pages/OrderDetail.tsx`
2. `src/pages/DealerPreventivi.tsx`
3. `src/components/dealers/BulkDeleteDealersDialog.tsx`
4. `src/components/commerciali/BulkDeleteCommercialiDialog.tsx`
5. `src/hooks/useRLSTests.ts`

#### Fase 2: Rimozione Duplicazioni formatCurrency/formatDate (P0)

1. `src/components/orders/PaymentsSection.tsx`: rimuovere `formatCurrency` (riga 64-69) e `formatDate` (riga 71-77) locali, importare da `@/lib/utils`
2. `src/components/orders/OrderLinesEditor.tsx`: rimuovere `formatCurrency` locale (riga 50-55), importare da `@/lib/utils`
3. `src/components/orders/NewOrderDialog.tsx`: sostituire `new Intl.NumberFormat(...)` inline con `formatCurrency` da utils
4. `src/components/orders/NewPreventivoDialog.tsx`: sostituire `new Intl.NumberFormat(...)` inline (2 occorrenze) con `formatCurrency` da utils

#### Fase 3: Fix process.env (P0)

In `src/hooks/useOrdersInfinite.ts` (riga 55): sostituire `process.env.NODE_ENV === "development"` con `import.meta.env.DEV`

#### Fase 4: Costanti Condivise (P2)

Creare `src/lib/orderConstants.ts` con:
- `ORDER_CATEGORIES` (lista unificata categorie prodotti)
- Valutare consolidamento delle categorie diverse tra NewOrderDialog e OrderLinesEditor

#### Fase 5: Refactor convertMutation (P2, opzionale)

Spostare la mutation di conversione preventivo da `OrderDetail.tsx` inline a `useOrders.ts` come `useConvertPreventivo`, per riusabilita (anche `DealerPreventivi.tsx` ha la stessa mutation).

---

### D) RIEPILOGO INTERVENTI

| Categoria | Interventi | File toccati |
|-----------|-----------|--------------|
| Toast standardizzazione | 5 file migrati da sonner a use-toast | OrderDetail, DealerPreventivi, BulkDeleteDealersDialog, BulkDeleteCommercialiDialog, useRLSTests |
| Duplicazioni rimosse | 4 formatCurrency + 1 formatDate locali rimosse, 3 Intl.NumberFormat inline sostituiti | PaymentsSection, OrderLinesEditor, NewOrderDialog, NewPreventivoDialog |
| Fix build | process.env -> import.meta.env.DEV | useOrdersInfinite |
| Costanti | Categorie prodotto unificate | Nuovo file orderConstants.ts |

**Stima impatto:**
- Zero rischio di regressione funzionale (solo standardizzazione import e rimozione duplicazioni)
- Console piu pulita (nessun warning process.env)
- Codebase piu coerente (un solo sistema toast, un solo formatCurrency)
- ~50 righe di codice duplicato rimosse

