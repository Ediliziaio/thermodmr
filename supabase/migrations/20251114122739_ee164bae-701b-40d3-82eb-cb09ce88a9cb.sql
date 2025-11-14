-- Fix get_top_dealers function to resolve GROUP BY error
DROP FUNCTION IF EXISTS public.get_top_dealers(integer, uuid, timestamptz, timestamptz);

CREATE OR REPLACE FUNCTION public.get_top_dealers(
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
      'id', id,
      'ragione_sociale', ragione_sociale,
      'totalRevenue', total_revenue,
      'ordersCount', orders_count
    )
  ) INTO v_result
  FROM (
    SELECT 
      d.id,
      d.ragione_sociale,
      COALESCE(dealer_stats.total_revenue, 0) as total_revenue,
      COALESCE(dealer_stats.orders_count, 0) as orders_count
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
    WHERE COALESCE(dealer_stats.total_revenue, 0) > 0
    ORDER BY dealer_stats.total_revenue DESC
    LIMIT p_limit
  ) top_dealers_data;

  RETURN v_result;
END;
$$;