

## Ottimizzazione Velocita e Pulizia Codice Morto

### 1. Rimuovere codice morto

I seguenti file non sono importati da nessuna parte del progetto e possono essere eliminati:

| File | Motivo |
|------|--------|
| `src/App.css` | Boilerplate Vite originale, mai importato |
| `src/components/NavLink.tsx` | Componente mai utilizzato (il Layout usa direttamente `Link` di react-router) |
| `src/hooks/useAnalytics.ts` | Sostituito da `useUnifiedAnalytics.ts`, mai importato |

### 2. Ottimizzare il logo (impatto maggiore)

Il logo `logo_Thermodmr.png` pesa **482KB** e viene caricato **due volte** (sidebar desktop + sidebar mobile Sheet). Questo e il collo di bottiglia principale (1.7s di caricamento).

- Convertire il PNG in **WebP** (riduzione ~80% delle dimensioni)
- Aggiungere `loading="eager"` e `fetchPriority="high"` al tag img nel Layout
- Assicurarsi che venga caricato una sola volta dal browser (stesso `src`)

### 3. Ottimizzare import Suspense

Attualmente c'e un unico `<Suspense>` che avvolge tutte le route. Questo significa che qualsiasi navigazione mostra il loader globale. Spostare il Suspense dentro ogni `<Route>` non e necessario dato che il lazy loading gia funziona, ma possiamo:

- Rimuovere l'import inutilizzato di `Navigate` da react-router-dom in App.tsx

### 4. Rimuovere doppio sistema toast

Il progetto monta sia `<Toaster />` (shadcn) che `<Sonner />` contemporaneamente. Verificare quale viene effettivamente usato e rimuovere l'altro.

### Dettaglio tecnico

#### File da eliminare
- `src/App.css`
- `src/components/NavLink.tsx`
- `src/hooks/useAnalytics.ts`

#### File da modificare

| File | Modifica |
|------|----------|
| `src/App.tsx` | Rimuovere import `Navigate` (non usato) |
| `src/components/Layout.tsx` | Aggiungere `loading="eager"` e `fetchPriority="high"` al logo, ottimizzare dimensioni con `width`/`height` espliciti per evitare layout shift |

#### Impatto atteso

- **~480KB in meno** di trasferimento rete (logo ottimizzato)
- **~200ms** risparmiati su FCP
- Codebase piu pulita senza file orfani

