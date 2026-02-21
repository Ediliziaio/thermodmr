

## Modifiche richieste

Due interventi:
1. **IVA 0% (Reverse Charge)** - Permettere di selezionare IVA 0% sia nei preventivi che negli ordini
2. **Allegati nei preventivi** - Aggiungere la sezione caricamento file (PDF, immagini, ecc.) nella pagina dettaglio preventivo

---

### 1. IVA con opzione 0% (Reverse Charge)

Attualmente il campo IVA e un input numerico libero (min 0, max 100). Tecnicamente gia accetta 0, ma il valore di default e sempre 22 e non c'e indicazione chiara per il reverse charge.

**Modifiche:**

**`src/components/orders/OrderLinesEditor.tsx`**
- Sostituire l'input numerico IVA con un `Select` a tendina con le opzioni:
  - `0%` - Reverse Charge
  - `4%` - IVA ridotta
  - `10%` - IVA ridotta
  - `22%` - IVA ordinaria
- Default rimane 22%

**`src/components/orders/NewPreventivoDialog.tsx`**
- Stesso trattamento: sostituire il valore IVA fisso con un `Select` nella riga del preventivo
- Le opzioni saranno identiche: 0%, 4%, 10%, 22%
- Mostrare l'etichetta "Reverse Charge" accanto allo 0% per chiarezza

**`src/components/orders/NewOrderDialog.tsx`**
- Se presente un editor righe simile, applicare la stessa modifica

---

### 2. Allegati nella pagina dettaglio Preventivo

Il componente `AttachmentsSection` esiste gia e funziona nella pagina `OrderDetail`. Poiche i preventivi sono tecnicamente ordini con stato "preventivo", la sezione allegati e gia visibile quando si apre il dettaglio di un preventivo (`/ordini/:id`).

Verifico che non ci siano blocchi:
- `AttachmentsSection` non filtra per stato, quindi funziona gia per i preventivi
- Il bucket `order-attachments` e gia configurato
- Le policy RLS sugli allegati gia coprono gli ordini (preventivi inclusi)

**Nessuna modifica necessaria per gli allegati**: la sezione e gia presente nel dettaglio ordine/preventivo. Quando si clicca su un preventivo dalla lista, si apre `OrderDetail` che include `AttachmentsSection`.

---

### Riepilogo tecnico

| File | Modifica |
|------|----------|
| `src/components/orders/OrderLinesEditor.tsx` | Sostituire input IVA con Select (0%, 4%, 10%, 22%) |
| `src/components/orders/NewPreventivoDialog.tsx` | Aggiungere Select IVA nelle righe preventivo (0%, 4%, 10%, 22%) |
| `src/components/orders/NewOrderDialog.tsx` | Stessa modifica Select IVA se presente editor righe |

