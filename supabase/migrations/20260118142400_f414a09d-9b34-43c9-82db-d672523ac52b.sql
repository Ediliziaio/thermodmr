-- =====================================================
-- FASE 1: Indici per migliorare performance query
-- =====================================================

-- Indici per tabella orders
CREATE INDEX IF NOT EXISTS idx_orders_data_inserimento 
  ON orders(data_inserimento DESC);

CREATE INDEX IF NOT EXISTS idx_orders_stato 
  ON orders(stato);

CREATE INDEX IF NOT EXISTS idx_orders_commerciale_stato 
  ON orders(commerciale_id, stato);

CREATE INDEX IF NOT EXISTS idx_orders_dealer_id 
  ON orders(dealer_id);

CREATE INDEX IF NOT EXISTS idx_orders_data_consegna_prevista 
  ON orders(data_consegna_prevista) 
  WHERE data_consegna_prevista IS NOT NULL;

-- Indici per tabella payments
CREATE INDEX IF NOT EXISTS idx_payments_ordine_id 
  ON payments(ordine_id);

CREATE INDEX IF NOT EXISTS idx_payments_data_pagamento 
  ON payments(data_pagamento DESC);

CREATE INDEX IF NOT EXISTS idx_payments_tipo 
  ON payments(tipo);

-- Indici per tabella dealers
CREATE INDEX IF NOT EXISTS idx_dealers_commerciale_owner 
  ON dealers(commerciale_owner_id);

-- Indici per tabella commissions
CREATE INDEX IF NOT EXISTS idx_commissions_commerciale_id 
  ON commissions(commerciale_id);

CREATE INDEX IF NOT EXISTS idx_commissions_stato_liquidazione 
  ON commissions(stato_liquidazione);

-- =====================================================
-- FASE 2: Funzione ottimizzata get_revenue_by_month
-- =====================================================

CREATE OR REPLACE FUNCTION get_revenue_by_month(
  p_months integer DEFAULT 6,
  p_commerciale_id uuid DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (
    SELECT jsonb_agg(monthly ORDER BY month_date)
    FROM (
      SELECT 
        to_char(month_date, 'Mon YYYY') as month,
        COALESCE(order_stats.total_revenue, 0)::numeric as ricavi,
        COALESCE(order_stats.total_acconti, 0)::numeric as acconti,
        COALESCE(payment_stats.total_incassato, 0)::numeric as incassato,
        month_date
      FROM generate_series(
        date_trunc('month', CURRENT_DATE) - ((p_months - 1) || ' months')::interval,
        date_trunc('month', CURRENT_DATE),
        '1 month'::interval
      ) month_date
      LEFT JOIN LATERAL (
        SELECT 
          SUM(importo_totale) as total_revenue,
          SUM(importo_acconto) as total_acconti
        FROM orders
        WHERE date_trunc('month', data_inserimento) = month_date
          AND (p_commerciale_id IS NULL OR commerciale_id = p_commerciale_id)
      ) order_stats ON true
      LEFT JOIN LATERAL (
        SELECT SUM(p.importo) as total_incassato
        FROM payments p
        INNER JOIN orders o ON p.ordine_id = o.id
        WHERE date_trunc('month', p.data_pagamento) = month_date
          AND (p_commerciale_id IS NULL OR o.commerciale_id = p_commerciale_id)
      ) payment_stats ON true
    ) monthly
  );
END;
$$;

-- =====================================================
-- FASE 3: Nuova funzione get_order_stats
-- =====================================================

CREATE OR REPLACE FUNCTION get_order_stats(p_order_id text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'importo_totale', o.importo_totale,
    'importo_acconto', o.importo_acconto,
    'importo_pagato', COALESCE(SUM(p.importo), 0),
    'importo_residuo', o.importo_totale - COALESCE(SUM(p.importo), 0),
    'percentuale_pagata', 
      CASE 
        WHEN o.importo_totale > 0 
        THEN ROUND(COALESCE(SUM(p.importo), 0) / o.importo_totale * 100, 2)
        ELSE 0 
      END,
    'numero_pagamenti', COUNT(p.id),
    'ultimo_pagamento', MAX(p.data_pagamento),
    'giorni_da_inserimento', EXTRACT(DAY FROM now() - o.data_inserimento)::integer,
    'stato', o.stato,
    'data_consegna_prevista', o.data_consegna_prevista
  ) INTO result
  FROM orders o
  LEFT JOIN payments p ON p.ordine_id = o.id
  WHERE o.id = p_order_id
  GROUP BY o.id, o.importo_totale, o.importo_acconto, o.data_inserimento, o.stato, o.data_consegna_prevista;

  RETURN result;
END;
$$;

-- =====================================================
-- FASE 4: Nuova funzione get_upcoming_deadlines
-- =====================================================

CREATE OR REPLACE FUNCTION get_upcoming_deadlines(
  p_days_ahead integer DEFAULT 7,
  p_commerciale_id uuid DEFAULT NULL,
  p_limit integer DEFAULT 20
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (
    SELECT COALESCE(jsonb_agg(deadline_info), '[]'::jsonb)
    FROM (
      SELECT jsonb_build_object(
        'order_id', o.id,
        'dealer_id', d.id,
        'dealer_name', d.ragione_sociale,
        'data_consegna', o.data_consegna_prevista,
        'giorni_rimanenti', (o.data_consegna_prevista - CURRENT_DATE),
        'stato', o.stato,
        'importo_totale', o.importo_totale,
        'importo_pagato', COALESCE(payment_sum.total, 0),
        'importo_residuo', o.importo_totale - COALESCE(payment_sum.total, 0),
        'is_overdue', o.data_consegna_prevista < CURRENT_DATE
      ) as deadline_info
      FROM orders o
      INNER JOIN dealers d ON o.dealer_id = d.id
      LEFT JOIN LATERAL (
        SELECT SUM(importo) as total
        FROM payments
        WHERE ordine_id = o.id
      ) payment_sum ON true
      WHERE o.stato NOT IN ('consegnato')
        AND o.data_consegna_prevista IS NOT NULL
        AND o.data_consegna_prevista <= CURRENT_DATE + p_days_ahead
        AND (p_commerciale_id IS NULL OR o.commerciale_id = p_commerciale_id)
      ORDER BY o.data_consegna_prevista ASC
      LIMIT p_limit
    ) deadlines
  );
END;
$$;

-- =====================================================
-- FASE 5: Funzione per statistiche commerciale
-- =====================================================

CREATE OR REPLACE FUNCTION get_commerciale_stats(
  p_commerciale_id uuid,
  p_start_date date DEFAULT date_trunc('month', CURRENT_DATE)::date,
  p_end_date date DEFAULT CURRENT_DATE
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (
    SELECT jsonb_build_object(
      'ordini_totali', COUNT(o.id),
      'ordini_consegnati', COUNT(o.id) FILTER (WHERE o.stato = 'consegnato'),
      'ordini_in_lavorazione', COUNT(o.id) FILTER (WHERE o.stato = 'in_lavorazione'),
      'fatturato_periodo', COALESCE(SUM(o.importo_totale), 0),
      'incassato_periodo', COALESCE(SUM(payment_sum.total), 0),
      'ticket_medio', COALESCE(AVG(o.importo_totale), 0),
      'dealers_attivi', COUNT(DISTINCT o.dealer_id),
      'tasso_conversione', 
        CASE 
          WHEN COUNT(o.id) > 0 
          THEN ROUND(COUNT(o.id) FILTER (WHERE o.stato = 'consegnato')::numeric / COUNT(o.id) * 100, 2)
          ELSE 0 
        END
    )
    FROM orders o
    LEFT JOIN LATERAL (
      SELECT SUM(importo) as total
      FROM payments
      WHERE ordine_id = o.id
        AND data_pagamento BETWEEN p_start_date AND p_end_date
    ) payment_sum ON true
    WHERE o.commerciale_id = p_commerciale_id
      AND o.data_inserimento BETWEEN p_start_date AND p_end_date
  );
END;
$$;

-- =====================================================
-- FASE 6: Trigger per audit log automatico sugli ordini
-- =====================================================

CREATE OR REPLACE FUNCTION log_order_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO audit_log (entity, entity_id, azione, user_id, old_values, new_values)
  VALUES (
    'order',
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    COALESCE(auth.uid(), COALESCE(NEW.creato_da_user_id, OLD.creato_da_user_id)),
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS tr_orders_audit ON orders;

-- Create new trigger
CREATE TRIGGER tr_orders_audit
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION log_order_changes();

-- =====================================================
-- FASE 7: Funzione per pulizia audit log vecchi
-- =====================================================

CREATE OR REPLACE FUNCTION cleanup_old_audit_logs(
  p_days_to_keep integer DEFAULT 90
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM audit_log
  WHERE created_at < CURRENT_DATE - p_days_to_keep;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$$;