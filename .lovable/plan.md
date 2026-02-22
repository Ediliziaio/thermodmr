

## Ottimizzare l'immagine del serramento nella Hero

### Problema attuale
L'immagine del serramento PVC e forzata in un contenitore quadrato (420x420px) con `object-cover`, che la taglia. Inoltre ha `bg-white` e `border` che nascondono la trasparenza del PNG e creano un riquadro bianco rigido.

### Modifiche previste

**File**: `src/pages/Home.tsx` (riga 153-157)

1. **Rimuovere le dimensioni fisse quadrate** (`w-[220px] h-[220px]` ecc.) e usare invece `w-[280px] sm:w-[340px] lg:w-[460px]` solo in larghezza, lasciando l'altezza automatica cosi la finestra si vede per intero
2. **Cambiare `object-cover` in `object-contain`** per mostrare tutta l'immagine senza taglio
3. **Rimuovere `bg-white`** per far vedere lo sfondo scuro dell'hero attraverso la trasparenza del PNG
4. **Rimuovere `border-4 border-white/20`** e `rounded-3xl` perche con il PNG trasparente non servono bordi attorno a un rettangolo
5. **Aggiungere un leggero `drop-shadow`** tramite `drop-shadow-2xl` per dare profondita alla finestra sullo sfondo scuro

### Risultato
La finestra PVC apparira intera, senza ritaglio, con lo sfondo trasparente che si fonde naturalmente con lo sfondo scuro della hero section.
