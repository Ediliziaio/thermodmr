

## Duplica Preventivo

### Obiettivo
Aggiungere un bottone "Duplica" su ogni riga della lista preventivi. Cliccandolo, si apre il dialog `NewPreventivoDialog` pre-compilato con i dati del preventivo selezionato (dealer, cliente, righe, note), pronto per essere salvato come nuovo preventivo.

### Modifiche previste

---

#### 1. Fetch dati completi del preventivo da duplicare (`src/pages/DealerPreventivi.tsx`)

- Aggiungere uno stato `duplicateData` che contiene i valori del preventivo da duplicare
- Quando l'utente clicca "Duplica", fare una query per caricare i dati completi dell'ordine (incluse le `order_lines` e i dati del cliente finale dalla tabella `clients`)
- Una volta caricati, aprire il `NewPreventivoDialog` passando i dati come prop `defaultValues`

Aggiungere il bottone "Duplica" (icona `Copy`):
- **Desktop**: nella colonna Azioni, accanto a "Visualizza" e "Converti"
- **Mobile**: come bottone aggiuntivo nella card

---

#### 2. Estendere `NewPreventivoDialog` (`src/components/orders/NewPreventivoDialog.tsx`)

- Aggiungere una prop opzionale `defaultValues` con i dati pre-compilati (dealer_id, cliente, note, righe)
- Usare `useEffect` per chiamare `form.reset(defaultValues)` quando `defaultValues` cambia
- La data di scadenza viene lasciata vuota (il preventivo duplicato deve avere una nuova scadenza)
- Il titolo cambia in "Duplica Preventivo" quando `defaultValues` e' presente

---

#### 3. Query di fetch per la duplicazione

Quando l'utente clicca "Duplica":

```text
1. Fetch da "orders" -> note_rivenditore, note_interna, data_consegna_prevista, dealer_id, cliente_finale_id
2. Fetch da "order_lines" WHERE ordine_id = id -> categoria, descrizione, quantita, prezzo_unitario, sconto, iva
3. (Se cliente_finale_id presente) Fetch da "clients" -> nome, cognome, email, telefono, indirizzo
```

I dati vengono mappati nel formato del form e passati al dialog.

---

### Riepilogo flusso

1. Utente clicca "Duplica" su un preventivo
2. Il sistema carica ordine + righe + cliente
3. Si apre il dialog pre-compilato (senza data scadenza)
4. L'utente modifica cio' che serve e clicca "Crea Preventivo"
5. Viene creato un nuovo preventivo con un nuovo ID `PRV-YYYY-NNNN`

