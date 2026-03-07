

# Area Rivenditore: Permessi Read-Only e Dashboard Dedicata

## Problema
Attualmente nell'Area Rivenditore vengono mostrate le stesse pagine del Super Admin (Orders, Pagamenti, Preventivi) con tutte le azioni di modifica. Il rivenditore deve avere una vista **read-only** e una dashboard personalizzata sulle sue esigenze.

## Modifiche

### 1. `src/pages/DealerDashboard.tsx` — Ridisegnare la Dashboard
- Rimuovere "Azioni Rapide" (Crea Ordine, Gestisci Preventivi etc.)
- Rimuovere il bottone "Nuovo Ordine" dall'header
- KPI Cards focalizzate: **Ordini Totali**, **Valore Totale**, **Pagato**, **Da Pagare** (4 colonne)
- Barra progresso globale pagamento (pagato / totale)
- Distribuzione ordini per stato (già presente, mantenerla)
- Attività Recente (già presente, mantenerla)
- Promemoria Pagamenti: rimuovere il bottone "Paga" (read-only)
- Link rapidi: solo **Visualizza Ordini**, **Storico Pagamenti**, **Assistenza**

### 2. `src/pages/Orders.tsx` — Read-Only per Dealer Area
- Quando `isDealerArea` è true:
  - Nascondere checkbox di selezione e barra azioni bulk
  - Nascondere la colonna "Azioni" (tranne "Dettagli" / Eye)
  - Nascondere bottoni "Nuovo Ordine", "Nuovo Preventivo"
  - Nascondere il dropdown cambio stato inline (mostrare Badge statico)
  - Nascondere il bottone Quick Payment (+) sulla colonna importo da pagare
  - Nascondere filtro dealer (è già filtrato per dealer)
  - Nascondere view toggle Pipeline/Lista (solo lista)
  - Nascondere export CSV

### 3. `src/pages/Pagamenti.tsx` — Read-Only per Dealer Area
- Quando `isDealerArea` è true:
  - Nascondere bottone "Nuovo Pagamento"
  - Nascondere checkbox selezione e azioni bulk delete
  - Nascondere azioni di eliminazione singola
  - Mantenere solo visualizzazione e filtri base

### 4. `src/pages/DealerPreventivi.tsx` — Read-Only per Dealer Area
- Quando `isDealerArea` (il `canManage` già controlla il ruolo, ma bisogna verificare che nel contesto dealer area le azioni CRUD siano disabilitate):
  - Nascondere "Nuovo Preventivo"
  - Nascondere checkbox selezione e azioni bulk
  - Nascondere azioni singole: Converti, Duplica, Elimina, Cambia Stato
  - Mantenere solo visualizzazione tabella con filtri

### 5. `src/components/DealerAreaLayout.tsx` — Pulizia Navigazione
- Rimuovere "Preventivi" dalla sidebar (il rivenditore non gestisce preventivi attivamente, li vede dentro Ordini come stato)
- Navigazione finale: **Dashboard**, **Ordini**, **Pagamenti**, **Assistenza**

