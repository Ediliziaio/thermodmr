

# Ottimizzazione UX Preventivo

## Problemi attuali (dallo screenshot)
- Layout piatto con card tutte impilate verticalmente, molto spazio vuoto
- La card "Importo Preventivo" ha troppo spazio bianco e poca informazione
- Descrizione e Note Interne sono card separate identiche, ridondanti visivamente
- Nessun indicatore visivo di "completezza" del preventivo
- Il pulsante "Converti in Ordine" e' isolato in alto, poco enfatizzato
- Manca un riepilogo rapido delle righe preventivo (prodotti quotati)

## Interventi

### 1. Header compatto e informativo
- Unificare header con badge stato + importo in un unico blocco hero
- Importo grande visibile subito accanto al titolo, non in una card separata
- Il pulsante "Converti in Ordine" rimane prominente ma integrato nel header

### 2. Layout a 2 colonne (desktop) con sidebar informativa
- **Colonna principale (2/3)**: Righe preventivo (OrderLinesEditor in readOnly), Descrizione, Allegati
- **Sidebar (1/3)**: Card riepilogo (importo, rivenditore, cliente, date, scadenza), Note Interne
- Su mobile: tutto impilato ma con ordine logico migliore

### 3. Card "Riepilogo Preventivo" compatta nella sidebar
- Combina i dati di "Dettagli Preventivo" e "Importo" in una sola card
- Importo in evidenza in alto, poi lista dati sotto in formato label/value
- Banner scadenza integrato nella card (non separato)

### 4. Mostrare le righe del preventivo
- Aggiungere OrderLinesEditor in readOnly per mostrare i prodotti quotati
- Attualmente il preventivo non mostra le righe, perdendo informazione chiave

### 5. Note unificate con Tab
- Descrizione e Note Interne in una sola card con Tabs (2 tab)
- Riduce l'ingombro verticale e organizza meglio

### 6. Azioni preventivo migliorate
- Aggiungere pulsanti "Esporta PDF" e "Duplica" anche per i preventivi
- CTA "Converti in Ordine" con colore accent, piu' visibile

## File da modificare
- `src/pages/OrderDetail.tsx` — sezione `isPreventivo` (righe 273-374): riscrivere il layout

## Risultato atteso
Da 4 card impilate verticalmente a un layout strutturato 2 colonne con sidebar, righe prodotto visibili, e note organizzate in tab.

