

# AUDIT TECNICO ENTERPRISE — REPORT AS-IS + PIANO INTERVENTI

---

## A) MAPPA ARCHITETTURALE AS-IS

### Moduli Principali

```text
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (React/Vite)                │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│  Public  │  Auth    │  Admin   │ Commerc. │ Rivenditore │
│  Pages   │  (login) │  Panel   │  Panel   │  Panel      │
│  (13pg)  │          │ (8 sect) │ (dashb)  │ (orders)    │
├──────────┴──────────┴──────────┴──────────┴─────────────┤
│  Shared: Layout, Navbar, Footer, GlobalSearch,          │
│          ErrorBoundary, ProtectedRoute                  │
├─────────────────────────────────────────────────────────┤
│  Hooks: 21 files — data fetching, realtime, analytics   │
│  Lib: utils, animations, constants (4 domain files)     │
├─────────────────────────────────────────────────────────┤
│                 BACKEND (Lovable Cloud)                  │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│ 7 Edge   │ _shared/ │ 12 DB    │ 16 DB    │ RLS + has_  │
│ Functions│ (auth,   │ Tables   │ Functions│ role()      │
│          │ cors,..) │ + Views  │          │             │
└──────────┴──────────┴──────────┴──────────┴─────────────┘
```

### Flussi Utente
- **Super Admin**: Dashboard KPIs → Ordini CRUD → Pagamenti → Rivenditori → Commerciali → Provvigioni → Analytics → Impostazioni
- **Commerciale**: Dashboard personale → Ordini propri → Rivenditori assegnati → Provvigioni proprie
- **Rivenditore**: Redirect a Ordini → Visualizzazione ordini propri → Preventivi
- **Pubblico**: Home → Chi Siamo → Prodotti (7 dettagli) → Vantaggi → Garanzie → Contatti → Diventa Rivenditore

### Entità DB e Relazioni
- `profiles` ← `user_roles` (via user_id)
- `dealers` → `orders` → `order_lines`, `payments`, `attachments`, `commissions`
- `clients` → `orders`
- Views: `orders_with_payment_stats`, `dealers_with_stats`, `commerciali_with_stats`
- Supporto: `settings`, `audit_log`, `kpi_snapshots`, `rls_test_runs/results`, `contact_requests`

### Permessi/Ruoli — RLS
- 3 ruoli: `super_admin`, `commerciale`, `rivenditore`
- `has_role()` security definer per evitare ricorsione
- RLS attivo su tutte le tabelle principali con policy RESTRICTIVE

---

## B) PROBLEMI IDENTIFICATI — LISTA INTERVENTI

### P0 — CRITICI (bloccano produzione)

| # | Area | Problema | Impatto |
|---|------|----------|---------|
| 1 | **Edge Function mancante** | `useCommerciali.ts` chiama `create-commerciale` (riga 131) ma la funzione NON ESISTE. Esiste solo `create-user`. | **Creazione commerciali da sezione Commerciali è rotta**. InviteUserDialog usa correttamente `create-user`. |
| 2 | **Sonner duplicato** | `App.tsx` monta sia `<Toaster />` (shadcn) sia `<Sonner />`. Nessun componente importa direttamente sonner. | Doppio provider toast, potenziali toast invisibili. |
| 3 | **Sicurezza: RLS "USING (true)"** | Linter segnala una policy INSERT con `WITH CHECK (true)` su `contact_requests`. | Accettabile per form contatto pubblico — da documentare come eccezione intenzionale. |
| 4 | **Sicurezza: Leaked password protection disabilitata** | Auth config non ha protezione password compromesse. | Rischio utenti con password note in data breach. |
| 5 | **`useRLSTests.ts` chiama `create-commerciale`** | Riga 50: invoca funzione inesistente, test RLS non funzionano. | Test suite RLS completamente rotta. |

### P1 — IMPORTANTI (qualità + stabilità)

| # | Area | Problema |
|---|------|----------|
| 6 | **Placeholder.tsx** | Route `/audit` usa `Placeholder` — pagina vuota "in sviluppo" esposta a utenti. |
| 7 | **TestDataSeeder + RLSTest** | Pagine di sviluppo/debug accessibili in produzione (anche se protette da `super_admin`). |
| 8 | **`useRLSTests.ts` sign-in flow** | Il test hook fa sign-in come test users, il che distrugge la sessione admin corrente. Dopo i test, tenta di ri-autenticarsi con la password del test user, non dell'admin originale (riga 367). |
| 9 | **`useScheduledRLSTests.ts`** | Usa `useState/useEffect` + fetch manuale invece di `useQuery`. Pattern inconsistente con il resto della codebase. |
| 10 | **`next-themes` dependency** | Usato solo da `sonner.tsx`. Se Sonner viene rimosso, `next-themes` diventa dependency morta. |
| 11 | **`useUpdateUserRole` non-atomico** | `useSettings.ts` riga 96-103: DELETE + INSERT separati senza transazione. Se l'INSERT fallisce, l'utente resta senza ruolo. |
| 12 | **`generateSecurePassword` duplicata** | Presente sia in `InviteUserDialog.tsx` (client, Math.random — insicura) sia in `reset-user-password/index.ts` (server, crypto.getRandomValues — sicura). Il client genera la password e la passa al server. |

### P2 — MIGLIORAMENTI (pulizia + performance)

| # | Area | Problema |
|---|------|----------|
| 13 | **`console.error` proliferazione** | 162 occorrenze in 17 file. Pattern corretto (log + toast), ma potrebbe beneficiare di un logger centralizzato. |
| 14 | **`date-fns` + `format` locale import** | `GlobalSearch.tsx` importa `format` + `it` da date-fns direttamente invece di usare `formatDate` da utils. |
| 15 | **`DashboardRouter.tsx`** | Wrapper lazy di una riga, ridondante — `SmartDashboard` è già lazy-loaded in `HomeRouter`. |
| 16 | **`src/types/orders.ts`** | `OrderForSelection` type non sembra usato da nessun componente (da verificare). |
| 17 | **Realtime: invalidation aggressiva** | `useRealtimeSync` invalida ~12 query keys per ogni singola modifica. Con traffico alto, causa cascade di refetch. |

---

## C) PIANO INTERVENTI DETTAGLIATO

### FASE 1: Fix Critici (P0)

1. **Fix `useCommerciali.ts`**: Sostituire `create-commerciale` con `create-user` passando `role: "commerciale"`. Allineare lo schema body a quello atteso da `create-user/index.ts`.

2. **Fix `useRLSTests.ts`**: Stesso fix — usare `create-user` con ruolo appropriato.

3. **Rimuovere `<Sonner />`** da `App.tsx`: L'intero codebase usa `use-toast` (shadcn). Sonner è ridondante. Opzionalmente rimuovere `src/components/ui/sonner.tsx` e la dependency `sonner` + `next-themes`.

4. **Abilitare leaked password protection**: Raccomandazione documentata (richiede configurazione backend).

### FASE 2: Stabilità (P1)

5. **Route `/audit`**: Rimuovere la route Placeholder o reindirizzare alla sezione Audit Log già funzionante in Impostazioni.

6. **`useUpdateUserRole` atomico**: Usare un'edge function o una RPC per DELETE+INSERT in una transazione.

7. **Password generation**: Rimuovere `generateSecurePassword` dal client (`InviteUserDialog`). Fare generare la password server-side dalla funzione `create-user` come già fa `reset-user-password`.

8. **Proteggere/nascondere route dev**: Aggiungere flag `import.meta.env.DEV` alle route `rls-test` e `seed-test-data` per escluderle dalla produzione.

### FASE 3: Pulizia (P2)

9. **`GlobalSearch.tsx`**: Sostituire `format` + `it` con `formatDate` da `@/lib/utils`.

10. **Rimuovere `DashboardRouter.tsx`** se confermato ridondante, aggiornare import in `HomeRouter`.

11. **Verificare e rimuovere `OrderForSelection`** se non utilizzato.

12. **Ottimizzare realtime invalidation**: Raggruppare invalidazioni con `queryClient.invalidateQueries` usando prefissi più ampi o debouncing.

---

## D) SICUREZZA — STATO ATTUALE

| Check | Stato |
|-------|-------|
| RLS su tutte le tabelle | ✅ Attivo, policy RESTRICTIVE |
| `has_role()` security definer | ✅ Implementato |
| Input validation server-side (Zod) | ✅ Edge functions con `validateBody` |
| Auth token verification | ✅ `verifySuperAdmin`/`verifyRole` in ogni EF |
| Segreti nel client | ✅ Solo anon key (corretto) |
| `dangerouslySetInnerHTML` | ✅ Solo in `chart.tsx` (shadcn UI, no user input) |
| `window.confirm` | ✅ Zero occorrenze (usa AlertDialog) |
| Password policy Zod | ✅ Min 8, uppercase, number, special char |
| Leaked password protection | ❌ Disabilitata (P0 #4) |
| `contact_requests` INSERT open | ⚠️ Intenzionale per form pubblico |
| `verify_jwt = false` su EF | ✅ Corretto — auth validata internamente |

---

## E) PERFORMANCE — STATO ATTUALE

| Area | Stato |
|------|-------|
| Lazy loading pagine | ✅ 30+ componenti lazy |
| TanStack Query con staleTime | ✅ 2-10 min per query |
| DB views pre-aggregate | ✅ 3 views (orders, dealers, commerciali) |
| RPC per KPI aggregate | ✅ 6 funzioni RPC |
| Promise.all per chiamate parallele | ✅ Dashboard, Commerciale dashboard |
| Infinite scroll (pagination) | ✅ Ordini, Pagamenti, Dealers, Commerciali |
| Realtime sync centralizzato | ✅ `useRealtimeSync` |
| `refetchOnWindowFocus: false` | ✅ Config globale QueryClient |

---

## F) MULTI-TENANCY / DATA ISOLATION

Il sistema è role-based (non multi-tenant), ma l'isolamento dati è corretto:
- **Super Admin**: vede tutto
- **Commerciale**: vede solo `commerciale_id = auth.uid()` per ordini, `commerciale_owner_id = auth.uid()` per dealers
- **Rivenditore**: vede solo `creato_da_user_id = auth.uid()` per ordini
- Views con `security_invoker = true`: RLS rispettato anche attraverso le viste

---

## G) BACKUP & RESTORE

- Backup automatici giornalieri via Lovable Cloud (infrastruttura gestita)
- PITR (Point-in-Time Recovery) disponibile
- Audit log con trigger `log_order_changes()` per tracciabilità
- Git versioning per codice

---

## H) OSSERVABILITÀ

| Componente | Stato |
|------------|-------|
| ErrorBoundary globale | ✅ Con UI di recovery |
| Console error logging | ✅ In tutti i mutation onError |
| Audit log DB | ✅ Trigger + hook manuale |
| Error tracking esterno (Sentry) | ❌ TODO nel codice, non implementato |
| Structured logging EF | ✅ console.log con contesto |
| Metriche latenza/uptime | ❌ Non implementato |

---

## OUTPUT: RIEPILOGO INTERVENTI PRIORITIZZATI

### Da implementare (14 interventi):

**P0 (5):** Fix `create-commerciale` → `create-user` (2 file), rimuovere Sonner duplicato, documentare eccezione RLS contact_requests, abilitare leaked password protection

**P1 (7):** Rimuovere route Placeholder audit, proteggere route dev, atomicizzare updateUserRole, spostare password generation server-side, fix useRLSTests session restore, convertire useScheduledRLSTests a useQuery, rimuovere next-themes

**P2 (4):** Standardizzare date formatting in GlobalSearch, rimuovere DashboardRouter ridondante, verificare OrderForSelection, ottimizzare realtime invalidation

### Dichiarazione

Il progetto è a un **buon livello di maturità enterprise** con architettura pulita, RLS robusto, validazione server-side e performance ottimizzate. I fix P0 (#1 e #2 in particolare) sono bloccanti per la produzione. Una volta risolti, il sistema può essere dichiarato **PRONTO PER PRODUZIONE** con le raccomandazioni P1 come follow-up immediato.

