

## Miglioramento Visualizzazione Dettaglio Preventivo

### Problema attuale
La pagina `OrderDetail.tsx` tratta i preventivi (ID con prefisso `PRV-`) esattamente come un ordine normale:
- Il titolo dice "Ordine #PRV-2026-0002" invece di "Preventivo #PRV-2026-0002"
- Le sezioni Pagamenti e Timeline Pagamenti vengono mostrate, ma non hanno senso per un preventivo
- Il "Riepilogo Economico" mostra acconto/pagato/saldo, irrilevanti in fase preventivo
- Manca la **data di scadenza del preventivo** in evidenza
- Manca un pulsante **"Converti in Ordine"** prominente
- Lo stepper degli stati parte da "Da Confermare" nel dropdown, mancando "Preventivo"
- Le note interne sono visibili ma non c'e contesto specifico per il preventivo

### Modifiche pianificate

#### File: `src/pages/OrderDetail.tsx`

**1. Rilevamento preventivo**
- Aggiungere `const isPreventivo = order.stato === "preventivo";` dopo il caricamento dell'ordine

**2. Titolo dinamico**
- Cambiare "Ordine #" in "Preventivo #" quando `isPreventivo` e true

**3. Banner scadenza preventivo**
- Aggiungere un banner colorato prominente sotto il titolo che mostra la data di scadenza del preventivo (`order.data_scadenza_preventivo`)
- Se scaduto: banner rosso con icona AlertTriangle e testo "Preventivo scaduto il ..."
- Se valido: banner ambra/info con icona Clock e giorni rimanenti "Valido fino al ... (X giorni)"

**4. CTA "Converti in Ordine"**
- Per super_admin: aggiungere un pulsante prominente "Converti in Ordine" nella barra azioni (al posto di Esporta PDF / Invia Email che non hanno senso per un preventivo)
- Con dialog di conferma come gia presente in `DealerPreventivi.tsx`

**5. Nascondere sezioni irrilevanti per preventivi**
- Nascondere `PaymentsSection` quando `isPreventivo`
- Nascondere `PaymentTimelineChart` quando `isPreventivo`
- Nascondere "Acconto Concordato", "Pagato" e "Saldo" nel Riepilogo Economico, mostrando solo "Importo Preventivo"

**6. Semplificare lo stepper**
- Lo StatusStepper gia mostra "Preventivo" come step 0, quindi funziona. Ma il dropdown di cambio stato non include "preventivo" - mantenerlo cosi e corretto perche non si torna a preventivo.

**7. Riepilogo Economico adattato**
- Per i preventivi, mostrare solo: Importo Totale Preventivo (senza acconto/pagato/saldo)
- Rinominare la card in "Riepilogo Preventivo"

### Riepilogo tecnico

| Modifica | Dettaglio |
|----------|-----------|
| Titolo dinamico | "Preventivo #" vs "Ordine #" basato su `order.stato` |
| Banner scadenza | Nuovo componente inline con countdown giorni |
| CTA Converti | Pulsante + AlertDialog di conferma (solo super_admin) |
| Sezioni nascoste | PaymentsSection, PaymentTimelineChart nascoste per preventivi |
| Riepilogo adattato | Solo importo totale per preventivi, senza acconto/pagato/saldo |
| Import aggiuntivi | `Clock`, `AlertTriangle`, `ArrowRightCircle` da lucide-react; `useMutation` per conversione |

Un unico file modificato: `src/pages/OrderDetail.tsx`
