

## Miglioramento tabella confronto modelli e Uw = 1.3 ovunque

### 1. Aggiornare Uw a 1.3 W/m2K in tutti i file

**ProductComparison.tsx** - Tutti e 3 i modelli: Uw = "1.3 W/m2K"

**DmrConfort.tsx** - specs: Uw da "0.88 W/m2K" a "1.3 W/m2K"

**DmrDomus.tsx** - specs: Uw da "1.1 W/m2K" a "1.3 W/m2K"

**DmrPassive.tsx** - specs: Uw da "0.8 W/m2K" a "1.3 W/m2K" + aggiornare il testo nella feature list che cita "Uw fino a 0.8 W/m2K"

---

### 2. Migliorare la tabella confronto modelli (ProductComparison.tsx)

Aggiornare i dati della tabella per allinearli con le specifiche reali dei prodotti:

| Specifica | DMR CONFORT | DMR DOMUS | DMR PASSIVE |
|-----------|-------------|-----------|-------------|
| Camere | 5 | 5 | 7 |
| Profondita | 72 mm | 76 mm | 82 mm |
| Uw | 1.3 W/m2K | 1.3 W/m2K | 1.3 W/m2K |
| Vetro | fino a 49 mm | Gas argon | Triplo basso emissivo |
| Acustica | 46 dB | 38 dB | 45 dB |
| Sicurezza | Anti-effrazione | RC2 opzionale | RC2 + perimetrale |

Aggiungere la riga "Profondita" al posto di "Classe" per dare un dato tecnico piu utile nel confronto. Le spec keys diventano: Camere, Profondita, Uw, Vetro, Acustica, Sicurezza.

Miglioramenti visivi:
- Badge con colori differenziati per ogni modello (verde per "Miglior Prezzo", blu per "Best Seller", oro per "Top di Gamma")
- Mobile: mostrare tutte le 6 specs invece di solo le prime 4

---

### Riepilogo file modificati

| File | Modifiche |
|------|-----------|
| `src/components/products/ProductComparison.tsx` | Specs aggiornate con dati reali, Uw = 1.3 per tutti, nuove spec keys (Profondita, Sicurezza), badge colorati, mobile con tutte le specs |
| `src/pages/products/DmrConfort.tsx` | Uw da 0.88 a 1.3 W/m2K |
| `src/pages/products/DmrDomus.tsx` | Uw da 1.1 a 1.3 W/m2K |
| `src/pages/products/DmrPassive.tsx` | Uw da 0.8 a 1.3 W/m2K + testo feature aggiornato |

