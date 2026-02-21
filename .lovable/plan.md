

## Aggiungere bottone "Accedi" alle card Rivenditori

### Situazione attuale
Le card rivenditori sono cliccabili e portano all'area rivenditore, ma non c'e' un bottone esplicito "Accedi". L'utente vuole un bottone ben visibile per entrare nell'area riservata del rivenditore.

### Modifiche

**1. `src/components/dealers/DealerCard.tsx` (Desktop)**
- Aggiungere un bottone "Accedi" nella parte inferiore della card, sotto le statistiche
- Il bottone navighera' a `/rivenditori/:id/area`
- Stile: bottone primario con icona `LogIn` per renderlo ben visibile
- Mantenere anche il click sulla card per comodita'

**2. `src/components/dealers/MobileDealerCard.tsx` (Mobile)**
- Sostituire il footer attuale (con il testo "Scorri per modificare o eliminare") con un bottone "Accedi" ben visibile
- Mantenere il chevron e aggiungere un bottone con icona `LogIn`
- Mantenere lo swipe per modifica/elimina

### Dettagli tecnici
- Importare `LogIn` da `lucide-react` in entrambi i componenti
- Il bottone usera' `e.stopPropagation()` per evitare conflitto con il click sulla card
- Navigazione a `/rivenditori/${dealer.id}/area` tramite `useNavigate`

