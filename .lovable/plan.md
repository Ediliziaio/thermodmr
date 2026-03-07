

# Miglioramenti Dashboard

## Cosa manca

### 1. KPI Ordini Attivi per Stato (click-to-filter)
Aggiungere una riga di badge/chip cliccabili sotto le KPI cards che mostra il conteggio ordini per ogni fase del workflow (Da Confermare: 3, In Lavorazione: 5, ecc.). Click naviga a `/ordini?status=X`. I dati sono gia disponibili in `kpis.ordersByStatus`.

### 2. Variazione % vs Periodo Precedente sulle KPI Cards
Calcolare la variazione percentuale rispetto al periodo precedente per ogni KPI (Ricavi, Acconti, Incassato, Da Saldare). Richiede una nuova RPC `get_dashboard_kpis_comparison` che accetta due range di date e restituisce i valori di entrambi i periodi, oppure il calcolo lato client con una seconda chiamata.

### 3. Barra Progresso Incassi Globale
Inserire una `Progress` bar tra le KPI cards e i grafici che mostra visivamente "Incassato X di Y" con colore dinamico (verde/arancio/rosso). Usa dati gia disponibili: `kpis.totalIncassato` / `kpis.totalRevenue`.

### 4. Ultimi Ordini / Attivita Recente
Widget card con gli ultimi 5 ordini creati/aggiornati, mostrando numero, dealer, stato e importo. Click naviga al dettaglio. Query semplice sulla tabella `orders` ordinata per `updated_at DESC`.

## Modifiche tecniche

### Database
- Nuova RPC `get_dashboard_kpis_comparison(p_start_date, p_end_date)` che restituisce anche i KPI del periodo precedente di uguale durata (per calcolare delta %)

### `src/pages/Dashboard.tsx`
- Aggiungere riga di badge ordini per stato (cliccabili) sotto le KPI cards
- Aggiungere barra `Progress` incassi globale
- Aggiungere frecce trend sulle KPI cards usando i dati di comparazione
- Aggiungere widget "Ultimi Ordini" nel grid grafici

### `src/hooks/useDashboard.ts`
- Aggiungere hook `useRecentOrders(limit)` per gli ultimi ordini
- Estendere `useDashboardKPIs` per includere delta % dal periodo precedente

### Nuovo componente `src/components/dashboard/RecentOrdersWidget.tsx`
- Lista compatta degli ultimi 5 ordini con stato, dealer, importo
- Click per navigare al dettaglio

