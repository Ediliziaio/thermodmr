

## Miglioramento sezione Contatori (Stats) nella Homepage

### Problema attuale
I contatori sono visualizzati in modo basico: numero + etichetta su sfondo scuro. La voce "Tempi di Consegna" mostra "2-6 sett." con la nota "in base a colori e modello" che appare piccola e poco leggibile. L'aspetto generale e piatto e poco coinvolgente.

### Miglioramenti previsti

**File**: `src/pages/Home.tsx` (sezione Stats, righe 222-282)

1. **Card con sfondo semi-trasparente** - Ogni statistica avra un contenitore con bordo sottile bianco/10% e sfondo white/5%, border-radius arrotondato, per dare profondita e separazione visiva

2. **Icone decorative** - Aggiungere un'icona tematica sopra ogni numero:
   - Finestre Installate: icona `LayoutGrid`
   - Anni di Esperienza: icona `Calendar`
   - Tempi di Consegna: icona `Truck`
   - Clienti Soddisfatti: icona `ThumbsUp`

3. **Numerazione piu leggibile** - Suffissi (.000+, %, ecc.) con font leggermente piu piccolo rispetto al numero principale per creare gerarchia visiva

4. **Nota "Tempi di Consegna"** - Rendere la nota piu visibile: testo bianco/50% anziche bianco/40%, con un piccolo badge "info" inline

5. **Hover effect** - Leggero scale-up e cambio bordo al passaggio del mouse (desktop)

6. **Mobile** - Ridurre font da text-4xl a text-3xl su mobile per evitare overflow, padding interno p-4

### Dettagli tecnici

| Elemento | Prima | Dopo |
|----------|-------|------|
| Container stat | Nessuno | `rounded-2xl bg-white/5 border border-white/10 p-6` |
| Icona | Assente | Icona 28px in cerchio `bg-[hsl(195,85%,45%)]/20` |
| Numero | `text-4xl sm:text-5xl` | `text-3xl sm:text-5xl` con suffisso `text-2xl sm:text-3xl` |
| Nota consegna | `text-xs text-white/40` | `text-xs text-white/50` con icona info |
| Hover | Nessuno | `hover:bg-white/8 hover:scale-[1.02] transition-all` |

Un solo file modificato: `src/pages/Home.tsx`
