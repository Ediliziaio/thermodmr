-- Funzione per calcolare KPI dashboard con filtri temporali
CREATE OR REPLACE FUNCTION get_dashboard_kpis(
  p_start_date timestamptz DEFAULT NULL,
  p_end_date timestamptz DEFAULT NULL,
  p_commerciale_id uuid DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
  v_date_filter text := '';
BEGIN
  -- Costruisci filtro date se fornite
  IF p_start_date IS NOT NULL AND p_end_date IS NOT NULL THEN
    v_date_filter := format(' AND o.data_inserimento >= %L AND o.data_inserimento <= %L', p_start_date, p_end_date);
  END IF;

  -- Calcola KPI aggregate
  SELECT jsonb_build_object(
    'totalOrders', COALESCE(COUNT(DISTINCT o.id), 0),
    'totalRevenue', COALESCE(SUM(o.importo_totale), 0),
    'totalAcconti', COALESCE(SUM(o.importo_acconto), 0),
    'totalIncassato', COALESCE(
      (SELECT SUM(p.importo) 
       FROM payments p 
       WHERE p.ordine_id = ANY(ARRAY_AGG(o.id))
      ), 0
    ),
    'ordersByStatus', jsonb_build_object(
      'da_confermare', COALESCE(COUNT(*) FILTER (WHERE o.stato = 'da_confermare'), 0),
      'da_pagare_acconto', COALESCE(COUNT(*) FILTER (WHERE o.stato = 'da_pagare_acconto'), 0),
      'in_lavorazione', COALESCE(COUNT(*) FILTER (WHERE o.stato = 'in_lavorazione'), 0),
      'da_consegnare', COALESCE(COUNT(*) FILTER (WHERE o.stato = 'da_consegnare'), 0),
      'consegnato', COALESCE(COUNT(*) FILTER (WHERE o.stato = 'consegnato'), 0)
    )
  ) INTO v_result
  FROM orders o
  WHERE (p_commerciale_id IS NULL OR o.commerciale_id = p_commerciale_id)
    AND (p_start_date IS NULL OR (o.data_inserimento >= p_start_date AND o.data_inserimento <= p_end_date));

  RETURN v_result;
END;
$$;

-- Funzione per ottenere dati ricavi mensili
CREATE OR REPLACE FUNCTION get_revenue_by_month(
  p_months integer DEFAULT 6,
  p_commerciale_id uuid DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT jsonb_agg(
    jsonb_build_object(
      'month', month_name,
      'ricavi', COALESCE(total_revenue, 0),
      'acconti', COALESCE(total_acconti, 0),
      'incassato', COALESCE(total_incassato, 0)
    ) ORDER BY month_date
  ) INTO v_result
  FROM (
    SELECT 
      to_char(month_date, 'Mon YYYY') as month_name,
      month_date,
      (
        SELECT COALESCE(SUM(o.importo_totale), 0)
        FROM orders o
        WHERE date_trunc('month', o.data_inserimento) = month_date
          AND (p_commerciale_id IS NULL OR o.commerciale_id = p_commerciale_id)
      ) as total_revenue,
      (
        SELECT COALESCE(SUM(o.importo_acconto), 0)
        FROM orders o
        WHERE date_trunc('month', o.data_inserimento) = month_date
          AND (p_commerciale_id IS NULL OR o.commerciale_id = p_commerciale_id)
      ) as total_acconti,
      (
        SELECT COALESCE(SUM(p.importo), 0)
        FROM payments p
        JOIN orders o ON p.ordine_id = o.id
        WHERE date_trunc('month', p.data_pagamento) = month_date
          AND (p_commerciale_id IS NULL OR o.commerciale_id = p_commerciale_id)
      ) as total_incassato
    FROM generate_series(
      date_trunc('month', CURRENT_DATE) - (p_months - 1 || ' months')::interval,
      date_trunc('month', CURRENT_DATE),
      '1 month'::interval
    ) as month_date
  ) monthly_data;

  RETURN v_result;
END;
$$;

-- Funzione per top dealers
CREATE OR REPLACE FUNCTION get_top_dealers(
  p_limit integer DEFAULT 5,
  p_commerciale_id uuid DEFAULT NULL,
  p_start_date timestamptz DEFAULT NULL,
  p_end_date timestamptz DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', d.id,
      'ragione_sociale', d.ragione_sociale,
      'totalRevenue', COALESCE(dealer_stats.total_revenue, 0),
      'ordersCount', COALESCE(dealer_stats.orders_count, 0)
    ) ORDER BY dealer_stats.total_revenue DESC
  ) INTO v_result
  FROM dealers d
  LEFT JOIN LATERAL (
    SELECT 
      SUM(o.importo_totale) as total_revenue,
      COUNT(o.id) as orders_count
    FROM orders o
    WHERE o.dealer_id = d.id
      AND (p_commerciale_id IS NULL OR o.commerciale_id = p_commerciale_id)
      AND (p_start_date IS NULL OR (o.data_inserimento >= p_start_date AND o.data_inserimento <= p_end_date))
  ) dealer_stats ON true
  WHERE dealer_stats.total_revenue > 0
  ORDER BY dealer_stats.total_revenue DESC
  LIMIT p_limit;

  RETURN v_result;
END;
$$;

-- Indici per ottimizzare le query
CREATE INDEX IF NOT EXISTS idx_orders_data_inserimento ON orders(data_inserimento);
CREATE INDEX IF NOT EXISTS idx_orders_commerciale_data ON orders(commerciale_id, data_inserimento);
CREATE INDEX IF NOT EXISTS idx_orders_dealer_data ON orders(dealer_id, data_inserimento);
CREATE INDEX IF NOT EXISTS idx_payments_data_pagamento ON payments(data_pagamento);
CREATE INDEX IF NOT EXISTS idx_payments_ordine_id ON payments(ordine_id);