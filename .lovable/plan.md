

## Rendere la Vista Lista quella Predefinita + Aggiungere Dati Finanziari alla DealerCard

### Modifiche

#### 1. `src/pages/Dealers.tsx`
- Cambiare il valore iniziale di `viewMode` da `"grid"` a `"list"` (riga 18)

#### 2. `src/components/dealers/DealerCard.tsx`
- Aggiungere due righe nella sezione statistiche (dopo "Fatturato totale"):
  - **Incassato**: in verde, mostra `total_paid`
  - **Da incassare**: in giallo/arancio se > 0, mostra `total_remaining`

### Dettaglio tecnico

**Dealers.tsx** -- riga 18:
```text
// Da:
const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
// A:
const [viewMode, setViewMode] = useState<"grid" | "list">("list");
```

**DealerCard.tsx** -- dopo riga 120 (dopo "Fatturato totale"), aggiungere:
```text
<div className="flex justify-between text-sm">
  <span className="text-muted-foreground">Incassato:</span>
  <span className="font-medium text-green-600">
    {formatCurrency(dealer.total_paid || 0)}
  </span>
</div>
<div className="flex justify-between text-sm">
  <span className="text-muted-foreground">Da incassare:</span>
  <span className={cn("font-medium", (dealer.total_remaining || 0) > 0 ? "text-amber-600" : "text-muted-foreground")}>
    {formatCurrency(dealer.total_remaining || 0)}
  </span>
</div>
```

Importare `cn` da `@/lib/utils` (gia esportato da quel file).

### File modificati

| File | Modifica |
|------|----------|
| `src/pages/Dealers.tsx` | Default viewMode da "grid" a "list" |
| `src/components/dealers/DealerCard.tsx` | Aggiungere righe Incassato e Da incassare con colori semantici |
