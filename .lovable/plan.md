

# Aggiungere stati "Valido" / "Non Valido" ai preventivi

## Cosa cambia
Attualmente lo stato e' calcolato dalla `data_scadenza_preventivo`: se scaduta mostra "Scaduto", altrimenti "Valido". L'utente vuole che lo stato sia etichettato come **"Valido"** e **"Non Valido"**.

## Intervento — solo `src/pages/DealerPreventivi.tsx`

Nessuna modifica al database. Lo stato resta derivato dalla data di scadenza.

1. **Rinominare i label**: "Scaduto/Scaduti" diventa "Non Valido/Non Validi" ovunque nel file
2. **Aggiornare il tipo `StatusFilter`**: `"scaduti"` diventa `"non_validi"` per coerenza
3. **Aggiornare i pulsanti filtro**: "Scaduti" → "Non Validi"
4. **Aggiornare le KPI card**: "Scaduti" → "Non Validi"
5. **Aggiornare i badge** nella tabella e nelle mobile card: il badge "Scaduto" diventa "Non Valido" mantenendo lo stesso stile rosso con animazione pulse
6. **Aggiornare la funzione `isExpired`**: rinominarla in `isNonValido` per chiarezza

Nessun nuovo componente, nessuna modifica DB.

