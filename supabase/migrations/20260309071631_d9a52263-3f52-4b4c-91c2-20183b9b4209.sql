
CREATE OR REPLACE FUNCTION public.get_revenue_by_date_range(
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
  v_start date;
  v_end date;
BEGIN
  -- Default to last 6 months if no dates provided
  v_start := COALESCE(p_start_date::date, (date_trunc('month', CURRENT_DATE) - interval '5 months')::date);
  v_end := COALESCE(p_end_date::date, CURRENT_DATE);

  RETURN (
    SELECT COALESCE(jsonb_agg(monthly ORDER BY month_iso), '[]'::jsonb)
    FROM (
      SELECT 
        to_char(month_date, 'TMM YYYY') as month,
        to_char(month_date, 'YYYY-MM') as month_iso,
        COALESCE(order_stats.total_revenue, 0)::numeric as ricavi,
        COALESCE(order_stats.total_acconti, 0)::numeric as acconti,
        COALESCE(payment_stats.total_incassato, 0)::numeric as incassato
      FROM generate_series(
        date_trunc('month', v_start::timestamp),
        date_trunc('month', v_end::timestamp),
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
