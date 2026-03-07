

# Bottone Salva Globale + Popup "Modifiche non salvate"

## Problema
Attualmente ci sono 4-5 bottoni "Salva" sparsi nella pagina (Salva Prodotti, Salva Note, Salva Descrizione, Salva Date, Salva Modalità). L'utente vuole un unico bottone di salvataggio in fondo a destra e un popup di conferma se tenta di uscire con modifiche non salvate.

## Modifiche

### `src/pages/OrderDetail.tsx`

1. **Tracciamento dirty state unificato**: Creare una funzione `hasUnsavedChanges` che controlla se qualsiasi campo è stato modificato rispetto ai dati originali dell'ordine:
   - `editedLines !== null` (righe prodotto modificate)
   - `noteInterna !== (order.note_interna || "")` (nota interna modificata)
   - `noteRivenditore !== (order.note_rivenditore || "")` (nota rivenditore modificata)
   - `dataFineProduzione` diversa dall'originale
   - `settimanaConsegna` diversa dall'originale
   - `dataConsegnaPrevista` diversa dall'originale
   - `modalitaPagamento` diversa dall'originale

2. **Rimuovere i singoli bottoni "Salva"**: Eliminare i bottoni "Salva Prodotti", "Salva Note", "Salva Descrizione", "Salva Date", "Salva Modalità" sparsi nella pagina.

3. **Aggiungere barra di salvataggio fissa in basso a destra**: Un `div` fisso (`fixed bottom-4 right-4`) che appare solo quando `hasUnsavedChanges` è true, con:
   - Bottone "Salva Modifiche" che esegue tutti i salvataggi necessari in parallelo (note, linee, date, modalità)
   - Bottone "Annulla Modifiche" per resettare tutto allo stato originale

4. **Popup "Modifiche non salvate" alla navigazione**: Aggiungere un `AlertDialog` che si attiva quando l'utente clicca "Torna agli Ordini" o naviga via con modifiche non salvate:
   - Stato `showUnsavedDialog` + `pendingNavigation` per memorizzare dove l'utente vuole andare
   - Intercettare il click su "Torna agli Ordini" per controllare `hasUnsavedChanges` prima di navigare
   - Tre opzioni nel dialog: "Salva e Esci" (salva tutto poi naviga), "Esci senza salvare" (naviga direttamente), "Annulla" (resta nella pagina)
   - Usare `useBeforeUnload` per intercettare anche la chiusura del browser/tab

5. **Funzione `handleSaveAll`**: Un'unica funzione che chiama in parallelo tutte le mutation necessarie basandosi su cosa è stato effettivamente modificato:
   - Se note cambiate → `updateNotesMutation`
   - Se linee cambiate → `updateOrderLinesMutation`
   - Se date/modalità cambiate → `updateDatesMutation`
   - Al completamento di tutto, resetta gli stati dirty

Stessa logica sia per la vista Preventivo che per la vista Ordine.

