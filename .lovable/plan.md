
## Correzioni Preventivi nell'Area Rivenditore + Pulizia UX

### Problema principale
Il rivenditore nella pagina Preventivi vede i pulsanti **"Duplica"** e **"Converti in Ordine"** che non dovrebbe poter usare:
- **"Nuovo Preventivo"** e gia correttamente nascosto per i rivenditori (riga 155 di `DealerPreventivi.tsx`)
- **"Duplica"** crea un nuovo preventivo, operazione riservata a super_admin e commerciale
- **"Converti in Ordine"** cambia lo stato dell'ordine, operazione riservata al solo super_admin

Inoltre, il rivenditore vedra errori RLS se prova a usare questi pulsanti perche le policy di UPDATE/INSERT non glielo permettono.

### Correzioni pianificate

#### 1. Nascondere "Duplica" e "Converti" per il rivenditore
**File:** `src/pages/DealerPreventivi.tsx`

- Aggiungere un controllo `canManage` basato su `userRole`: solo `super_admin` e `commerciale` vedono i pulsanti "Duplica" e "Converti"
- Nella versione mobile (card): nascondere l'intera sezione pulsanti per i rivenditori
- Nella versione desktop (tabella): nascondere la colonna "Azioni" per i rivenditori oppure mostrare solo il pulsante "Visualizza"
- Rimuovere il rendering di `NewPreventivoDialog` quando l'utente e rivenditore (evita caricamento inutile)

#### 2. Miglioramenti UX per il rivenditore
- Aggiornare il messaggio vuoto "I preventivi appariranno qui quando verranno creati" in qualcosa piu specifico per il rivenditore: "I preventivi verranno creati dal tuo commerciale di riferimento"
- Il rivenditore mantiene la possibilita di **visualizzare** i dettagli del preventivo cliccando sulla riga

#### 3. Pulizia codice minore
- L'import di `Plus` da lucide-react e usato solo nel pulsante "Nuovo Preventivo" che il rivenditore non vede; ma verra mantenuto perche usato anche da altri ruoli
- L'import di `Copy` e `ArrowRightCircle` sara condizionato alla visibilita dei pulsanti

### Dettaglio tecnico

```text
DealerPreventivi.tsx:
  const canManage = userRole === "super_admin" || userRole === "commerciale";

  Mobile cards:
    - {canManage && <div className="flex gap-2">...Duplica...Converti...</div>}
  
  Desktop table:
    - Colonna "Azioni": mostra Duplica/Converti solo se canManage
    - Il click sulla riga per visualizzare resta per tutti
  
  Dialog preventivo:
    - {canManage && <NewPreventivoDialog ... />}
  
  Empty state:
    - Messaggio differenziato per ruolo
```

### Riepilogo modifiche

| File | Modifica |
|------|----------|
| `src/pages/DealerPreventivi.tsx` | Nascondere Duplica/Converti/Nuovo per rivenditori, UX empty state migliorata, pulizia rendering condizionale |

Nessuna modifica al database o alle RLS policy necessaria: le policy esistenti gia impediscono le operazioni non autorizzate lato backend. Questa correzione allinea il frontend alle regole di sicurezza.
