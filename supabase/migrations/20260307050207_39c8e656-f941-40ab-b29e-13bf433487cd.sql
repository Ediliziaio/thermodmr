CREATE OR REPLACE FUNCTION public.get_dashboard_kpis(p_start_date timestamp with time zone DEFAULT NULL::timestamp with time zone, p_end_date timestamp with time zone DEFAULT NULL::timestamp with time zone, p_commerciale_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_result jsonb;
BEGIN
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
      'da_saldare', COALESCE(COUNT(*) FILTER (WHERE o.stato = 'da_saldare'), 0),
      'da_consegnare', COALESCE(COUNT(*) FILTER (WHERE o.stato = 'da_consegnare'), 0),
      'consegnato', COALESCE(COUNT(*) FILTER (WHERE o.stato = 'consegnato'), 0)
    )
  ) INTO v_result
  FROM orders o
  WHERE (p_commerciale_id IS NULL OR o.commerciale_id = p_commerciale_id)
    AND (p_start_date IS NULL OR (o.data_inserimento >= p_start_date AND o.data_inserimento <= p_end_date));

  RETURN v_result;
END;
$function$;