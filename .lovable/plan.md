

## Pulizia e Stabilizzazione - Sezione Ordini

### 1. PULIZIA CODICE

#### Duplicati da rimuovere

| Cosa | Dove | Problema |
|------|------|----------|
| `formatDate()` locale | `Orders.tsx` righe 27-33 | Duplica `formatDate` da `@/lib/utils.ts`. La versione locale usa `Intl.DateTimeFormat`, quella globale usa `date-fns` con locale italiano -- vanno unificati |
| `MoreVertical` import | `OrderMobileCard.tsx` riga 5 | Importato ma mai usato nel componente |
| Stat cards duplicate mobile/desktop | `Orders.tsx` righe 267-370 | Le 4 card statistiche sono scritte 2 volte (una versione mobile, una desktop) con lo stesso identico contenuto. Si puo usare un unico blocco con classi responsive |

#### Dettaglio rimozioni

- **`Orders.tsx`**: Rimuovere `formatDate` locale (righe 27-33), importare `formatDate` da `@/lib/utils`. Nota: il formato cambiera leggermente da "23/02/2026" a "23 feb 2026" per coerenza con il resto dell'app
- **`OrderMobileCard.tsx`**: Rimuovere `MoreVertical` dall'import di lucide-react (non usato)
- **`Orders.tsx`**: Unificare le stat cards in un unico blocco con classi responsive (`overflow-x-auto` su mobile, `grid` su desktop)

### 2. FIX FUNZIONALI

| Bug | Dettaglio | Fix |
|-----|-----------|-----|
| Error state senza retry | Riga 221-227: solo testo rosso, nessun bottone "Riprova" -- l'utente e bloccato | Aggiungere Card con icona, messaggio chiaro, e bottone "Riprova" che chiama `refetch()` dalla query |
| `percentuale_pagata` potenziale crash con `.toFixed()` | Riga 518 nella tabella: `order.percentuale_pagata.toFixed(0)` puo crashare se il valore e `null` (dalla view) | Aggiungere guard: `(order.percentuale_pagata ?? 0).toFixed(0)` |
| Mobile: `MobileOrderFilters` valori `statoPagamento` disallineati | In `MobileOrderFilters.tsx` i valori sono `not_paid/partial/paid` ma in `Orders.tsx` il filtro controlla `pagato/parziale/non_pagato` | Allineare i valori nel mobile filter a `pagato/parziale/non_pagato` per matchare la logica di filtro in `Orders.tsx` |
| `refetch` non estratto dalla query | `useOrdersInfinite` non espone `refetch` nell'uso corrente | Destrutturare `refetch` dalla query per usarlo nell'error state |

### 3. MIGLIORAMENTI UX

| Miglioramento | Dettaglio |
|---------------|-----------|
| Error state con retry | Card strutturata con icona `AlertCircle`, messaggio chiaro, e pulsante "Riprova" -- identico al pattern della Dashboard |
| Stat cards unificate | Un solo blocco di codice per mobile e desktop con classi responsive, eliminando 50+ righe duplicate |
| Empty state migliorato | Aggiungere icona e CTA "Crea Ordine" nella sezione vuota (solo per super_admin) invece di solo testo |
| Loading state piu informativo | Aggiungere testo "Caricamento ordini..." sotto lo spinner |

### 4. RIEPILOGO FILE MODIFICATI

| File | Tipo modifica |
|------|---------------|
| `src/pages/Orders.tsx` | Rimuovere `formatDate` locale, importare da utils, unificare stat cards, fix error state con retry, fix `percentuale_pagata` guard, fix empty state, fix loading state |
| `src/components/orders/OrderMobileCard.tsx` | Rimuovere import `MoreVertical` non usato |
| `src/components/orders/MobileOrderFilters.tsx` | Allineare valori `statoPagamento` a `pagato/parziale/non_pagato` |

### 5. DETTAGLIO TECNICO

#### Orders.tsx - Modifiche principali

**Import**: Rimuovere `formatDate` locale, aggiungere `formatDate` all'import da `@/lib/utils`:
```text
// Prima:
import { formatCurrency, getStatusColor, getStatusLabel, cn } from "@/lib/utils";
const formatDate = (date: Date) => { ... };

// Dopo:
import { formatCurrency, formatDate, getStatusColor, getStatusLabel, cn } from "@/lib/utils";
```

**Destrutturazione query**: aggiungere `refetch`:
```text
const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useOrdersInfinite(...);
```

**Error state migliorato**:
```text
if (error) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div className="text-center">
            <h3 className="font-semibold text-lg">Errore nel caricamento</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Impossibile caricare gli ordini. Verifica la connessione e riprova.
            </p>
          </div>
          <Button onClick={() => refetch()}>Riprova</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Stat cards unificate**: Un solo blocco con classi responsive:
```text
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

**Guard `percentuale_pagata`**: Nelle righe tabella dove si usa `.toFixed()`:
```text
{(order.percentuale_pagata ?? 0).toFixed(0)}%
```

#### MobileOrderFilters.tsx - Fix valori statoPagamento

```text
// Prima:
<SelectItem value="not_paid">Non Pagato</SelectItem>
<SelectItem value="partial">Pagamento Parziale</SelectItem>
<SelectItem value="paid">Pagato</SelectItem>

// Dopo:
<SelectItem value="non_pagato">Non Pagato</SelectItem>
<SelectItem value="parziale">Pagamento Parziale</SelectItem>
<SelectItem value="pagato">Pagato</SelectItem>
```

#### OrderMobileCard.tsx - Rimozione import morto

Rimuovere `MoreVertical` dalla riga di import lucide-react.

