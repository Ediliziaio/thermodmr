

## Arricchire la Vista Riga Rivenditori con Dati Ordini e Pagamenti

### Obiettivo

Aggiungere alla riga di ogni rivenditore le informazioni su: importo incassato, importo da incassare, e nella sezione espansa mostrare il dettaglio degli ordini con stato e importi.

### 1. Aggiornare la view `dealers_with_stats`

Estendere la view PostgreSQL per includere le statistiche sui pagamenti, aggregando i dati dalla tabella `payments` tramite `orders`:

Nuove colonne:
- `total_paid` (totale incassato)
- `total_remaining` (totale da incassare = total_revenue - total_paid)
- `orders_da_confermare` (conteggio ordini per stato)
- `orders_confermato` 
- `orders_in_produzione`
- `orders_consegnato`

### 2. Aggiornare il tipo `DealerWithStats`

In `src/hooks/useDealers.ts`, aggiungere i nuovi campi all'interfaccia:

```text
export interface DealerWithStats extends Tables<"dealers"> {
  orders_count?: number;
  total_revenue?: number;
  total_paid?: number;       // NUOVO
  total_remaining?: number;  // NUOVO
}
```

### 3. Aggiornare `DealerRowView.tsx`

**Riga principale** -- aggiungere colonne "Incassato" e "Da Incassare":

```text
Ragione Sociale | P.IVA | Ordini | Fatturato | Incassato | Da Incassare | Comm. | [v]
```

- "Incassato" in verde
- "Da Incassare" in giallo/arancio se > 0

**Sezione espansa** -- aggiungere una riga di mini-KPI prima dei contatti:

```text
+--------------------------------------------------+
| Ordini: 4 | Incassato: 45.000 | Residuo: 18.530  |
| Email: ...  Telefono: ...  Indirizzo: ...         |
| [Dettaglio] [Modifica] [Elimina] [Accedi Area]    |
+--------------------------------------------------+
```

### 4. Aggiornare il grid layout

Il grid passa da 5 a 7 colonne:
```text
grid-cols-[2fr_1.2fr_0.6fr_1fr_1fr_1fr_0.6fr]
```

### File da modificare

| File | Modifica |
|------|----------|
| Migration SQL | Ricreare view `dealers_with_stats` con colonne pagamento |
| `src/hooks/useDealers.ts` | Aggiungere campi `total_paid`, `total_remaining` al tipo |
| `src/components/dealers/DealerRowView.tsx` | Aggiungere colonne incassato/da incassare, mini-KPI nell'espansione |

### Dettaglio SQL

```text
CREATE OR REPLACE VIEW dealers_with_stats AS
SELECT 
  d.*,
  COALESCE(stats.orders_count, 0) AS orders_count,
  COALESCE(stats.total_revenue, 0) AS total_revenue,
  COALESCE(stats.total_paid, 0) AS total_paid,
  COALESCE(stats.total_revenue, 0) - COALESCE(stats.total_paid, 0) AS total_remaining
FROM dealers d
LEFT JOIN LATERAL (
  SELECT 
    count(o.id) AS orders_count,
    sum(o.importo_totale) AS total_revenue,
    COALESCE(sum(p.paid), 0) AS total_paid
  FROM orders o
  LEFT JOIN LATERAL (
    SELECT COALESCE(sum(pay.importo), 0) AS paid
    FROM payments pay WHERE pay.ordine_id = o.id
  ) p ON true
  WHERE o.dealer_id = d.id
) stats ON true;
```
