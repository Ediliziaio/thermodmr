

## Pulizia e Stabilizzazione - Sezione Dealers

### 1. PULIZIA CODICE

| Cosa | Dove | Problema |
|------|------|----------|
| `formatCurrency()` locale | `DealerCard.tsx` righe 21-26 | Duplica `formatCurrency` da `@/lib/utils.ts` |
| `formatCurrency()` locale | `MobileDealerCard.tsx` righe 16-21 | Stessa duplicazione |
| `showNewDealerDialog` stato inutilizzato | `Dealers.tsx` riga 17 | Dichiarato ma mai usato |
| `PROVINCE_ITALIANE` duplicato | `DealerFilters.tsx` righe 23-32 e `MobileDealerFilters.tsx` righe 29-38 | Array identico copiato in 2 file. Da estrarre in costante condivisa |

### 2. FIX FUNZIONALI

| Bug | Dettaglio | Fix |
|-----|-----------|-----|
| Error state senza retry | `Dealers.tsx` righe 40-45: solo testo rosso, nessun bottone "Riprova" | Card strutturata con `AlertCircle`, messaggio chiaro, e bottone "Riprova" con `refetch()` (pattern Ordini/Pagamenti) |
| `refetch` non estratto | `Dealers.tsx` riga 19 | Aggiungere `refetch` alla destrutturazione |
| Swipe dialogs rotti su mobile | `MobileDealerCard.tsx` righe 161-194: i dialog con `trigger={null}` non fanno nulla, e i dialog condizionali con bottoni hidden non aprono correttamente i dialog | Usare stato `open` controllato per `EditDealerDialog` e `DeleteDealerDialog`, eliminando i trigger fantasma |

### 3. MIGLIORAMENTI UX

| Miglioramento | Dettaglio |
|---------------|-----------|
| Error state con retry | Card strutturata con icona, messaggio, e pulsante "Riprova" -- identico al pattern Ordini e Pagamenti |
| Loading state informativo | Aggiungere testo "Caricamento rivenditori..." sotto lo spinner |
| Empty state migliorato | Aggiungere icona `Building2` e CTA "Nuovo Rivenditore" nello stato vuoto |

### 4. RIEPILOGO FILE MODIFICATI

| File | Tipo modifica |
|------|---------------|
| `src/pages/Dealers.tsx` | Rimuovere stato `showNewDealerDialog`, fix error state con retry, fix loading state, fix empty state con CTA |
| `src/components/dealers/DealerCard.tsx` | Rimuovere `formatCurrency` locale, importare da `@/lib/utils` |
| `src/components/dealers/MobileDealerCard.tsx` | Rimuovere `formatCurrency` locale, importare da `@/lib/utils`; fix swipe dialogs con stato controllato |
| `src/lib/dealerConstants.ts` | Nuovo file: costante `PROVINCE_ITALIANE` condivisa |
| `src/components/dealers/DealerFilters.tsx` | Importare `PROVINCE_ITALIANE` dal file condiviso |
| `src/components/dealers/MobileDealerFilters.tsx` | Importare `PROVINCE_ITALIANE` dal file condiviso |

### 5. DETTAGLIO TECNICO

#### Dealers.tsx - Modifiche principali

**Rimuovere stato inutilizzato**:
```text
// Rimuovere:
const [showNewDealerDialog, setShowNewDealerDialog] = useState(false);
```

**Destrutturazione query**: aggiungere `refetch`:
```text
const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useDealersInfinite(filters);
```

**Error state migliorato** (sostituire righe 40-46):
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
              Impossibile caricare i rivenditori. Verifica la connessione e riprova.
            </p>
          </div>
          <Button onClick={() => refetch()}>Riprova</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Loading state con testo**:
```text
if (isLoading && !data) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Caricamento rivenditori...</p>
    </div>
  );
}
```

**Empty state con icona e CTA**: aggiungere `Building2` e `NewDealerDialog` come CTA nello stato vuoto (sia mobile che desktop).

#### DealerCard.tsx e MobileDealerCard.tsx - Rimuovere formatCurrency locale

```text
// Rimuovere (righe 21-26 in DealerCard, 16-21 in MobileDealerCard):
const formatCurrency = (amount: number) => { ... };

// Aggiungere all'import:
import { formatCurrency } from "@/lib/utils";
```

#### MobileDealerCard.tsx - Fix swipe dialogs

Sostituire il sistema di dialog rotto (trigger={null} + hidden buttons, righe 161-194) con dialog a stato controllato:

```text
// I dialog EditDealerDialog e DeleteDealerDialog ricevono gia prop "trigger" opzionale.
// Pero servono anche prop open/onOpenChange per controllare apertura esterna.
// Verificare se i dialog supportano open controllato:
// - EditDealerDialog: usa stato interno open, non accetta open da props
// - DeleteDealerDialog: usa stato interno open, non accetta open da props

// Soluzione: aggiungere prop open/onOpenChange opzionali a entrambi i dialog
// oppure usare un approccio piu semplice con ref/click programmatico.

// Approccio scelto: aggiungere prop opzionali open/onOpenChange ai dialog,
// e in MobileDealerCard controllare l'apertura via stato.
```

I dialog `EditDealerDialog` e `DeleteDealerDialog` vanno modificati per accettare `open`/`onOpenChange` opzionali (controlled mode). In `MobileDealerCard`, i dialog fantasma (righe 161-194) vengono sostituiti con:
```text
<EditDealerDialog
  dealer={dealer}
  open={showEditDialog}
  onOpenChange={setShowEditDialog}
/>
<DeleteDealerDialog
  dealer={dealer}
  open={showDeleteDialog}
  onOpenChange={setShowDeleteDialog}
/>
```

#### Nuovo file: src/lib/dealerConstants.ts

```text
export const PROVINCE_ITALIANE = [
  "AG", "AL", "AN", "AO", ... "VT"
];
```

#### DealerFilters.tsx e MobileDealerFilters.tsx

Rimuovere array `PROVINCE_ITALIANE` locale, importare da `@/lib/dealerConstants`.

