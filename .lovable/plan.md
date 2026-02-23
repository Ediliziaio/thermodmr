

## Pulizia e Stabilizzazione - Sezione Pagamenti

### 1. PULIZIA CODICE

| Cosa | Dove | Problema |
|------|------|----------|
| `formatDateLocal()` locale | `Pagamenti.tsx` righe 80-82 | Duplica `formatDate` gia presente in `@/lib/utils.ts`. Stessa identica logica |
| Stat cards duplicate mobile/desktop | `Pagamenti.tsx` righe 200-242 | Le 4 card statistiche sono scritte 2 volte (mobile scrollabile + desktop grid) con lo stesso contenuto. Unificabili con classi responsive |
| Import `motion` non usato | `Pagamenti.tsx` riga 31 | `framer-motion` importato ma mai utilizzato nel componente |
| `MobilePaymentFilters` doppio rendering filtri | `Pagamenti.tsx` righe 267-277 | `MobilePaymentsList` (riga 247) ha gia i propri filtri interni (bottone Filter + Sheet). `MobilePaymentFilters` aggiunge un secondo FAB filtri sovrapposto |

### 2. FIX FUNZIONALI

| Bug | Dettaglio | Fix |
|-----|-----------|-----|
| Error state usa `window.location.reload()` | Riga 169: ricarica l'intera pagina invece di rilanciare la query | Destrutturare `refetch` dalla query e usare `refetch()` nel bottone "Riprova", con Card strutturata e icona `AlertCircle` (pattern Dashboard/Ordini) |
| `refetch` non estratto dalla query | `usePaymentsInfinite` non espone `refetch` nell'uso corrente | Aggiungere `refetch` alla destrutturazione a riga 58 |
| `percentuale_pagata.toFixed(0)` senza guard | `NewPaymentDialog.tsx` riga 228 | Se `percentuale_pagata` e `null`, `.toFixed()` crasha. Fix: `(selectedOrder.percentuale_pagata ?? 0).toFixed(0)` |
| Metodo pagamento: mismatch valori maiuscolo/minuscolo | `NewPaymentDialog` usa "Bonifico", "Carta di Credito", ecc. mentre i filtri cercano "bonifico", "carta" | Questo potrebbe causare filtri che non trovano risultati. Da verificare che il database salvi il valore cosi com'e -- se i filtri non funzionano, standardizzare a lowercase nel dialog |

### 3. MIGLIORAMENTI UX

| Miglioramento | Dettaglio |
|---------------|-----------|
| Error state con retry | Card strutturata con icona `AlertCircle`, messaggio chiaro, e pulsante "Riprova" con `refetch()` -- identico al pattern Dashboard e Ordini |
| Stat cards unificate | Un solo blocco responsive: `grid grid-cols-2 lg:grid-cols-4` con scroll orizzontale su mobile, eliminando ~40 righe duplicate |
| Rimozione FAB filtri doppio su mobile | Rimuovere `MobilePaymentFilters` dal render mobile perche `MobilePaymentsList` gestisce gia filtri e search nel proprio bottom sheet |
| Loading state informativo | Aggiungere testo "Caricamento pagamenti..." sotto gli skeleton per feedback utente |

### 4. RIEPILOGO FILE MODIFICATI

| File | Tipo modifica |
|------|---------------|
| `src/pages/Pagamenti.tsx` | Rimuovere `formatDateLocal`, import `motion`, stat cards duplicate, `MobilePaymentFilters` doppio; fix error state con retry; unificare stat cards |
| `src/components/payments/NewPaymentDialog.tsx` | Guard `percentuale_pagata ?? 0` |

### 5. DETTAGLIO TECNICO

#### Pagamenti.tsx - Modifiche principali

**Import puliti**: rimuovere `motion` da framer-motion (non usato). Aggiungere `formatDate` all'import da `@/lib/utils`. Rimuovere `formatDateLocal` locale. Aggiungere `AlertCircle` a lucide-react.

**Destrutturazione query**: aggiungere `refetch`:
```text
const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = usePaymentsInfinite(...);
```

**Error state migliorato** (sostituire righe 163-177):
```text
if (error) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] p-6">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div className="text-center">
            <h3 className="font-semibold text-lg">Errore nel caricamento</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Impossibile caricare i pagamenti. Verifica la connessione e riprova.
            </p>
          </div>
          <Button onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />Riprova
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Stat cards unificate** (sostituire righe 199-242):
```text
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {[
    { title: "Totale Incassato", icon: Euro, value: formatCurrency(totaleIncassato), subtitle: `${payments.length} pagamenti` },
    { title: "Media Importo", icon: TrendingUp, value: formatCurrency(mediaImporto), subtitle: "per pagamento" },
    { title: "Pagamenti in Attesa", icon: Clock, value: payments.filter(p => p.tipo === "acconto").length, subtitle: "acconti registrati" },
    { title: "Metodo Piu Usato", icon: CreditCard, value: metodoPiuUsatoNome, subtitle: "piu popolare", capitalize: true }
  ].map((stat, i) => (
    <Card key={i}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        <stat.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${stat.capitalize ? 'capitalize' : ''}`}>{stat.value}</div>
        <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

**Rimozione `MobilePaymentFilters`**: nel blocco mobile (righe 246-278), rimuovere il componente `<MobilePaymentFilters ... />` perche `MobilePaymentsList` ha gia il proprio sistema di filtri integrato con bottom sheet.

**Sostituzione `formatDateLocal`**: nelle righe tabella, usare `formatDate(payment.data_pagamento)` al posto di `formatDateLocal(payment.data_pagamento)`.

#### NewPaymentDialog.tsx - Guard percentuale_pagata

Riga 228, aggiungere guard null:
```text
// Prima:
{selectedOrder.percentuale_pagata.toFixed(0)}%

// Dopo:
{(selectedOrder.percentuale_pagata ?? 0).toFixed(0)}%
```

