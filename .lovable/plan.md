

## Correzione Colori Landing Page - Da Rosso a Blu/Teal del Logo

### Il Problema
La pagina usa ovunque `hsl(10, 80%, 50%)` (rosso/arancio) che NON corrisponde ai colori del logo ThermoDMR. Il logo ha colori **blu/teal** (circa `hsl(195, 85%, 45%)`) e testo scuro. Inoltre, sulla navbar scura il logo con testo nero non si legge.

---

### Cosa cambiera

**1. Colore principale: da rosso a blu/teal del logo**

Tutti i 122 riferimenti a `hsl(10, 80%, ...)` verranno sostituiti con il colore blu/teal del logo:

| Uso | Prima (rosso) | Dopo (blu/teal logo) |
|-----|---------------|---------------------|
| Colore primario | `hsl(10, 80%, 50%)` | `hsl(195, 85%, 45%)` |
| Hover | `hsl(10, 80%, 42%)` | `hsl(195, 85%, 38%)` |
| Testo chiaro | `hsl(10, 80%, 55%)` | `hsl(195, 85%, 55%)` |
| Testo piu chiaro | `hsl(10, 80%, 60%)` | `hsl(195, 85%, 60%)` |
| Ombre/glow | `hsl(10, 80%, 50%, 0.3)` | `hsl(195, 85%, 45%, 0.3)` |
| Gradiente (da) | `hsl(10, 80%, 55%)` | `hsl(195, 85%, 50%)` |
| Gradiente (a) | `hsl(30, 90%, 55%)` | `hsl(210, 80%, 55%)` |
| CTA finale overlay (da) | `hsl(10, 80%, 40%)` | `hsl(195, 85%, 35%)` |
| CTA finale overlay (a) | `hsl(25, 85%, 35%)` | `hsl(210, 80%, 35%)` |
| CTA finale testo | `hsl(10, 80%, 45%)` | `hsl(195, 85%, 40%)` |

**2. Logo su navbar scura**

Il logo attuale ha parti in nero che non si leggono sullo sfondo scuro. Soluzione:
- Aggiungere un filtro CSS `brightness` e `invert` selettivo al logo quando la navbar e scura
- Oppure usare un approccio con `filter: brightness(0) invert(1)` per rendere il logo bianco su sfondo scuro, e poi tornare ai colori originali quando la navbar diventa bianca allo scroll
- In pratica: classe CSS condizionale `brightness-0 invert` quando `!scrolled`, rimossa quando `scrolled`

### Dettagli tecnici

| File | Modifica |
|------|----------|
| `src/pages/Home.tsx` | Sostituzione di tutti i colori rosso/arancio con blu/teal del logo + filtro CSS condizionale sul logo nella navbar |

Nessun altro file da modificare.
