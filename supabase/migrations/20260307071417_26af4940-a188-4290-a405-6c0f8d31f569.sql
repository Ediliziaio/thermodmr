
CREATE OR REPLACE FUNCTION public.get_dashboard_kpis_comparison(
  p_start_date timestamp with time zone DEFAULT NULL,
  p_end_date timestamp with time zone DEFAULT NULL,
  p_commerciale_id uuid DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_current jsonb;
  v_previous jsonb;
  v_duration interval;
  v_prev_start timestamp with time zone;
  v_prev_end timestamp with time zone;
BEGIN
  -- Calculate previous period of equal duration
  IF p_start_date IS NOT NULL AND p_end_date IS NOT NULL THEN
    v_duration := p_end_date - p_start_date;
    v_prev_end := p_start_date;
    v_prev_start := p_start_date - v_duration;
  ELSE
    -- Default: last 6 months vs previous 6 months
    v_prev_end := date_trunc('month', CURRENT_DATE) - interval '1 day';
    v_prev_start := v_prev_end - interval '6 months';
    p_start_date := date_trunc('month', CURRENT_DATE) - interval '6 months';
    p_end_date := CURRENT_DATE;
  END IF;

  -- Current period KPIs
  SELECT jsonb_build_object(
    'totalOrders', COALESCE(COUNT(DISTINCT o.id), 0),
    'totalRevenue', COALESCE(SUM(o.importo_totale), 0),
    'totalAcconti', COALESCE(SUM(o.importo_acconto), 0),
    'totalIncassato', COALESCE(
      (SELECT SUM(p.importo) FROM payments p WHERE p.ordine_id = ANY(ARRAY_AGG(o.id))), 0
    )
  ) INTO v_current
  FROM orders o
  WHERE (p_commerciale_id IS NULL OR o.commerciale_id = p_commerciale_id)
    AND o.data_inserimento >= p_start_date AND o.data_inserimento <= p_end_date;

  -- Previous period KPIs
  SELECT jsonb_build_object(
    'totalOrders', COALESCE(COUNT(DISTINCT o.id), 0),
    'totalRevenue', COALESCE(SUM(o.importo_totale), 0),
    'totalAcconti', COALESCE(SUM(o.importo_acconto), 0),
    'totalIncassato', COALESCE(
      (SELECT SUM(p.importo) FROM payments p WHERE p.ordine_id = ANY(ARRAY_AGG(o.id))), 0
    )
  ) INTO v_previous
  FROM orders o
  WHERE (p_commerciale_id IS NULL OR o.commerciale_id = p_commerciale_id)
    AND o.data_inserimento >= v_prev_start AND o.data_inserimento <= v_prev_end;

  RETURN jsonb_build_object(
    'current', v_current,
    'previous', v_previous
  );
END;
$$;
