

## Rimuovere il colore celeste dalla sezione Contatori

### Problema
Nella sezione Stats (contatori), alcune parti usano il colore celeste `hsl(195,85%,55%)` -- in particolare i suffissi dei numeri (.000+, sett., %), le icone e il badge info. L'utente vuole tutto bianco.

### Modifiche

**File**: `src/pages/Home.tsx` (sezione StatItem, righe 261-298)

| Elemento | Prima (celeste) | Dopo (bianco) |
|----------|----------------|---------------|
| Cerchio icona sfondo | `bg-[hsl(195,85%,45%)]/20` | `bg-white/10` |
| Icona dentro cerchio | `text-[hsl(195,85%,55%)]` | `text-white/80` |
| Suffisso numero (riga 280, 285) | `text-[hsl(195,85%,55%)]` | `text-white/70` |
| Icona Info (riga 292) | `text-[hsl(195,85%,55%)]/60` | `text-white/40` |

Nessun altro file modificato. Le modifiche riguardano solo 4 classi CSS dentro il componente `StatItem`.
