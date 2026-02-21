

## Sezione Preventivi nell'Area Rivenditore

### Concetto
Il **preventivo** e' uno stadio iniziale dell'ordine. Vive nella stessa tabella `orders` con uno stato dedicato `preventivo`. Quando viene approvato, lo stesso record passa allo stato `da_confermare` senza duplicazione. Rispetto all'ordine, il preventivo ha un campo aggiuntivo: la **data di scadenza/validita'**.

### Modifiche previste

---

#### 1. Database: nuovo stato e colonna

- **Aggiungere il valore `preventivo` all'enum `order_status`** (prima di `da_confermare`)
- **Aggiungere colonna `data_scadenza_preventivo`** (tipo `date`, nullable) alla tabella `orders`

```text
order_status enum: preventivo -> da_confermare -> da_pagare_acconto -> in_lavorazione -> da_consegnare -> consegnato
```

Migrazione SQL:
- `ALTER TYPE order_status ADD VALUE 'preventivo' BEFORE 'da_confermare';`
- `ALTER TABLE orders ADD COLUMN data_scadenza_preventivo date;`

---

#### 2. Aggiornare le utility di stato (`src/lib/utils.ts`)

- Aggiungere `preventivo` a `getStatusColor` (colore grigio/azzurro chiaro)
- Aggiungere `preventivo` a `getStatusLabel` -> "Preventivo"
- Aggiungere `preventivo` a `getStatusVariant`

---

#### 3. Aggiornare i tipi (`src/types/index.ts`)

- Aggiungere `PREVENTIVO = "PREVENTIVO"` all'enum `OrderStatus`

---

#### 4. Aggiornare lo StatusStepper (`src/components/orders/StatusStepper.tsx`)

- Aggiungere lo step "Preventivo" come step 0 (prima di "Da Confermare")
- Lo stepper mostrera' 6 step totali

---

#### 5. Sidebar: aggiungere "Preventivi" (`src/components/DealerAreaLayout.tsx`)

- Nuova voce nella navigation: `{ name: "Preventivi", href: basePath + "/preventivi", icon: FileText }`
- Posizionata tra Dashboard e Ordini

---

#### 6. Nuova pagina Preventivi (`src/pages/DealerPreventivi.tsx`)

Una lista dedicata che mostra solo gli ordini con `stato = 'preventivo'` per quel dealer.

Colonne visibili:
- ID preventivo
- Data creazione
- Importo totale
- Data scadenza
- Stato scadenza (valido / scaduto, calcolato rispetto a oggi)
- Azioni: "Converti in Ordine" (cambia stato a `da_confermare`), "Visualizza dettaglio"

Indicatore visivo per preventivi scaduti (data_scadenza_preventivo < oggi): riga evidenziata in rosso/arancione.

---

#### 7. Route nell'area rivenditore (`src/pages/DealerArea.tsx`)

- Aggiungere route `preventivi` -> `DealerPreventivi` (lazy loaded)
- Passare `dealerId` come prop

---

#### 8. Aggiornare la Dashboard del dealer (`src/pages/DealerDashboard.tsx`)

- Aggiungere una **KPI card "Preventivi Attivi"** che conta gli ordini con `stato = 'preventivo'` per quel dealer
- Aggiungere un'azione rapida "Preventivi" che naviga a `/rivenditori/:id/area/preventivi`
- Separare chiaramente nella distribuzione ordini: i preventivi appaiono come stato a parte

---

#### 9. Hook dati (`src/hooks/useDealerDashboard.ts`)

- Aggiungere `preventivo` al tipo `ordersByStatus` in `DealerOrderStats`
- Il conteggio preventivi verra' incluso automaticamente dalla query esistente su `orders_with_payment_stats`

---

#### 10. Filtrare ordini vs preventivi

- Nella pagina **Ordini** dell'area rivenditore: escludere `stato = 'preventivo'` (aggiungere `.neq("stato", "preventivo")` alla query)
- Nella pagina **Preventivi**: mostrare solo `stato = 'preventivo'`

Cosi' le due sezioni sono completamente separate e il rivenditore ha sempre chiaro cosa e' un preventivo e cosa e' un ordine confermato.

---

#### 11. Funzione "Converti in Ordine"

Un bottone nella lista preventivi e nel dettaglio che:
- Chiama `supabase.from("orders").update({ stato: "da_confermare" }).eq("id", preventivoId)`
- Mostra un dialog di conferma prima della conversione
- Dopo la conversione, il record scompare dai preventivi e appare negli ordini

---

### Riepilogo navigazione Area Rivenditore

| Voce sidebar | Icona | Contenuto |
|---|---|---|
| Dashboard | LayoutDashboard | KPI + distribuzione stati + preventivi attivi |
| Preventivi | FileText | Lista preventivi (stato = preventivo) con scadenza |
| Ordini | ShoppingCart | Lista ordini (stato diverso da preventivo) |
| Pagamenti | CreditCard | Storico pagamenti |

