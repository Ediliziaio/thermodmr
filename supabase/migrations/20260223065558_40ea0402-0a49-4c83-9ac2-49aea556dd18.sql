
DROP VIEW IF EXISTS dealers_with_stats;

CREATE VIEW dealers_with_stats AS
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
