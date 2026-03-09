

# Piano: Aggiungere Preventivi (read-only) nell'Area Rivenditore

## Problema
L'Area Rivenditore mostra solo Ordini, Pagamenti e Assistenza. I preventivi sono esclusi (`DealerPreventivi` è importato ma la route è commentata, e la voce di navigazione è assente dalla sidebar).

## Soluzione
Riabilitare la sezione Preventivi nell'Area Rivenditore in modalità **sola lettura**: il rivenditore può visualizzare la lista e il dettaglio dei propri preventivi, ma non può creare, modificare, convertire o eliminare nulla.

## Modifiche

### 1. `src/components/DealerAreaLayout.tsx`
- Aggiungere la voce **"Preventivi"** nella navigazione sidebar, con icona `FileText`, posizionata tra Dashboard e Ordini.

### 2. `src/pages/DealerArea.tsx`
- Riabilitare il lazy import di `DealerPreventivi`.
- Aggiungere la route `preventivi` che passa `dealerId` e un nuovo prop `readOnly={true}`.

### 3. `src/pages/DealerPreventivi.tsx`
- Accettare un nuovo prop opzionale `readOnly?: boolean`.
- Quando `readOnly` è `true`:
  - Nascondere il pulsante "Nuovo Preventivo".
  - Nascondere le checkbox di selezione e la barra azioni massive (bulk delete, bulk convert).
  - Nascondere il dropdown di cambio stato inline su ogni riga.
  - Nascondere le azioni "Converti in Ordine", "Duplica", "Elimina" nel menu contestuale.
  - Mantenere il pulsante "Dettagli" (Eye) per la navigazione al dettaglio (read-only).
  - Mantenere KPI, filtri e ordinamento (sono di sola lettura per natura).

### 4. Navigazione dettaglio preventivo
- Il click su "Dettagli" dal contesto dealer area navigherà al dettaglio ordine esistente (`OrderDetail`), che è già in modalità read-only per i rivenditori dato che `isDealerArea` è attivo.

## Nessuna modifica al database
Le RLS policies esistenti già consentono ai rivenditori di vedere i propri ordini (inclusi quelli con `stato = 'preventivo'`).

