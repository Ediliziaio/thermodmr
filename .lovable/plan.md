

## Accesso all'Area Rivenditore dal Super Admin

### Cosa cambia
Aggiungere la possibilita' di cliccare su una card rivenditore (sia desktop che mobile) per accedere alla pagina di dettaglio del rivenditore (`/rivenditori/:id`), che gia' esiste e mostra informazioni complete, ordini, analytics e statistiche.

### Modifiche

**1. `src/components/dealers/DealerCard.tsx`**
- Rendere la card cliccabile con navigazione a `/rivenditori/{dealer.id}`
- Aggiungere un bottone "Visualizza" nel menu dropdown
- Wrappare la card con un `Link` o aggiungere `onClick` con `useNavigate`

**2. `src/components/dealers/MobileDealerCard.tsx`**
- Aggiungere un tap sulla card per navigare a `/rivenditori/{dealer.id}`
- Aggiungere un'icona chevron per indicare che la card e' cliccabile
- Mantenere lo swipe per modifica/elimina

### Dettagli Tecnici

- Importare `useNavigate` da `react-router-dom` in entrambi i componenti
- Nel `DealerCard`, aggiungere `onClick={() => navigate(/rivenditori/${dealer.id})}` sulla Card con `cursor-pointer`
- Aggiungere un'opzione "Visualizza Dettaglio" nel DropdownMenu del DealerCard
- Nel `MobileDealerCard`, aggiungere `onClick` sulla Card che naviga al dettaglio (solo se non si sta facendo swipe)
- La pagina `DealerDetail.tsx` esiste gia' e la route `/rivenditori/:id` e' gia' configurata in `App.tsx`

