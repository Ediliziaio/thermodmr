

## Creazione Preventivi da parte del Super Admin

### Obiettivo
Permettere al Super Admin di creare nuovi preventivi. Un preventivo usa lo stesso form dell'ordine ma con stato iniziale `preventivo` e un campo aggiuntivo `data_scadenza_preventivo`.

### Modifiche previste

---

#### 1. Nuovo dialog `NewPreventivoDialog` (`src/components/orders/NewPreventivoDialog.tsx`)

Componente basato su `NewOrderDialog` con queste differenze:
- Titolo: "Crea Nuovo Preventivo"
- Campo aggiuntivo: **Data Scadenza Preventivo** (tipo `date`, obbligatorio)
- Il campo "Importo Acconto" viene nascosto (non rilevante per un preventivo)
- Bottone: "Crea Preventivo"
- Al submit chiama un nuovo hook `useCreatePreventivo`

---

#### 2. Nuovo hook `useCreatePreventivo` (`src/hooks/useOrders.ts`)

Funzione simile a `useCreateOrder` ma:
- Genera un ID con prefisso `PRV-YYYY-NNNN` invece di `ORD-YYYY-NNNN`
- Imposta `stato: "preventivo"` invece di `"da_confermare"`
- Salva `data_scadenza_preventivo` dal form
- Imposta `importo_acconto: 0`
- Toast di successo: "Preventivo creato"
- Invalida anche la query `["preventivi"]` oltre a `["orders-infinite"]`

Aggiungere anche `generatePreventivoId()` come funzione helper.

---

#### 3. Pagina Ordini: bottone "Nuovo Preventivo" per Super Admin (`src/pages/Orders.tsx`)

- Accanto al bottone "Nuovo Ordine", aggiungere un bottone **"Nuovo Preventivo"** visibile solo se `userRole === "super_admin"`
- Il bottone apre `NewPreventivoDialog`
- Icona: `FileText` + `Plus`

---

#### 4. Pagina Preventivi del dealer: bottone "Nuovo Preventivo" (`src/pages/DealerPreventivi.tsx`)

- Aggiungere il bottone "Nuovo Preventivo" anche nella pagina preventivi dell'area rivenditore
- Visibile solo per `super_admin` (e `commerciale`, come da regole RBAC approvate)
- Il `dealer_id` viene pre-selezionato automaticamente se siamo nell'area di un dealer specifico

---

### Dettagli tecnici

**Schema form preventivo** (Zod):
- Stesso schema di `orderFormSchema` ma con `data_scadenza_preventivo: z.string().min(1, "Data scadenza richiesta")` obbligatorio
- Senza `importo_acconto`

**Generazione ID preventivo**:
```text
PRV-2026-0001, PRV-2026-0002, ...
```
Query: `SELECT id FROM orders WHERE id ILIKE 'PRV-2026-%' ORDER BY id DESC LIMIT 1`

**Flusso insert**:
1. Lookup `commerciale_owner_id` dal dealer selezionato
2. (Opzionale) Crea cliente finale
3. Genera `PRV-YYYY-NNNN`
4. Insert in `orders` con `stato = 'preventivo'` e `data_scadenza_preventivo`
5. Insert righe in `order_lines`

