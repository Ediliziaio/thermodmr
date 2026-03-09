
# Rimuovere riferimenti a Commissioni/Provvigioni dai Rivenditori

## File da modificare

### 1. `src/components/dealers/DealerRowView.tsx`
- Rimuovere la colonna "Comm." dall'header (riga 192)
- Rimuovere il rendering di `commissione_personalizzata` nelle righe (righe 52-59)
- Aggiornare il grid da `grid-cols-[2fr_1.2fr_0.6fr_1fr_1fr_1fr_0.6fr]` a `grid-cols-[2fr_1.2fr_0.6fr_1fr_1fr_1fr]` (sia header riga 185 che row riga 36)

### 2. `src/components/dealers/DealerCard.tsx`
- Rimuovere il blocco "Commissione" (righe 134-141)

### 3. `src/components/dealers/MobileDealerCard.tsx`
- Rimuovere il badge `commissione_personalizzata` (righe 91-95)

### 4. `src/components/dealers/NewDealerDialog.tsx`
- Rimuovere il campo "Commissione Personalizzata (%)" dal form e dal formData

### 5. `src/components/dealers/EditDealerDialog.tsx`
- Rimuovere il campo "Commissione Personalizzata (%)" dal form e dal formData

### 6. `src/pages/DealerDetail.tsx`
- Rimuovere il blocco che mostra la commissione personalizzata (righe 249-254)

### 7. `src/lib/exportUtils.ts`
- Rimuovere "Commissione Personalizzata" dall'export rivenditori (riga 88)
- Rimuovere `exportCommissionsCustom`, `COMMISSION_COLUMNS` e l'export commerciali con provvigioni (righe 148-158, 260-344)

Nessuna modifica al database: la colonna `commissione_personalizzata` resta per compatibilità storica, semplicemente non viene più mostrata nell'UI.
