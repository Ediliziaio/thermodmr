

# Barra di progresso pagamenti

## Modifica in `src/components/orders/PaymentsSection.tsx`

Aggiungere una barra di progresso visiva tra il riepilogo (grid 3 colonne) e lo storico pagamenti, usando il componente `Progress` già esistente.

### Dettagli
1. Importare `Progress` da `@/components/ui/progress` e `formatPercentage` da `@/lib/utils`
2. Calcolare `percentualePagata = totalAmount > 0 ? Math.min((totalPaid / totalAmount) * 100, 100) : 0`
3. Inserire dopo il grid riepilogo (dopo riga 256) un blocco con:
   - Label "Progresso Pagamento" con percentuale a destra
   - Barra `<Progress>` con colore dinamico: verde se >= 100%, arancione se >= 50%, rosso altrimenti
   - Testo sotto: "Pagato X di Y" 

La barra cambierà colore con una classe CSS custom sull'indicatore tramite la prop `className`.

