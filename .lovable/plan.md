

## Miglioramento Layout Schermata Dettaglio Preventivo

### Problemi identificati dallo screenshot

1. **"Stato Preventivo"** occupa solo 1/3 della larghezza, lasciando 2/3 di spazio vuoto a destra
2. Lo stepper con 6 stati e compresso in una card stretta - difficile da leggere
3. Il titolo "Righe Ordine" non cambia in "Righe Preventivo" per i preventivi
4. Il layout generale e sbilanciato per la vista preventivo

### Modifiche pianificate

#### 1. Layout riorganizzato per la sezione superiore (OrderDetail.tsx)

Per i preventivi, la card "Stato Preventivo" diventa **full-width** invece di occupare solo 1 colonna su 3. Lo stepper avra piu spazio per respirare e sara leggibile.

Inoltre, sposto "Riepilogo Preventivo" e "Informazioni Preventivo" accanto allo stato in un layout a 3 colonne sotto il banner scadenza:

```text
[  Stato Preventivo (stepper full-width)         ]
[  Riepilogo  |  Informazioni  |  Cliente/Note   ]
[  Righe Preventivo (2/3)      |  Note (1/3)     ]
```

#### 2. Titolo dinamico "Righe Preventivo" (OrderLinesEditor.tsx)

- Aggiungere una prop opzionale `title?: string` al componente
- Passare `isPreventivo ? "Righe Preventivo" : "Righe Ordine"` da OrderDetail
- Stessa cosa per il totale in fondo: "Totale Preventivo" vs "Totale Ordine"

#### 3. Stato card full-width per preventivi (OrderDetail.tsx)

- Per preventivi: `grid-cols-1` (full width) invece di `grid-cols-1 lg:grid-cols-3`
- Per ordini: mantenere il layout attuale a 3 colonne
- Nascondere il dropdown "Modifica Stato" per i preventivi (gia fatto, ma la card resta stretta)

### Riepilogo tecnico

| File | Modifica |
|------|----------|
| `src/pages/OrderDetail.tsx` | Card Stato full-width per preventivi, layout riorganizzato |
| `src/components/orders/OrderLinesEditor.tsx` | Prop `title` per titolo dinamico + "Totale Preventivo" |

