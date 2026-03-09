

# Data Scadenza Preventivo: Default 30 giorni automatico

## Modifica

### `src/components/orders/NewPreventivoDialog.tsx`
- Calcolare la data di default come `oggi + 30 giorni` in formato `YYYY-MM-DD`
- Usarla come valore iniziale di `data_scadenza_preventivo` nel form (riga 113)
- Anche nel reset per duplicazione (dove attualmente è sempre `""`), pre-compilare con `oggi + 30 giorni`

Unica modifica: una riga per generare la data e sostituire `""` con il valore calcolato in due punti.

