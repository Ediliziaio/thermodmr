

## Correzione valori Uw nella tabella confronto e nelle pagine prodotto

I valori Uw nella tabella confronto sono tutti impostati a 1.3 W/m2K, ma devono essere differenziati:

| Modello | Attuale | Corretto |
|---------|---------|----------|
| DMR CONFORT | 1.3 W/m2K | 1.3 W/m2K (OK) |
| DMR DOMUS | 1.3 W/m2K | 1.1 W/m2K |
| DMR PASSIVE | 1.3 W/m2K | 0.8 W/m2K |

### File da modificare

**1. `src/components/products/ProductComparison.tsx`**
- Riga 44: Uw DMR DOMUS da "1.3 W/m2K" a "1.1 W/m2K"
- Riga 58: Uw DMR PASSIVE da "1.3 W/m2K" a "0.8 W/m2K"

**2. `src/pages/products/DmrDomus.tsx`**
- Riga 46: specs Uw da "1.3 W/m2K" a "1.1 W/m2K"

**3. `src/pages/products/DmrPassive.tsx`**
- Riga 46: specs Uw da "1.3 W/m2K" a "0.8 W/m2K"
- Riga 58: testo feature da "Uw fino a 1.3 W/m2K" a "Uw fino a 0.8 W/m2K"

Nessuna modifica strutturale, solo aggiornamento dei valori numerici.

