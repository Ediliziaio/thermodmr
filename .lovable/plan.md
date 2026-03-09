

# Analisi Completa Area Super Admin — Criticità, Miglioramenti e Performance

## Riepilogo Generale

Ho analizzato tutte le sezioni: Dashboard, Ordini, Preventivi, Rivenditori, Pagamenti, Assistenza, KPI/Analytics, Impostazioni, e le pagine di dettaglio (Ordine, Rivenditore, Pagamento). Riporto criticità, miglioramenti e ottimizzazioni raggruppate per priorità.

---

## CRITICITÀ (da risolvere)

### 1. AuthContext: race condition su doppio fetch ruolo
In `AuthContext.tsx`, sia `onAuthStateChange` che `getSession` chiamano `fetchUserRole`, causando **2 query identiche** a `user_roles` ad ogni caricamento pagina (visibile nei network requests: 3 richieste identiche). Inoltre `fetchUserRole` usa `maybeSingle()` che non genera errore se non trova il ruolo — un utente senza ruolo vedrà `userRole = null` senza feedback.

**Fix:** Aggiungere un flag `roleLoaded` per evitare fetch duplicati, e usare `.single()` con gestione errore esplicita.

### 2. Analytics (KPI): errore senza retry
`Analytics.tsx` ha un error state minimale (`<p className="text-destructive">Errore</p>`) senza pulsante "Riprova" né Card strutturata. Tutte le altre pagine hanno il pattern standard con `AlertCircle` + `Button Riprova`. Incoerenza UX.

**Fix:** Allineare al pattern standard con Card + RefreshCw + refetch().

### 3. useUnifiedAnalytics: nessun limite query
La query in `useUnifiedAnalytics.ts` scarica **tutti gli ordini e pagamenti** del periodo senza `.limit()` né paginazione. Con centinaia di ordini/mese, la risposta diventa pesante. Inoltre fa 2 query separate (orders + payments) senza parallelizzazione esplicita.

**Fix:** Usare `Promise.all()` per le 2 query e valutare un RPC server-side dedicato per aggregare i dati.

### 4. Assistenza: nessuna paginazione
`Assistenza.tsx` carica tutti i ticket in un'unica query senza infinite scroll né limite. Con centinaia di ticket, la tabella diventa lenta.

**Fix:** Aggiungere paginazione o infinite scroll come nelle altre sezioni.

### 5. Preventivi: query senza paginazione
`DealerPreventivi.tsx` usa `useQuery` diretto senza paginazione — scarica tutti i preventivi. A differenza di Ordini e Pagamenti che usano `useInfiniteQuery`.

**Fix:** Migrare a `useInfiniteQuery` o aggiungere un limite con offset.

### 6. useRealtimeSync: invalidazione troppo aggressiva
Ogni modifica a `orders` invalida 7 query key, e ogni modifica a `payments` invalida 8 query key. Questo causa refresh massivi di tutta l'app ad ogni singola modifica.

**Fix:** Usare `predicate` per invalidare selettivamente, o debounce le invalidazioni.

---

## MIGLIORAMENTI UX

### 7. Pagamenti: mancano frecce di ordinamento colonne
Le tabelle Ordini e Preventivi hanno l'ordinamento con frecce implementato, ma **Pagamenti** no — le colonne della tabella sono statiche. Incoerenza UX.

**Fix:** Aggiungere `sortConfig` + `handleSort` + `SortIcon` nella tabella Pagamenti, stesso pattern di Orders.tsx.

### 8. Assistenza: mancano KPI, ricerca e ordinamento
La sezione Assistenza è minimale rispetto alle altre: nessuna mini-dashboard con conteggi, nessuna barra di ricerca, nessun ordinamento colonne, nessun supporto mobile dedicato.

**Fix:** Aggiungere mini-dashboard (ticket aperti, in gestione, chiusi, urgenti), ricerca per oggetto/ordine, e layout mobile con card.

### 9. Dashboard: `useRevenueData` non rispetta il filtro date
In `useDashboard.ts` riga 112-113, `get_revenue_by_month` accetta solo `p_months` (intero), non date precise. Il filtraggio client-side successivo (righe 126-132) è approssimativo perché `new Date(item.month)` parsa "Gen 2026" in modo non affidabile con locale italiano.

**Fix:** Creare un RPC `get_revenue_by_date_range` che accetti date esatte, oppure usare il formato ISO nella query.

### 10. Ordini: 870 righe di codice in un singolo file
`Orders.tsx` è il file più grande (870 righe). Contiene filtri, tabella, pipeline, mobile, selezione bulk, export — tutto nello stesso componente.

**Fix:** Estrarre la tabella desktop, i filtri temporali e le statistiche header in sotto-componenti dedicati.

---

## OTTIMIZZAZIONI PERFORMANCE

### 11. Dealers: `useDealersInfinite` chiamato in più pagine
`useDealersInfinite()` è chiamato sia in `Orders.tsx` (per il dropdown dealer) che in `Analytics.tsx` e `Dealers.tsx`. Ogni pagina che lo usa scarica l'intera lista dealer. Con la stessa `queryKey`, React Query li deduplica, ma il primo caricamento è comunque pesante.

**Fix:** Per i dropdown, usare una query leggera che scarica solo `id, ragione_sociale` senza stats.

### 12. DealerDetail: orders query senza limite
`DealerDetail.tsx` riga 36-46 scarica **tutti** gli ordini del dealer senza limite. Un dealer con centinaia di ordini causa payload pesanti.

**Fix:** Aggiungere `.limit(50)` e/o paginazione.

---

## SICUREZZA

### 13. Route /kpi non protetta per ruolo
La route `/kpi` (Analytics) usa `<ProtectedRoute>` senza `requiredRole`. Un rivenditore autenticato può accedere alla dashboard analytics globale con dati di tutti i dealer.

**Fix:** Aggiungere `requiredRole="super_admin"` alla route `/kpi`.

### 14. ProtectedRoute: `hasRole` non considera la gerarchia
`hasRole` in AuthContext fa un semplice `===`. Il check in `ProtectedRoute` fa `userRole !== requiredRole && userRole !== "super_admin"` — funziona, ma è fragile se si aggiungono ruoli in futuro.

---

## PIANO DI IMPLEMENTAZIONE

### Fase 1 — Criticità (priorità alta)
1. Fixare AuthContext race condition (doppio fetch ruolo)
2. Aggiungere `requiredRole="super_admin"` alla route `/kpi`
3. Fixare error state in Analytics.tsx (pattern standard)
4. Debounce/ottimizzare invalidazioni in useRealtimeSync

### Fase 2 — Performance
5. Aggiungere paginazione a Preventivi e Assistenza
6. Creare query leggera per dropdown dealer (solo id + nome)
7. Limitare query ordini in DealerDetail
8. Parallelizzare query in useUnifiedAnalytics con Promise.all

### Fase 3 — UX
9. Aggiungere frecce ordinamento colonne in Pagamenti
10. Migliorare sezione Assistenza (KPI, ricerca, mobile)
11. Refactor Orders.tsx in sotto-componenti
12. Fixare filtro date revenue in Dashboard

