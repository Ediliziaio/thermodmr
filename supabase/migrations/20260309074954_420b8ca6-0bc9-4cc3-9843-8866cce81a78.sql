
CREATE OR REPLACE FUNCTION public.get_dealer_global_stats(
  p_provincia text DEFAULT NULL,
  p_commerciale_id uuid DEFAULT NULL,
  p_search text DEFAULT NULL,
  p_min_revenue numeric DEFAULT NULL,
  p_max_revenue numeric DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_dealers', COUNT(*),
    'total_revenue', COALESCE(SUM(dws.total_revenue), 0),
    'total_paid', COALESCE(SUM(dws.total_paid), 0),
    'total_remaining', COALESCE(SUM(dws.total_remaining), 0),
    'inactive_count', COUNT(*) FILTER (
      WHERE dws.last_order_date IS NULL 
         OR dws.last_order_date < (now() - interval '30 days')
    )
  ) INTO v_result
  FROM dealers_with_stats dws
  WHERE (p_provincia IS NULL OR dws.provincia = p_provincia)
    AND (p_commerciale_id IS NULL OR dws.commerciale_owner_id = p_commerciale_id)
    AND (p_search IS NULL OR (
      dws.ragione_sociale ILIKE '%' || p_search || '%'
      OR dws.p_iva ILIKE '%' || p_search || '%'
      OR dws.email ILIKE '%' || p_search || '%'
      OR dws.telefono ILIKE '%' || p_search || '%'
    ))
    AND (p_min_revenue IS NULL OR COALESCE(dws.total_revenue, 0) >= p_min_revenue)
    AND (p_max_revenue IS NULL OR COALESCE(dws.total_revenue, 0) <= p_max_revenue);

  RETURN v_result;
END;
$$;
