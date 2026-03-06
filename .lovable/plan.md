

# Semplificare le Righe Preventivo: solo Descrizione e Prezzo

## Cosa cambia
Nel preventivo, ogni riga mostra attualmente 6 campi (Categoria, Descrizione, Quantità, Prezzo Unitario, Sconto, IVA). L'utente vuole solo **Descrizione** e **Prezzo**.

## Approccio
Aggiungere una prop `simplified` a `OrderLinesEditor`. Quando `simplified={true}`:
- Mostrare solo Descrizione (full width) e Prezzo Unitario
- Nascondere Categoria, Quantità, Sconto, IVA
- I valori nascosti mantengono i default (quantità=1, sconto=0, iva=22) per il calcolo corretto
- Il totale riga diventa semplicemente prezzo × (1 + iva/100) con iva fissa a 22%

## File da modificare

### 1. `src/components/orders/OrderLinesEditor.tsx`
- Aggiungere prop `simplified?: boolean` all'interfaccia
- Quando `simplified=true`: renderizzare solo i campi Descrizione e Prezzo in layout semplice (1 riga per voce)
- Nascondere il riepilogo Imponibile/IVA nel footer (mostrare solo il totale)

### 2. `src/pages/OrderDetail.tsx`
- Passare `simplified` a `OrderLinesEditor` nella sezione preventivo:
  ```tsx
  <OrderLinesEditor simplified lines={...} ... />
  ```

