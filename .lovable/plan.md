

## Correzioni Menu + Pagine Vantaggi e Garanzie

### 1. Fix navigazione menu

**Problema**: nel `PublicNavbar.tsx` c'e una logica (`handleNavClick` + `sectionMap`) che, quando sei sulla homepage, intercetta i click su "Chi Siamo", "Vantaggi", "Garanzie" e "Contatti" e scrolla alla sezione della homepage invece di navigare alla pagina dedicata. Questo crea confusione perche le pagine dedicate esistono ma non vengono raggiunte.

**Soluzione**: rimuovere completamente il `sectionMap` e la funzione `handleNavClick`, cosi tutti i link navigano sempre alle pagine dedicate. Rimuovere anche il `onClick={(e) => handleNavClick(e, item.to)}` dai link desktop e mobile.

**File**: `src/components/PublicNavbar.tsx`

---

### 2. Aggiornare pagina Vantaggi

**File**: `src/pages/VantaggiPage.tsx`

Modifiche:
- **Tempi di consegna** (riga 26-29): cambiare `metric: "15gg"` in `"2-6 sett."` e aggiornare la descrizione con "da 2 a 6 settimane dalla conferma d'ordine"
- **Rimuovere card "Pagamenti Flessibili"** (righe 31-37): eliminare completamente il blocco con `metric: "60gg"` dall'array `mainAdvantages`. Rimuovere anche l'import di `CreditCard` da lucide-react
- L'array `mainAdvantages` passera da 4 a 3 elementi

---

### 3. Aggiornare pagina Garanzie

**File**: `src/pages/GaranziePage.tsx`

Modifiche:
- **Descrizione consegna** (riga 31): cambiare "15 giorni lavorativi dalla conferma d'ordine" in "Da 2 a 6 settimane dalla conferma d'ordine"
- **Dettaglio consegna** (riga 33): cambiare "15 giorni lavorativi garantiti contrattualmente" in "Da 2 a 6 settimane garantite contrattualmente"

---

### Riepilogo file modificati

| File | Modifica |
|------|----------|
| `src/components/PublicNavbar.tsx` | Rimuovere `sectionMap`, `handleNavClick` e relativi `onClick` |
| `src/pages/VantaggiPage.tsx` | Tempi 2-6 sett., rimuovere card 60gg pagamenti |
| `src/pages/GaranziePage.tsx` | Tempi 2-6 settimane nella sezione consegna |
