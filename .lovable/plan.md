

## Aggiunta IVA personalizzata

Permettere all'utente di inserire un'aliquota IVA personalizzata oltre alle opzioni predefinite (0%, 4%, 10%, 22%).

---

### Approccio

Aggiungere un'opzione **"Personalizzata"** nel menu a tendina IVA. Quando selezionata, viene mostrato un campo numerico dove l'utente puo digitare liberamente l'aliquota desiderata (es. 5%, 8%, 15%).

### Componenti da modificare

**1. `src/components/orders/OrderLinesEditor.tsx`**
- Aggiungere nel Select IVA l'opzione `"custom"` con etichetta "Personalizzata"
- Quando l'utente seleziona "Personalizzata", mostrare un `Input` numerico accanto al Select per inserire il valore
- Se il valore corrente di IVA non corrisponde a 0, 4, 10 o 22, mostrare automaticamente il campo personalizzato
- Il calcolo del totale resta invariato (usa gia il valore numerico)

**2. `src/components/orders/NewPreventivoDialog.tsx`**
- Stessa logica: aggiungere opzione "Personalizzata" nel Select IVA delle righe preventivo
- Gestire lo stato locale per tracciare se la riga ha IVA custom
- Mostrare input numerico quando selezionata

**3. `src/components/orders/NewOrderDialog.tsx`**
- Identica modifica al dialog di creazione ordine

### Comportamento UX

- Le opzioni standard restano: 0% (Reverse Charge), 4%, 10%, 22%
- In fondo alla lista appare "Personalizzata..."
- Cliccando "Personalizzata", il Select si nasconde e appare un Input numerico con un bottone per tornare alle opzioni standard
- Il campo numerico accetta valori da 0 a 100 con decimali
- Il totale riga si aggiorna in tempo reale

### Dettagli tecnici

- Lo schema Zod gia accetta valori IVA da 0 a 100, quindi nessuna modifica alla validazione
- Il database (`order_lines.iva`) e di tipo `numeric`, accetta gia qualsiasi valore
- Non servono migrazioni database
- Si traccia lo stato custom con una logica locale: se il valore IVA non e tra [0, 4, 10, 22], viene mostrato l'input personalizzato

| File | Modifica |
|------|----------|
| `src/components/orders/OrderLinesEditor.tsx` | Aggiungere opzione "Personalizzata" + input numerico |
| `src/components/orders/NewPreventivoDialog.tsx` | Stessa modifica nelle righe preventivo |
| `src/components/orders/NewOrderDialog.tsx` | Stessa modifica nelle righe ordine |

