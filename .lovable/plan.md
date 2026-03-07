

# Spostare Pagamenti e Modalità di Pagamento sotto lo Stato Ordine

## Modifiche in `src/pages/OrderDetail.tsx`

### 1. Spostare PaymentsSection subito dopo il card "Stato Ordine"
- Rimuovere `<PaymentsSection>` dalla colonna sinistra del grid (righe 587-591)
- Posizionarlo subito dopo il card Stato Ordine e prima del PaymentTimelineChart (tra riga 565 e 567)

### 2. Spostare Modalità Pagamento dal sidebar al card Stato Ordine
- Rimuovere il blocco "Modalità di Pagamento" (righe 658-682) dal card "Riepilogo Economico" nella sidebar
- Aggiungerlo all'interno del card "Stato Ordine" (dopo il Select stato, riga 563), come un campo aggiuntivo con la stessa logica (Select per super_admin, testo per gli altri)

Risultato: Stato → Modalità Pagamento → Pagamenti → Timeline → Grid (Righe Ordine, Note, Allegati, Ticket | Sidebar)

