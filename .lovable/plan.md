

## Aggiornamento Tempi di Consegna: "2-6 Settimane"

### Modifiche in `src/pages/Home.tsx`

#### 1. Badge immagine Hero (riga 153)
- **Prima:** "Consegna 15gg"
- **Dopo:** "Consegna 2-6 Settimane"

#### 2. Contatore stats (riga 225)
Il contatore animato attuale mostra "15gg - Tempi di Consegna" con un'animazione numerica. Poiché il nuovo formato è un range ("2-6 settimane"), il contatore verrà modificato così:
- **Prima:** `{ value: 15, suffix: "gg", label: "Tempi di Consegna" }`
- **Dopo:** `{ value: 6, suffix: " sett.", label: "Tempi di Consegna", prefix: "2-" }` — oppure in alternativa si può usare un formato statico "2-6 Settimane" come label dedicata

#### 3. Lista vantaggi "Diventa Rivenditore" (riga 640)
- **Prima:** "Consegne rapide"
- **Dopo:** "Consegna in 2-6 settimane"

#### 4. Nota esplicativa (opzionale)
Aggiunta di un piccolo testo sotto il badge o il contatore: "in base a colori e modello" per chiarire la variabilità.

---

### Dettagli tecnici

| File | Modifica |
|------|----------|
| `src/pages/Home.tsx` | 3 sostituzioni di testo sui tempi di consegna, eventuale adattamento del contatore animato per gestire il range |

