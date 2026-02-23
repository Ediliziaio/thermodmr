

## Semplificazione Sezione Preventivo

### Cosa cambia

Per i preventivi, la vista attuale mostra troppe sezioni (Stato stepper, Righe Preventivo con tabella complessa, ecc.). L'utente vuole solo:

1. **Descrizione** del preventivo (campo testo)
2. **Prezzo** (importo totale)
3. **Carica file** del preventivo (allegati)

### Modifiche su `src/pages/OrderDetail.tsx`

#### Rimuovere per i preventivi:
- La card "Stato Preventivo" con lo StatusStepper (non serve per un preventivo)
- Il componente `OrderLinesEditor` (le righe dettagliate non servono)
- Il layout a 3 colonne con grid `lg:grid-cols-3` -- usare layout piu semplice

#### Nuovo layout preventivo:

```text
[ Titolo + Badge + CTA "Converti in Ordine" ]
[ Banner scadenza (se presente)              ]
[ Info preventivo (2 colonne)                ]
[   - Rivenditore, Cliente, Date             ]
[   - Importo + Descrizione editabile        ]
[ Allegati Preventivo (full width)           ]
[ Note Rivenditore  |  Note Interne          ]
```

#### Dettaglio tecnico:

1. **Rimuovere StatusStepper per preventivi** -- la card "Stato Preventivo" viene nascosta quando `isPreventivo`
2. **Sostituire OrderLinesEditor** con una card "Descrizione Preventivo" contenente:
   - Campo `note_rivenditore` usato come descrizione principale del preventivo (gia presente nel DB)
   - Oppure meglio: usare `note_interna` per la descrizione tecnica e `note_rivenditore` per le note al dealer
3. **Importo** prominente in una card dedicata con possibilita di modifica (campo editabile per super_admin)
4. **Allegati** full-width e in evidenza con titolo "Documenti Preventivo"
5. **Note** in 2 colonne sotto gli allegati
6. **Riorganizzare** le 3 card info (Riepilogo, Informazioni, Rivenditore) in 2 colonne con le info raggruppate meglio

### Riepilogo delle modifiche nel file

| Sezione | Preventivo (nuovo) | Ordine (invariato) |
|---------|-------------------|-------------------|
| StatusStepper | Nascosto | Visibile |
| OrderLinesEditor | Nascosto, sostituito da textarea "Descrizione" | Visibile |
| Info card | 2 colonne: Info + Importo | Layout attuale |
| Allegati | Full-width, prominente, titolo "Documenti Preventivo" | Invariato |
| Note | 2 colonne sotto allegati | Layout attuale sidebar |
| PaymentsSection | Nascosto | Visibile |

### File modificati

- `src/pages/OrderDetail.tsx` -- unico file da modificare

