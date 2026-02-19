

## Accesso all'Area Rivenditore (Dashboard Rivenditore) dal Super Admin

### Situazione attuale
Quando clicchi su un rivenditore, vedi la pagina "Dettaglio Rivenditore" con informazioni anagrafiche, ordini e statistiche in tab. Quello che vuoi e' vedere la **dashboard del rivenditore** -- la stessa vista che il rivenditore vede quando accede (con KPI, distribuzione ordini per stato, attivita' recente, promemoria pagamenti, azioni rapide).

### Cosa cambia
Aggiungere la possibilita' per il Super Admin di entrare nell'area del rivenditore e vedere la sua dashboard personalizzata, come se fosse il rivenditore stesso.

### Modifiche previste

**1. Modificare gli hooks `src/hooks/useDealerDashboard.ts`**
- Aggiungere un parametro opzionale `dealerId` a tutti e tre gli hooks (`useDealerOrderStats`, `useRecentActivity`, `usePaymentReminders`)
- Quando `dealerId` e' presente, filtrare per `dealer_id` invece che per `creato_da_user_id`
- Questo permette al super admin di vedere i dati di qualsiasi rivenditore

**2. Modificare `src/pages/DealerDashboard.tsx`**
- Accettare una prop opzionale `dealerId` 
- Passare il `dealerId` agli hooks
- Quando usato dal super admin, mostrare il nome del rivenditore nell'header e un bottone "Torna indietro"

**3. Aggiungere la route `/rivenditori/:id/area` in `src/App.tsx`**
- Nuova route protetta che renderizza il DealerDashboard con il `dealerId` preso dall'URL

**4. Aggiungere il link di accesso**
- Nel `DealerDetail.tsx`: aggiungere un bottone "Entra nell'Area Rivenditore" nell'header
- Nel `DealerCard.tsx` e `MobileDealerCard.tsx`: il click sulla card portera' direttamente all'area rivenditore (`/rivenditori/:id/area`) invece che al dettaglio

### Dettagli Tecnici

- Gli hooks attualmente filtrano con `.eq("creato_da_user_id", user.id)` -- verra' aggiunto un branch: se `dealerId` e' passato, filtrare con `.eq("dealer_id", dealerId)` 
- La query key includera' il `dealerId` per evitare conflitti di cache
- Il componente DealerDashboard verra' wrappato in una pagina wrapper che legge `:id` dalla URL e lo passa come prop
- Le card rivenditore navigheranno a `/rivenditori/:id/area` per entrare direttamente nella dashboard

