
CREATE OR REPLACE FUNCTION public.get_orders_kpi_filtered(
  p_dealer_id uuid DEFAULT NULL,
  p_stato text DEFAULT NULL,
  p_data_from timestamptz DEFAULT NULL,
  p_data_to timestamptz DEFAULT NULL,
  p_stato_pagamento text DEFAULT NULL,
  p_quick_filter text DEFAULT NULL,
  p_importo_min numeric DEFAULT NULL,
  p_importo_max numeric DEFAULT NULL,
  p_search text DEFAULT NULL
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
    'total_orders', COUNT(*),
    'total_value', COALESCE(SUM(ow.importo_totale), 0),
    'total_to_collect', COALESCE(SUM(ow.importo_da_pagare), 0),
    'orders_with_balance', COUNT(*) FILTER (WHERE ow.importo_da_pagare > 0)
  ) INTO v_result
  FROM orders_with_payment_stats ow
  LEFT JOIN dealers d ON ow.dealer_id = d.id
  LEFT JOIN clients c ON ow.cliente_finale_id = c.id
  WHERE ow.stato != 'preventivo'
    AND (p_dealer_id IS NULL OR ow.dealer_id = p_dealer_id)
    AND (p_stato IS NULL OR ow.stato::text = p_stato)
    AND (p_data_from IS NULL OR ow.data_inserimento >= p_data_from)
    AND (p_data_to IS NULL OR ow.data_inserimento <= p_data_to)
    AND (p_importo_min IS NULL OR ow.importo_totale >= p_importo_min)
    AND (p_importo_max IS NULL OR ow.importo_totale <= p_importo_max)
    AND (p_stato_pagamento IS NULL OR (
      (p_stato_pagamento = 'pagato' AND ow.importo_da_pagare = 0) OR
      (p_stato_pagamento = 'non_pagato' AND ow.importo_pagato = 0) OR
      (p_stato_pagamento = 'parziale' AND ow.importo_pagato > 0 AND ow.importo_da_pagare > 0)
    ))
    AND (p_quick_filter IS NULL OR (
      (p_quick_filter = 'saldo' AND ow.importo_da_pagare > 0) OR
      (p_quick_filter = 'ritardo' AND ow.data_consegna_prevista < CURRENT_DATE AND ow.stato != 'consegnato') OR
      (p_quick_filter = 'urgenti' AND ow.stato != 'consegnato' AND (
        (ow.data_consegna_prevista IS NOT NULL AND ow.data_consegna_prevista < CURRENT_DATE)
        OR ow.importo_da_pagare > 0
      ))
    ))
    AND (p_search IS NULL OR (
      ow.id ILIKE '%' || p_search || '%'
      OR ow.note_interna ILIKE '%' || p_search || '%'
      OR ow.note_rivenditore ILIKE '%' || p_search || '%'
      OR d.ragione_sociale ILIKE '%' || p_search || '%'
      OR c.nome ILIKE '%' || p_search || '%'
      OR c.cognome ILIKE '%' || p_search || '%'
    ));

  RETURN v_result;
END;
$$;
