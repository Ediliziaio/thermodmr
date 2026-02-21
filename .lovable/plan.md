
## Area Rivenditore con Sidebar dedicata e Navigazione

### Problema
Attualmente l'area rivenditore (`/rivenditori/:id/area`) mostra solo la dashboard senza sidebar. Il super admin dovrebbe vedere una sidebar ridotta con le voci che il rivenditore vedrebbe (Dashboard, Ordini, Impostazioni) e poter navigare tra le sezioni come se fosse il rivenditore.

### Soluzione
Creare un layout dedicato `DealerAreaLayout` con una sidebar che mostra solo le voci del rivenditore, tutte scopate al dealer specifico. Le route dell'area rivenditore saranno sotto `/rivenditori/:id/area/*`.

### Struttura delle pagine nell'area rivenditore

```text
/rivenditori/:id/area          -> Dashboard rivenditore (KPI, ordini, attivita')
/rivenditori/:id/area/ordini   -> Lista ordini filtrati per quel rivenditore
/rivenditori/:id/area/ordini/:orderId -> Dettaglio ordine
```

### Modifiche previste

**1. Creare `src/components/DealerAreaLayout.tsx`**
- Nuovo layout con sidebar ridotta, simile a `Layout.tsx` ma con:
  - Solo le voci visibili al rivenditore: Dashboard, Ordini, Impostazioni
  - I link puntano a `/rivenditori/:id/area/...` invece che alle route globali
  - Header con nome del rivenditore e bottone "Esci dall'Area" (torna a `/rivenditori`)
  - Nessuna GlobalSearch (il super admin non cerca qui)
  - Badge "Stai visualizzando come: [Nome Rivenditore]" per chiarire il contesto

**2. Modificare `src/pages/DealerArea.tsx`**
- Trasformarlo in un wrapper con `<Routes>` nested che usa `DealerAreaLayout`
- Route interne:
  - `/` -> DealerDashboard (gia' esistente)
  - `/ordini` -> Lista ordini filtrata per quel dealer
  - `/ordini/:orderId` -> Dettaglio ordine (riusa `OrderDetail` esistente)

**3. Aggiornare `src/App.tsx`**
- Cambiare la route da `path="/rivenditori/:id/area"` a `path="/rivenditori/:id/area/*"` per supportare le sotto-route

**4. Modificare `src/pages/DealerDashboard.tsx`**
- Rimuovere il bottone "Torna indietro" (sara' gestito dal layout)
- Le azioni rapide (Crea Ordine, Visualizza Ordini) navigheranno alle route interne dell'area (`../ordini` relative)

### Voci della sidebar rivenditore

| Voce | Icona | Route |
|------|-------|-------|
| Dashboard | LayoutDashboard | `/rivenditori/:id/area` |
| Ordini | ShoppingCart | `/rivenditori/:id/area/ordini` |

In alto: nome rivenditore + badge "Vista Rivenditore"
In basso: bottone "Esci dall'Area" con freccia che riporta a `/rivenditori`
