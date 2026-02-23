

## Piano di Stabilizzazione e Pulizia del Progetto

### 1. Bug Fix - Doppio blocco loading/error in Orders.tsx

**Problema**: `src/pages/Orders.tsx` ha due blocchi identici per loading (righe 231-237 e 249-255) e due blocchi per errore (righe 239-245 e 257-263). Il secondo set non viene mai raggiunto perche il primo intercetta sempre la condizione.

**Fix**: Rimuovere il secondo blocco loading/error duplicato (righe 249-263).

---

### 2. Bug Fix - Canale realtime duplicato in Orders.tsx

**Problema**: `Orders.tsx` chiama `useRealtimeSync()` (riga 42) che gia sottoscrive ai cambiamenti di `payments` e `orders`, E contemporaneamente crea un altro canale realtime `payments-changes` (righe 86-100) che fa la stessa cosa. Questo causa sottoscrizioni duplicate.

**Fix**: Rimuovere il `useEffect` con il canale `payments-changes` (righe 86-100) poiche `useRealtimeSync` gia gestisce tutto.

---

### 3. Bug Fix - Stessa duplicazione realtime in Pagamenti.tsx

**Problema**: Anche `Pagamenti.tsx` usa `useRealtimeSync()` che gia copre la sincronizzazione. Nessun canale extra qui, ma verifico che non ci siano problemi.

**Stato**: OK - Pagamenti.tsx usa solo `useRealtimeSync()` senza duplicazioni.

---

### 4. Pulizia - Rimuovere formatDate locale da Orders.tsx

**Problema**: `Orders.tsx` definisce una funzione locale `formatDate` (righe 29-35) quando esiste gia `formatDate` importato da `@/lib/utils` in altri file come `OrderDetail.tsx`. Tuttavia Orders.tsx NON importa `formatDate` da utils, la definisce localmente con formato diverso (Intl vs date-fns).

**Fix**: Mantenere la funzione locale per evitare breaking changes, ma rinominarla a qualcosa di piu specifico come `formatDateShort` per chiarezza. Oppure lasciarla com'e dato che e funzionalmente diversa.

**Decisione**: Lasciare com'e - non e un bug, solo una differenza di formattazione.

---

### 5. Pulizia - Placeholder.tsx non importato direttamente

**Problema**: `Placeholder.tsx` non viene importato direttamente in nessun file, ma e usato tramite lazy loading in `App.tsx` (riga 32). E utilizzato per la pagina Audit. Va mantenuto.

---

### 6. UX - OrderDetail.tsx navigazione back nel DealerArea

**Problema**: `OrderDetail.tsx` ha un pulsante "Torna agli Ordini" che naviga sempre a `/ordini` (riga 113 e 131). Quando l'utente e nel DealerArea (`/rivenditori/:id/area/ordini/:orderId`), questo pulsante lo porta fuori dal contesto del dealer invece di tornare alla lista ordini del dealer.

**Fix**: Usare `navigate(-1)` o verificare se siamo nel DealerArea e navigare di conseguenza.

---

### 7. UX - DashboardRouter ha import non utilizzati

**Problema**: `DashboardRouter.tsx` importa `DealerDashboard` e `CommercialeDashboard` separatamente, ma usa `SmartDashboard` che gia contiene la logica di routing per ruolo. SmartDashboard stesso importa Dashboard e CommercialeDashboard.

**Fix**: `DashboardRouter.tsx` importa e usa gia SmartDashboard per il caso default/super_admin, e i lazy import di DealerDashboard e CommercialeDashboard sono ridondanti dato che SmartDashboard li gestisce. Semplificare rimuovendo gli import inutili.

---

### 8. Layout.tsx - "Impostazioni" visibile a tutti ma protetto solo per super_admin

**Problema**: Nel menu laterale, "Impostazioni" ha `roles: ["super_admin", "commerciale", "rivenditore"]` (riga 41), ma la route in App.tsx e protetta con `requiredRole="super_admin"`. I commerciali e rivenditori vedono il link ma ricevono "Accesso Negato" quando cliccano.

**Fix**: Cambiare i roles di Impostazioni a `["super_admin"]` nel Layout.tsx.

---

### Riepilogo modifiche

| File | Tipo | Modifica |
|------|------|----------|
| `src/pages/Orders.tsx` | Bug fix | Rimuovere loading/error duplicati (righe 249-263) |
| `src/pages/Orders.tsx` | Bug fix | Rimuovere canale realtime duplicato (righe 86-100) |
| `src/pages/OrderDetail.tsx` | UX fix | Migliorare navigazione back per DealerArea |
| `src/components/DashboardRouter.tsx` | Pulizia | Rimuovere import lazy non utilizzati |
| `src/components/Layout.tsx` | Bug fix | Correggere ruoli visibilita menu Impostazioni |

### Nessuna modifica necessaria

- Database / RLS policies: gia corrette
- `useRealtimeSync.ts`: funziona correttamente
- `Pagamenti.tsx`: nessun problema trovato
- `DealerPreventivi.tsx`: gia corretto nel precedente intervento
- `Placeholder.tsx`: utilizzato per Audit, va mantenuto

