

## Piano Enterprise Production Readiness

### Report AS-IS: Audit Tecnico Completo

---

### A) MAPPA ARCHITETTURA ATTUALE

**Frontend**: React 18 + TypeScript + TailwindCSS + shadcn/ui + React Query + React Router v6
**Backend**: Supabase (PostgreSQL + Auth + Edge Functions + Storage + Realtime)
**Ruoli RBAC**: super_admin, commerciale, rivenditore (tabella `user_roles` con `has_role()` security definer)

**Moduli principali:**
- Dashboard (Smart routing per ruolo)
- Ordini / Preventivi (CRUD con infinite scroll)
- Rivenditori / Commerciali (CRUD con infinite scroll)
- Pagamenti (CRUD con timeline)
- Provvigioni (auto-calcolate su consegna)
- KPI / Analytics (grafici recharts)
- Impostazioni (6 tab: utenti, commissioni, numerazione, PDF, integrazioni, audit)
- Sito pubblico (Home, Chi Siamo, Prodotti, Contatti, ecc.)

**Edge Functions**: create-user, reset-user-password, update-commerciale, delete-commerciale, notify-dealer-reassignment, seed-test-data, run-rls-tests

**Database**: 15 tabelle + 3 views + 12 funzioni RPC + trigger per audit log, commissioni, pagamenti

---

### B) VULNERABILITA E INTERVENTI PER PRIORITA

#### P0 - CRITICI (Sicurezza)

| # | Problema | Dettaglio | Intervento |
|---|----------|-----------|------------|
| 1 | **Views senza RLS** | `commerciali_with_stats`, `orders_with_payment_stats`, `dealers_with_stats` non hanno policy RLS e sono SECURITY DEFINER. Bypassano completamente il controllo accessi. | Ricreare le views come SECURITY INVOKER (non DEFINER) oppure aggiungere policy RLS a ogni view coerenti con le tabelle base |
| 2 | **Leaked Password Protection disabilitata** | Le password compromesse in data breach noti non vengono bloccate | Abilitare tramite configurazione auth |
| 3 | **RLS "always true" su test tables** | `rls_test_runs` ha policy ALL con `USING (true)`, permette a chiunque (anche anonimo) di gestire test runs | Restringere a `auth.role() = 'authenticated'` o meglio a super_admin |
| 4 | **Profiles non visibili a super_admin** | Il super_admin puo vedere solo il proprio profilo. La gestione utenti in Impostazioni non puo funzionare correttamente perche non c'e una SELECT policy per super_admin su profiles | Aggiungere policy: `has_role(auth.uid(), 'super_admin')` su profiles SELECT |
| 5 | **audit_log non inseribile da client** | `useCreateAuditLog` tenta INSERT da client ma la tabella `audit_log` non ha policy INSERT per utenti autenticati. L'audit dall'AssignDealersDialog fallisce silenziosamente | Aggiungere policy INSERT su audit_log per utenti autenticati (con user_id = auth.uid()) |
| 6 | **Edge Functions verify_jwt** | Tutte le funzioni in `config.toml` hanno `verify_jwt = true` ma con il sistema signing-keys attuale questo puo causare problemi. La best practice e `verify_jwt = false` con validazione in codice (gia presente tramite `getAuthenticatedUser`) | Cambiare a `verify_jwt = false` in config.toml |

#### P1 - IMPORTANTI (Performance + Codice morto + Duplicazioni)

| # | Problema | Dettaglio | Intervento |
|---|----------|-----------|------------|
| 7 | **Dead code: `src/types/index.ts`** | Enums e interfacce (UserRole, OrderStatus, ecc.) mai importate da nessun file. Duplicano le tipizzazioni gia gestite via Supabase types | Eliminare il file |
| 8 | **Dead code: `src/lib/errorHandler.ts`** | Funzioni `handleMutationError`, `handleQueryError`, `showSuccessToast`, `showWarningToast` mai importate da nessun file | Eliminare il file |
| 9 | **`formatCurrency` duplicata** | `Commerciali.tsx` definisce una propria `formatCurrency` locale invece di importarla da `@/lib/utils` | Rimuovere la funzione locale e importare da utils |
| 10 | **console.log in produzione** | `useRealtimeSync.ts` contiene 3 console.log che stampano payload di ordini/pagamenti/dealer a ogni modifica realtime | Rimuovere i console.log o sostituire con condizionale `if (import.meta.env.DEV)` |
| 11 | **`confirm()` nativo** | `Pagamenti.tsx` e `AttachmentsSection.tsx` usano `window.confirm()` nativo anziche un dialog modale coerente con il design system | Sostituire con AlertDialog di shadcn/ui |
| 12 | **Doppia importazione toast** | `Commerciali.tsx` importa da `sonner` mentre il resto del progetto usa `@/hooks/use-toast`. Incoerenza | Standardizzare su `@/hooks/use-toast` |

#### P2 - MIGLIORAMENTI (Qualita + UX)

| # | Problema | Dettaglio | Intervento |
|---|----------|-----------|------------|
| 13 | **Errore gestione Commerciali** | Il blocco errore nella pagina Commerciali mostra solo testo senza Card/pulsante Riprova, diversamente dagli altri moduli (Ordini, Pagamenti, Dealers) | Uniformare con pattern Card + AlertCircle + Button "Riprova" |
| 14 | **Stale React Router warnings** | Console mostra warning su `v7_startTransition` e `v7_relativeSplatPath` | Aggiungere future flags al BrowserRouter |
| 15 | **fetchPriority warning** | React non riconosce `fetchPriority` come attributo DOM standard, genera warning | Usare lo spelling lowercase `fetchpriority` |

---

### C) PIANO DI IMPLEMENTAZIONE DETTAGLIATO

#### Fase 1: Sicurezza Database (P0)

**Migrazione SQL:**

```text
-- 1. Ricreare views come SECURITY INVOKER (non DEFINER)
DROP VIEW IF EXISTS commerciali_with_stats;
DROP VIEW IF EXISTS orders_with_payment_stats;
DROP VIEW IF EXISTS dealers_with_stats;

-- Ricreare con SECURITY INVOKER
CREATE VIEW commerciali_with_stats WITH (security_invoker = true) AS ...;
CREATE VIEW orders_with_payment_stats WITH (security_invoker = true) AS ...;
CREATE VIEW dealers_with_stats WITH (security_invoker = true) AS ...;

-- 2. Super admin puo vedere tutti i profili
CREATE POLICY "Super admins can view all profiles"
  ON profiles FOR SELECT
  USING (has_role(auth.uid(), 'super_admin'));

-- 3. Utenti autenticati possono inserire audit log
CREATE POLICY "Authenticated users can insert audit logs"
  ON audit_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4. Restringere rls_test_runs
DROP POLICY "System can manage test runs" ON rls_test_runs;
CREATE POLICY "Super admins can manage test runs"
  ON rls_test_runs FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- 5. Restringere rls_test_results INSERT
DROP POLICY "System can insert test results" ON rls_test_results;
CREATE POLICY "Super admins can insert test results"
  ON rls_test_results FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'super_admin'));
```

#### Fase 2: Edge Functions Security

Aggiornare `supabase/config.toml` impostando `verify_jwt = false` per tutte le funzioni (la validazione JWT avviene gia nel codice tramite `getAuthenticatedUser`/`verifySuperAdmin`).

#### Fase 3: Cleanup Codice

**File da eliminare:**
- `src/types/index.ts` (dead code - 0 importazioni)
- `src/lib/errorHandler.ts` (dead code - 0 importazioni)

**File da modificare:**

1. `src/pages/Commerciali.tsx`:
   - Rimuovere `formatCurrency` locale (righe 19-24)
   - Importare da `@/lib/utils`
   - Sostituire `import { toast } from "sonner"` con `import { toast } from "@/hooks/use-toast"`
   - Uniformare error state con pattern Card + AlertCircle + Button Riprova

2. `src/hooks/useRealtimeSync.ts`:
   - Rimuovere i 3 `console.log` (righe 28, 49, 72)

3. `src/pages/Pagamenti.tsx`:
   - Sostituire `confirm()` nativo (riga 119) con AlertDialog

4. `src/components/orders/AttachmentsSection.tsx`:
   - Sostituire `confirm()` nativo (riga 109) con AlertDialog

5. `src/components/Layout.tsx`:
   - Cambiare `fetchPriority="high"` in `fetchpriority="high"` (riga 70)

6. `src/App.tsx`:
   - Aggiungere future flags a BrowserRouter per eliminare warning React Router v7

#### Fase 4: Verifica e Hardening

- Verificare che tutte le views ricreate funzionino correttamente con i componenti frontend che le usano (`useOrdersInfinite`, `useDealersInfinite`, `useCommercialiInfinite`)
- Verificare che l'audit log funzioni dopo l'aggiunta della policy INSERT
- Smoke test di tutti i flussi CRUD per ogni ruolo

---

### D) BACKUP E RECOVERY

Lovable Cloud (Supabase) fornisce automaticamente:
- **Backup automatici giornalieri** del database con retention di 7 giorni (piano gratuito) o 30 giorni (piano Pro)
- **Point-in-Time Recovery (PITR)** disponibile su piani superiori
- **Versionamento codice** tramite Git integrato in Lovable
- L'`audit_log` table registra tutte le modifiche CRUD via trigger

Non sono necessari interventi aggiuntivi per il backup. La procedura di restore e gestita dalla piattaforma.

---

### E) MONITORING E OBSERVABILITA

Attualmente presenti:
- **Error Boundary** globale (`ErrorBoundary.tsx`) che cattura crash React e mostra UI di fallback
- **Audit log** per tracciare modifiche dati (trigger su orders)
- **Console logging** per errori di query/mutation (da pulire per produzione)

Raccomandazioni future (non bloccanti per il go-live):
- Integrare un servizio di error tracking (es. Sentry) per catturare errori client-side in produzione
- Dashboard metriche API (latenza, error rate) -- gestito nativamente da Lovable Cloud

---

### F) RIEPILOGO INTERVENTI

| Categoria | Interventi | File toccati |
|-----------|-----------|--------------|
| Sicurezza DB | 5 policy + 3 views ricreate | Migrazione SQL |
| Edge Functions | Config verify_jwt | `supabase/config.toml` |
| Dead code rimosso | 2 file eliminati | `src/types/index.ts`, `src/lib/errorHandler.ts` |
| Duplicazioni risolte | formatCurrency, toast import | `src/pages/Commerciali.tsx` |
| Console cleanup | 3 console.log rimossi | `src/hooks/useRealtimeSync.ts` |
| UX coerenza | 2 confirm() + 1 error state | `Pagamenti.tsx`, `AttachmentsSection.tsx`, `Commerciali.tsx` |
| Warning risolti | fetchPriority + React Router flags | `Layout.tsx`, `App.tsx` |

**Nessuna funzionalita esistente viene modificata. Tutti gli interventi sono behavior-preserving.**

