

# Enterprise Code Review — Piano di Intervento

## Stato Attuale

Il progetto e' gia' a buon livello dopo i refactor precedenti. L'audit identifica **8 interventi concreti** (nessuno rompe funzionalita' esistenti).

---

## FASE 1: Bug Funzionali (P0)

### 1. Sidebar: rimuovere link `/audit` morto
**File:** `src/components/Layout.tsx` (riga 39)
- La route `/audit` non esiste in `App.tsx`. Il link porta a 404.
- **Fix:** Rimuovere la voce `{ name: "Audit", href: "/audit" }` dalla navigazione. L'Audit Log e' gia' accessibile in Impostazioni.

### 2. Sidebar: nascondere "RLS Test" in produzione
**File:** `src/components/Layout.tsx` (riga 40)
- La route `/rls-test` esiste solo con `import.meta.env.DEV` in App.tsx, ma il link sidebar e' sempre visibile.
- **Fix:** Aggiungere condizione `import.meta.env.DEV` al filtro navigazione per la voce RLS Test.

### 3. NewCommercialeDialog: rimuovere campo password obsoleto
**File:** `src/components/commerciali/NewCommercialeDialog.tsx`
- Il dialog chiede una password all'utente, ma `create-user` ora genera la password server-side.
- **Fix:** Rimuovere il campo password dal form e dalla mutazione. Mostrare la password generata dal server dopo la creazione (come gia' fa `InviteUserDialog`).

### 4. useRLSTests: bug session restore
**File:** `src/hooks/useRLSTests.ts` (riga 364)
- Dopo i test, tenta di ripristinare la sessione admin usando `originalUser.email!` e `testUsers.super_admin.password`. Ma `testUsers.super_admin.password` e' la password del test user, non dell'admin originale.
- **Fix:** Questo e' un hook dev-only e il bug e' noto. Aggiungere commento documentativo e skip del restore automatico — l'utente dovra' ri-autenticarsi manualmente dopo i test.

---

## FASE 2: Cleanup Codice (P1)

### 5. Rimuovere Bell notification placeholder
**File:** `src/components/Layout.tsx` (righe 161-164)
- Il bottone Bell non ha alcuna funzionalita'. UX confusa.
- **Fix:** Rimuovere il bottone e l'import `Bell` da lucide-react.

### 6. Rimuovere console.log di debug
**File:** `src/hooks/useOrdersInfinite.ts` (righe 55-62)
- `console.log("[useOrdersInfinite]")` attivo in DEV. Inquina la console durante lo sviluppo.
- **Fix:** Rimuovere il blocco di debug logging.

### 7. useScheduledRLSTests: convertire a useQuery
**File:** `src/hooks/useScheduledRLSTests.ts`
- Usa `useState + useEffect + fetch manuale` invece del pattern standard `useQuery`.
- **Fix:** Riscrivere con `useQuery` per allinearsi al pattern del codebase e ottenere caching/refetch automatico.

---

## FASE 3: Consistenza UX (P2)

### 8. date-fns direct imports
**File:** `src/hooks/usePaymentsInfinite.ts` (riga 3)
- Importa `format` da date-fns direttamente per formattare date nelle query. Questo e' un uso legittimo (non per display) e non richiede `formatDate` da utils.
- **Nessun intervento** — gli usi diretti di date-fns nelle query/filtri sono corretti. Solo gli usi per display dovrebbero usare `formatDate`, e questi sono gia' stati corretti.

---

## Riepilogo Interventi

| # | Tipo | File | Intervento |
|---|------|------|-----------|
| 1 | Bug | Layout.tsx | Rimuovere link `/audit` morto |
| 2 | Bug | Layout.tsx | Nascondere RLS Test in produzione |
| 3 | Bug | NewCommercialeDialog.tsx | Rimuovere campo password, mostrare password generata |
| 4 | Doc | useRLSTests.ts | Documentare bug session restore (dev-only) |
| 5 | Cleanup | Layout.tsx | Rimuovere Bell placeholder |
| 6 | Cleanup | useOrdersInfinite.ts | Rimuovere console.log debug |
| 7 | Refactor | useScheduledRLSTests.ts | Convertire a useQuery |

**Impatto:** Nessuna modifica funzionale. Zero rischio regressione. UX piu' pulita, console piu' pulita, sidebar corretta.

