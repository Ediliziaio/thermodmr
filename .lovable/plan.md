

# Dropdown Settimana Consegna + Allineamento Allegati Preventivi/Ordini

## Cosa cambia

### 1. Settimana Consegna → Dropdown con label mese
Sostituire l'input numerico con un `Select` dropdown contenente le 53 settimane dell'anno. Ogni opzione mostra il numero della settimana e il mese abbreviato di inizio, es:
- `1 - Gen`
- `5 - Feb`
- `9 - Mar`
- `22 - Mag`
- `52 - Dic`

Il range di date (es. "02 Giu - 08 Giu 2026") resta visibile sotto il dropdown come testo informativo.

### 2. Allegati preventivi = stessi degli ordini
La sezione allegati nei preventivi usa già lo stesso componente `AttachmentsSection`. Attualmente è posizionata nella colonna principale (sotto le note). Nessuna modifica necessaria — il comportamento è già identico (upload, download con signed URL, eliminazione con conferma).

## File da modificare

### `src/pages/OrderDetail.tsx`
- **Sezione Settimana Consegna** (righe ~654-683): sostituire `<Input type="number">` con `<Select>` dropdown
- Generare le 53 opzioni con una funzione helper che calcola il mese di inizio di ciascuna settimana
- Mantenere la label informativa con il range di date sotto il Select

