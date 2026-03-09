
CREATE OR REPLACE FUNCTION public.get_payment_stats(
  p_date_from date DEFAULT NULL,
  p_date_to date DEFAULT NULL,
  p_tipo text DEFAULT NULL,
  p_metodo text DEFAULT NULL,
  p_dealer_id uuid DEFAULT NULL
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
    'totale_incassato', COALESCE(SUM(p.importo), 0),
    'media_importo', COALESCE(AVG(p.importo), 0),
    'num_pagamenti', COUNT(p.id),
    'metodo_piu_usato', (
      SELECT p2.metodo 
      FROM payments p2
      INNER JOIN orders o2 ON p2.ordine_id = o2.id
      WHERE (p_date_from IS NULL OR p2.data_pagamento >= p_date_from)
        AND (p_date_to IS NULL OR p2.data_pagamento <= p_date_to)
        AND (p_tipo IS NULL OR p2.tipo::text = p_tipo)
        AND (p_metodo IS NULL OR p2.metodo ILIKE p_metodo)
        AND (p_dealer_id IS NULL OR o2.dealer_id = p_dealer_id)
      GROUP BY p2.metodo
      ORDER BY COUNT(*) DESC
      LIMIT 1
    )
  ) INTO v_result
  FROM payments p
  INNER JOIN orders o ON p.ordine_id = o.id
  WHERE (p_date_from IS NULL OR p.data_pagamento >= p_date_from)
    AND (p_date_to IS NULL OR p.data_pagamento <= p_date_to)
    AND (p_tipo IS NULL OR p.tipo::text = p_tipo)
    AND (p_metodo IS NULL OR p.metodo ILIKE p_metodo)
    AND (p_dealer_id IS NULL OR o.dealer_id = p_dealer_id);

  RETURN v_result;
END;
$$;
