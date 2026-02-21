

## Correzione: Nascondere la sidebar del Super Admin nell'Area Rivenditore

### Problema
Quando il Super Admin entra nell'area riservata di un rivenditore (`/rivenditori/:id/area`), vede ancora tutta la sidebar con tutte le voci di menu del super admin. Questo e' sbagliato perche' dovrebbe simulare la vista del rivenditore.

### Soluzione
Rimuovere il wrapper `<Layout>` dalla route `/rivenditori/:id/area` in `src/App.tsx`, cosi' l'area rivenditore viene mostrata a schermo intero senza sidebar. Il bottone "Torna indietro" gia' presente nel `DealerDashboard` permette di tornare alla lista rivenditori.

### Modifiche

**1. `src/App.tsx`**
- Rimuovere `<Layout>` dal wrapper della route `/rivenditori/:id/area`
- La route diventera':
```text
<Route
  path="/rivenditori/:id/area"
  element={
    <ProtectedRoute>
      <DealerArea />
    </ProtectedRoute>
  }
/>
```

Cosi' facendo, quando il super admin entra nell'area rivenditore, vedra' solo la dashboard del rivenditore a tutto schermo, senza la sidebar di navigazione. Il bottone "Torna indietro" gia' implementato nella pagina permettera' di uscire e tornare alla gestione.

