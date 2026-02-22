

## Migliorare la pagina Chi Siamo

### Modifiche ai dati esistenti

1. **Tempi di consegna**: cambiare "15gg" in "2-6 sett." nella sezione Numeri (riga 112)
2. **Hero**: aggiornare il testo per coerenza ("tempi di consegna da 2 a 6 settimane")

### Due nuove sezioni prima del footer

Dopo la sezione CTA attuale (riga 124-137), aggiungere due nuove sezioni con animazioni coerenti al resto della pagina:

**Sezione "Trova il Rivenditore"**
- Sfondo chiaro (`bg-[hsl(0,0%,97%)]`)
- Icona `MapPin`, titolo "Trova il Rivenditore Piu Vicino"
- Breve testo: invito a trovare un punto vendita autorizzato nella propria zona
- Pulsante che porta a `/contatti` con label "Trova Rivenditore"

**Sezione "Diventa Rivenditore"**
- Sfondo scuro con gradiente (stile simile alla CTA finale della pagina DiventaRivenditore)
- Icona `Handshake`, titolo "Vuoi Diventare Rivenditore ThermoDMR?"
- Breve testo sui vantaggi (prezzi di fabbrica, zona esclusiva, supporto completo)
- Pulsante che porta a `/diventa-rivenditore` con label "Scopri Come"

### Sostituzione della CTA generica

La sezione CTA attuale "Vuoi Saperne di Piu?" (righe 124-137) verra rimossa perche sostituita dalle due nuove sezioni piu specifiche.

### Dettaglio tecnico

- File modificato: `src/pages/ChiSiamo.tsx`
- Import aggiuntivi: `MapPin`, `Handshake` da lucide-react
- Due nuovi `useInView` hooks per le animazioni delle sezioni aggiunte
- Layout e stile coerenti con il resto del sito

