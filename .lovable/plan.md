

# Pulsante "Salva" sempre visibile nel preventivo

## Problema
Il pulsante "Salva Prodotti" appare solo dopo aver modificato una riga (`hasLineChanges`). L'utente si aspetta di vedere il pulsante sempre disponibile quando è in modalità modifica.

## Fix

**File:** `src/pages/OrderDetail.tsx` (righe 301-318)

- Rimuovere la condizione `hasLineChanges &&` dal rendering del pulsante
- Mostrare il pulsante sempre per `isSuperAdmin` nella sezione preventivo
- Disabilitare il pulsante quando non ci sono modifiche (`!hasLineChanges`) o durante il salvataggio
- Cambiare lo stile: `variant="outline"` quando non ci sono modifiche, `variant="default"` quando ci sono → feedback visivo chiaro

Il pulsante diventa: sempre visibile, cliccabile solo se ci sono modifiche, con indicatore visivo dello stato.

