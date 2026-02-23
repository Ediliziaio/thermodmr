

## Fix Layout Stat Cards Ordini - Da Verticale a Orizzontale

### Problema

Le 4 stat cards (Totale Ordini, Valore Totale, Da Incassare, Ordini con Saldo) sono impilate verticalmente invece di essere disposte in orizzontale. Il bug e nella struttura HTML: c'e un `<div>` wrapper interno che raggruppa tutte le card come un unico figlio del grid, impedendo al grid di distribuirle in colonne.

```text
Struttura attuale (ERRATA):
<div class="grid grid-cols-4">     <-- grid con 1 solo figlio
  <div>                            <-- wrapper che contiene tutto
    <Card/>                        
    <Card/>
    <Card/>
    <Card/>
  </div>
</div>

Struttura corretta:
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">  <-- grid con 4 figli
  <Card/>
  <Card/>
  <Card/>
  <Card/>
</div>
```

### Modifica: `src/pages/Orders.tsx`

Rimuovere il `<div>` wrapper interno (riga 277 e riga 324) e applicare le classi grid/flex direttamente sul contenitore esterno:

- **Desktop**: `grid grid-cols-2 lg:grid-cols-4 gap-4` -- le 4 card si dispongono su una riga
- **Mobile**: `flex gap-4 overflow-x-auto` con scroll orizzontale e card a larghezza minima

Le classi `isMobile && "min-w-[200px]"` sulle singole Card restano invariate.

### File da modificare

| File | Modifica |
|------|----------|
| `src/pages/Orders.tsx` | Rimuovere div wrapper interno, applicare classi responsive direttamente sul contenitore |

