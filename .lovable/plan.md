

## Escludere i preventivi dalla lista Ordini

### Modifica

**`src/hooks/useOrdersInfinite.ts`** (1 riga)

Aggiungere `.neq("stato", "preventivo")` alla query, subito dopo `.order(...)` (riga 32), in modo che tutti gli ordini con stato `preventivo` vengano esclusi dalla lista ordini.

Questo garantisce che:
- La pagina **Ordini** mostra solo ordini confermati/in lavorazione
- La pagina **Preventivi** (che usa una query separata con `.eq("stato", "preventivo")`) resta l'unico posto dove vedere i preventivi
- Il filtro si applica sia nella vista globale che nell'area rivenditore

