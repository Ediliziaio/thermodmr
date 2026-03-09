

# Analisi Sezione per Sezione — Area Super Admin

Ho esaminato ogni file, hook, query e componente. Ecco lo stato attuale sezione per sezione.

---

## 1. DASHBOARD (`Dashboard.tsx` + `useDashboard.ts`)

**Stato: BUONO** -- Ben strutturato, con KPI cards, delta indicators, filtri temporali, grafici.

**Problema trovato:**
- `useRevenueData` usa `get_revenue_by_month(p_months)` che ritorna mesi con label italiane (es. "Gen 2026"). Il filtro client-side (riga 129-132) fa `new Date(item.month)` su queste stringhe italiane, che **non viene parsato correttamente** in tutti i browser. Il risultato e' che il grafico ricavi potrebbe mostrare dati errati o vuoti con filtri personalizzati.

**Fix:** Il RPC dovrebbe ritornare date ISO (es. "2026-01") oppure il filtro deve usare un parser locale-aware.

---

## 2. ORDINI (`Orders.tsx` — 870 righe)

**Stato: FUNZIONALE ma troppo grande**

**Positivi:** Infinite scroll, filtri avanzati, pipeline DnD, quick payment, sort, bulk actions, mobile.

**Problemi:**
- **870 righe in un solo file** — Difficile da mantenere. La tabella desktop (righe 509-737), le stats header e i filtri temporali dovrebbero essere componenti separati.
- `useDealersInfinite()` carica **tutti i dealer con stats** solo per popolare un dropdown di selezione. Spreco di banda.

**Fix suggerito:** Estrarre `OrdersTable`, `OrdersStatsRow`, `OrdersTimeFilters` come componenti. Creare `useDealersDropdown()` leggero (solo id + nome).

---

## 3. DETTAGLIO ORDINE (`OrderDetail.tsx` — 927 righe)

**Stato: BUONO** -- Unified save, unsaved changes guard, browser close guard, convert preventivo.

**Problemi:**
- **927 righe** — Ancora piu' grande di Orders.tsx. Le sezioni (header, note, date, linee, pagamenti, allegati, ticket) sono gia' componenti separati, ma il layout wrapper e' troppo denso.
- I bottoni "Esporta PDF" e "Invia Email" sono placeholder (non fanno nulla).

---

## 4. PREVENTIVI (`DealerPreventivi.tsx` — 961 righe)

**Stato: FUNZIONALE ma senza paginazione**

**Problemi:**
- **Nessun infinite scroll/paginazione** — La query (riga 92-108) scarica TUTTI i preventivi. Con centinaia di preventivi, il caricamento diventa lento.
- **961 righe** — File piu' grande del progetto.
- Le KPI, filtri, tabella e dialogs sono tutti nello stesso file.

**Fix:** Migrare a `useInfiniteQuery` o aggiungere `.limit(200)` come minimo.

---

## 5. RIVENDITORI (`Dealers.tsx` + `DealerDetail.tsx`)

**Stato: BUONO** -- Mini-dashboard, infinite scroll, vista lista/griglia, badge attivita'.

**Problemi:**
- `DealerDetail.tsx` calcola `avgTicket` dividendo `totalRevenue / dealerOrders.length`, ma `dealerOrders` e' limitato a 50. Se il dealer ha 100 ordini, il ticket medio e' sbagliato (calcolato su 50 ordini ma con il revenue totale dalla view).

**Fix:** Usare `orders_count` dalla view `dealers_with_stats` invece di `dealerOrders.length`.

---

## 6. PAGAMENTI (`Pagamenti.tsx`)

**Stato: BUONO** -- Sorting implementato, infinite scroll, timeline view, export, bulk delete.

**Nessun problema critico trovato.** Sezione ben allineata con le altre.

---

## 7. ASSISTENZA (`Assistenza.tsx`)

**Stato: BUONO** -- Mini-dashboard KPI, ricerca, sort, mobile cards.

**Problema:**
- Nessuna paginazione — Carica tutti i ticket (con `.limit(100)` nel hook). Con piu' di 100 ticket, i dati vengono troncati silenziosamente senza indicazione all'utente.

**Fix:** Aggiungere un indicatore "100+ ticket — mostra tutti" o infinite scroll.

---

## 8. KPI / ANALYTICS (`Analytics.tsx` + `useUnifiedAnalytics.ts`)

**Stato: BUONO** -- Error state standard, filtri, export CSV, dealer filter.

**Problema:**
- La query scarica TUTTI gli ordini e pagamenti del periodo selezionato senza limite. Con 12 mesi e centinaia di ordini, il payload puo' superare i 500KB. Per un'analisi aggregata, questo lavoro dovrebbe essere fatto server-side con un RPC.

---

## 9. IMPOSTAZIONI (`Impostazioni.tsx`)

**Stato: BUONO** -- Tabs organizzate (Utenti, Numerazione, PDF, Integrazioni, Audit).

**Problema:**
- `UserManagementSection`: il dropdown ruoli mostra solo "super_admin" e "rivenditore" — manca "commerciale". Un commerciale verrebbe visualizzato con ruolo vuoto.
- `AuditLogSection`: la query usa un foreign key join `profiles!audit_log_user_id_fkey` che potrebbe fallire se il FK non esiste esplicitamente nel DB (i profiles sono collegati ad auth.users, non direttamente all'audit_log).

---

## 10. REALTIME SYNC (`useRealtimeSync.ts`)

**Stato: BUONO** -- Debounce implementato (300ms orders/payments, 500ms dealers).

**Nessun problema critico.** Il refactoring precedente ha risolto l'invalidazione aggressiva.

---

## 11. AUTH (`AuthContext.tsx`)

**Stato: BUONO** -- Race condition risolta con `roleFetchedForUserId` ref.

**Nessun problema critico.**

---

## RIEPILOGO PRIORITA'

| # | Sezione | Problema | Gravita' |
|---|---------|----------|----------|
| 1 | DealerDetail | `avgTicket` calcolato su dati troncati (limit 50) | Media |
| 2 | DealerPreventivi | Nessuna paginazione — carica tutto | Media |
| 3 | Dashboard | Revenue chart: parsing data italiane non affidabile | Media |
| 4 | Orders.tsx | 870 righe — refactoring necessario | Bassa |
| 5 | UserManagement | Manca ruolo "commerciale" nel dropdown | Bassa |
| 6 | Analytics | Query senza limite per aggregazione client-side | Bassa |
| 7 | Assistenza | Limit 100 senza indicazione di troncamento | Bassa |

---

## PIANO DI INTERVENTO CONSIGLIATO

### Fase 1 — Fix dati (rapido, alto impatto)
1. **DealerDetail avgTicket**: usare `orders_count` dalla view invece di `dealerOrders.length`
2. **UserManagement**: aggiungere "commerciale" al dropdown ruoli
3. **Assistenza**: mostrare avviso quando ci sono piu' di 100 ticket

### Fase 2 — Paginazione
4. **DealerPreventivi**: migrare a `useInfiniteQuery` o aggiungere limit + paginazione offset

### Fase 3 — Refactoring codice
5. **Orders.tsx**: estrarre tabella, stats e filtri temporali in sotto-componenti
6. **useDealersInfinite per dropdown**: creare hook leggero che scarica solo id + nome

### Fase 4 — Ottimizzazione avanzata
7. **Revenue chart**: fix parsing date o migrare a RPC con formato ISO
8. **Analytics**: valutare RPC server-side per aggregazione

