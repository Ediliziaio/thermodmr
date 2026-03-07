

# Miglioramento Filtri Dashboard

## Problema
I filtri periodo sono ingombranti, duplicati (nel header e dentro il popover calendario), e la vista di default è "tutto" invece di mostrare l'anno corrente. L'esperienza è poco fluida.

## Soluzione

### 1. Default su Anno Corrente
- Inizializzare `dateRange` e `activeFilter` con il filtro "year" (anno corrente) invece di `undefined`/`null`
- La dashboard si apre già filtrata sull'anno in corso

### 2. Semplificare i filtri
- Rimuovere i filtri rapidi duplicati dentro il popover calendario
- Rendere i bottoni filtro più compatti e puliti con stile pill/segmented control
- Mantenere solo: **3M**, **6M**, **Anno**, **Anno Scorso** (rimuovere "Mese Scorso" che è poco utile)
- Il pulsante calendario rimane per selezione personalizzata
- Aggiungere un bottone "Tutto" per rimuovere i filtri e vedere tutti i dati

### 3. Layout header più pulito
- Filtri allineati a destra in una riga compatta senza wrapping caotico
- Rimuovere il badge data range dal sottotitolo (ridondante con i bottoni)
- Indicatore Real-time più discreto

### Modifiche file

**`src/pages/Dashboard.tsx`**:
- Stato iniziale: `activeFilter = "year"`, `dateRange` calcolato per anno corrente
- Riorganizzare header con filtri compatti
- Aggiungere opzione "Tutto" per reset
- Rimuovere duplicati dal popover calendario
- Pulire layout generale filtri

