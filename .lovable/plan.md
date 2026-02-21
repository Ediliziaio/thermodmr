
## Aggiungere link rapido Pagamenti nel DealerDashboard

### Problema
Le azioni rapide nel DealerDashboard puntano tutte a `/ordini` (route globale) e non includono un link ai Pagamenti. Inoltre i path non sono relativi all'area rivenditore.

### Modifiche

**`src/pages/DealerDashboard.tsx`**

1. Aggiornare i path delle azioni rapide per usare path relativi all'area rivenditore (basati su `dealerId`):
   - "Visualizza Ordini" -> naviga a `/rivenditori/:id/area/ordini`
   - "Crea Ordine" -> naviga a `/rivenditori/:id/area/ordini`

2. Sostituire il bottone "Report" (che puntava a `/ordini`) con un nuovo bottone **"Pagamenti"**:
   - Icona: `CreditCard`
   - Testo: "Pagamenti" / "Storico pagamenti"
   - Naviga a `/rivenditori/:id/area/pagamenti`

3. Costruire i path usando il `dealerId` prop gia' disponibile nel componente:
   - Se `dealerId` e' presente: usa `/rivenditori/${dealerId}/area/ordini` e `/rivenditori/${dealerId}/area/pagamenti`
   - Altrimenti (fallback): usa `/ordini` e `/pagamenti`
