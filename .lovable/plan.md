
## Audit Dashboard Section - Report AS-IS e Piano Interventi

---

### A) MAPPA ARCHITETTURA DASHBOARD

La sezione Dashboard e composta da 4 componenti-pagina e 3 hook dedicati:

```text
SmartDashboard (router per ruolo)
  |-- Dashboard.tsx (super_admin)
  |     |-- useDashboardKPIs + useRevenueData (hooks)
  |     |-- RevenueChart, OrderStatusPieChart, DeadlinesWidget (componenti)
  |
  |-- CommercialeDashboard.tsx (commerciale)
  |     |-- useCommercialeDashboard (hook con 4 query parallele)
  |     |-- recharts inline (LineChart, BarChart, PieChart)
  |     |-- DeadlinesWidget, EmptyState
  |
  |-- DealerDashboard.tsx (rivenditore, via DealerArea)
        |-- useDealerOrderStats, useRecentActivity, usePaymentReminders (3 hooks)
        |-- Progress bars, activity timeline, payment reminders
```

**Flussi utente:**
- super_admin -> Dashboard con KPI, grafici ricavi, pie chart stati, top dealers, scadenze
- commerciale -> CommercialeDashboard con KPI, grafici fatturato/provvigioni, pie chart, top dealers, ultimi ordini, scadenze
- rivenditore -> Redirect a /ordini (SmartDashboard) oppure DealerDashboard (via DealerArea)

**Database/RPC utilizzate:**
- `get_dashboard_kpis` (SECURITY DEFINER)
- `get_top_dealers` (SECURITY DEFINER)
- `get_revenue_by_month` (SECURITY DEFINER)
- `get_commerciale_stats` (SECURITY DEFINER)
- `get_upcoming_deadlines` (SECURITY DEFINER)
- Query dirette su `orders`, `commissions`, `payments`, `orders_with_payment_stats`

---

### B) PROBLEMI IDENTIFICATI E PRIORITA

#### P0 - CRITICI

| # | Problema | Dettaglio | Intervento |
|---|----------|-----------|------------|
| 1 | **CommercialeDashboard: 4 query sequenziali** | `useCommercialeDashboard` fa 4 chiamate sequenziali (stats, revenue, topDealers, latestOrders + commissions). Ogni fallimento blocca tutto. | Parallelizzare con `Promise.all` le 3 RPC indipendenti (stats, revenue, topDealers). Tenere orders e commissions sequenziali solo se necessario |
| 2 | **CommercialeDashboard: nessun error state** | Se `data` e null dopo il loading, ritorna `null` (riga 89). Nessun messaggio di errore, nessun pulsante Riprova | Aggiungere error state coerente con pattern Card + AlertCircle + Button "Riprova" |
| 3 | **DealerDashboard: 3 query separate non parallelizzate** | `useDealerOrderStats`, `useRecentActivity`, `usePaymentReminders` sono 3 hook separati che fanno query indipendenti. Non c'e parallelizzazione nativa (React Query le lancia in parallelo, ma non c'e gestione unificata errori) | Accettabile per React Query, ma aggiungere error state mancante |
| 4 | **DealerDashboard: error state debole** | Se stats e null, mostra solo `<p className="text-destructive">Errore</p>`. Nessun pulsante Riprova, nessuna Card | Uniformare con pattern standard |

#### P1 - IMPORTANTI (Performance + Duplicazioni)

| # | Problema | Dettaglio | Intervento |
|---|----------|-----------|------------|
| 5 | **`formatCurrency` duplicata in RevenueChart** | `RevenueChart.tsx` definisce la propria `formatCurrency` locale (righe 18-25) con `Intl.NumberFormat` notation compact, invece di importare da `@/lib/utils` | Importare `formatCurrency` da `@/lib/utils` oppure creare una variante `formatCurrencyCompact` in utils |
| 6 | **`getStatusLabel` duplicata in CommercialeDashboard** | `CommercialeDashboard.tsx` definisce un proprio `STATUS_LABELS` (righe 60-68) invece di usare `getStatusLabel` da `@/lib/utils` | Sostituire con import da `@/lib/utils` |
| 7 | **CommercialeDashboard: valuta formattata inline** | Usa `€{value.toLocaleString("it-IT")}` ripetuto 6+ volte invece di `formatCurrency` centralizzato | Sostituire con `formatCurrency` da utils |
| 8 | **`useCommercialeDashboard`: fetcha TUTTE le commissions** | Riga 103-106: `supabase.from("commissions").select("*")` senza `.limit()`. Se un commerciale ha migliaia di commissioni, scarica tutto | Aggiungere `.limit(100)` o creare RPC server-side per aggregazione mensile |
| 9 | **`useDealerDashboard`: `getStatusLabel` duplicata** | Il hook definisce una propria funzione `getStatusLabel` (righe 200-209) identica a quella in utils | Rimuovere e importare da `@/lib/utils` |
| 10 | **`useDealerDashboard`: fetch tutti ordini in memoria** | `useDealerOrderStats` scarica TUTTI gli ordini dalla view `orders_with_payment_stats` e calcola statistiche client-side (righe 51-74). Dovrebbe usare un RPC server-side | Creare RPC `get_dealer_order_stats` oppure usare `get_dashboard_kpis` con filtro dealer |
| 11 | **Realtime non invalida tutte le query dashboard** | `useRealtimeSync` invalida `dashboard-kpis` e `revenue-data` ma non `commerciale-dashboard`, `dealer-order-stats`, `upcoming-deadlines`, `dealer-recent-activity`, `dealer-payment-reminders` | Aggiungere invalidazione per tutte le query dashboard |

#### P2 - MIGLIORAMENTI (UX + Coerenza)

| # | Problema | Dettaglio | Intervento |
|---|----------|-----------|------------|
| 12 | **CommercialeDashboard: grafici recharts inline** | A differenza della Dashboard super_admin che usa componenti dedicati (RevenueChart, OrderStatusPieChart), la CommercialeDashboard ha 3 grafici recharts inline (~120 righe di JSX) | Estrarre in componenti riusabili o riusare quelli esistenti |
| 13 | **SmartDashboard: error state non standard** | Il fallback "Accesso Negato" (righe 34-43) non usa Card/AlertCircle pattern | Uniformare con pattern standard |
| 14 | **DealerDashboard: import duplicato ArrowLeft** | Importa `ArrowLeft` (riga 24) che non viene mai usato nel componente | Rimuovere import inutile |
| 15 | **Dashboard: quick filters duplicati** | I filtri rapidi sono definiti due volte: nella barra superiore (righe 158-170) e dentro il Popover del calendario (righe 201-213) con label diverse | Estrarre array costante condiviso |

---

### C) PIANO DI IMPLEMENTAZIONE

#### Fase 1: Performance Backend

1. **Parallelizzare `useCommercialeDashboard`**: wrappare `stats`, `revenue`, `topDealers` in `Promise.all` (come gia fatto in `useDashboardKPIs`)
2. **Limitare fetch commissions**: aggiungere `.limit(100)` e filtrare per data (ultimi 6 mesi) nella query commissions
3. **Ottimizzare `useDealerOrderStats`**: valutare l'uso di `get_dashboard_kpis` con parametro dealer o creare aggregazione server-side per evitare di scaricare tutti gli ordini

#### Fase 2: Cleanup Duplicazioni

1. **RevenueChart.tsx**: rimuovere `formatCurrency` locale, creare `formatCurrencyCompact` in `@/lib/utils` (perche serve la notazione compatta per gli assi Y dei grafici)
2. **CommercialeDashboard.tsx**: sostituire `STATUS_LABELS` con `getStatusLabel` da utils, sostituire formattazione valuta inline con `formatCurrency`
3. **useDealerDashboard.ts**: rimuovere `getStatusLabel` locale, importare da utils
4. **DealerDashboard.tsx**: rimuovere import `ArrowLeft` inutilizzato

#### Fase 3: Error State Coerenti

1. **CommercialeDashboard**: sostituire `if (!data) return null` con Card + AlertCircle + Button "Riprova" (come Dashboard.tsx)
2. **DealerDashboard**: sostituire il semplice `<p>Errore</p>` con pattern standard
3. **SmartDashboard**: uniformare il fallback "Accesso Negato" con Card standard

#### Fase 4: Realtime Sync Completo

Aggiungere in `useRealtimeSync` l'invalidazione delle query:
- `commerciale-dashboard`
- `dealer-order-stats`
- `dealer-recent-activity`
- `dealer-payment-reminders`
- `upcoming-deadlines`

#### Fase 5: Refactor Componenti (P2)

1. Estrarre i filtri rapidi di Dashboard in una costante condivisa
2. Valutare l'estrazione dei grafici inline di CommercialeDashboard in componenti dedicati (opzionale, migliora leggibilita ma non cambia comportamento)

---

### D) RIEPILOGO INTERVENTI

| Categoria | Interventi | File toccati |
|-----------|-----------|--------------|
| Performance | Parallelizzazione RPC, limit commissions, ottimizzazione dealer stats | `useCommercialeDashboard.ts`, `useDealerDashboard.ts` |
| Duplicazioni | 3 formatCurrency/getStatusLabel locali rimosse | `RevenueChart.tsx`, `CommercialeDashboard.tsx`, `useDealerDashboard.ts` |
| Dead code | 1 import inutilizzato rimosso | `DealerDashboard.tsx` |
| Error handling | 3 error state uniformati | `CommercialeDashboard.tsx`, `DealerDashboard.tsx`, `SmartDashboard.tsx` |
| Realtime | 5 query key aggiunte a invalidazione | `useRealtimeSync.ts` |
| UX | Filtri rapidi consolidati | `Dashboard.tsx` |

**Stima miglioramento performance:**
- CommercialeDashboard: ~30-40% riduzione tempo caricamento iniziale (parallelizzazione 3 RPC)
- DealerDashboard: riduzione payload (limit su query commissions)
- Realtime: aggiornamento immediato di tutte le dashboard su modifica dati

**Nessuna funzionalita esistente viene modificata. Tutti gli interventi sono behavior-preserving.**
