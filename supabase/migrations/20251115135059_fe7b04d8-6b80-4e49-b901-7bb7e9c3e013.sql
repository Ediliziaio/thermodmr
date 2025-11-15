-- View ottimizzata per dealers con statistiche aggregate
CREATE OR REPLACE VIEW dealers_with_stats AS
SELECT 
  d.*,
  COALESCE(order_stats.orders_count, 0) AS orders_count,
  COALESCE(order_stats.total_revenue, 0) AS total_revenue
FROM dealers d
LEFT JOIN LATERAL (
  SELECT 
    COUNT(o.id) AS orders_count,
    SUM(o.importo_totale) AS total_revenue
  FROM orders o
  WHERE o.dealer_id = d.id
) order_stats ON true;

-- View ottimizzata per commerciali con statistiche aggregate
CREATE OR REPLACE VIEW commerciali_with_stats AS
SELECT 
  p.id,
  p.display_name,
  p.email,
  p.is_active,
  COALESCE(dealer_stats.dealers_count, 0) AS dealers_count,
  COALESCE(order_stats.ordini_count, 0) AS ordini_count,
  COALESCE(order_stats.fatturato_totale, 0) AS fatturato_totale,
  COALESCE(commission_stats.provvigioni_dovute, 0) AS provvigioni_dovute,
  COALESCE(commission_stats.provvigioni_liquidate, 0) AS provvigioni_liquidate
FROM profiles p
INNER JOIN user_roles ur ON ur.user_id = p.id AND ur.role = 'commerciale'
LEFT JOIN LATERAL (
  SELECT COUNT(d.id) AS dealers_count
  FROM dealers d
  WHERE d.commerciale_owner_id = p.id
) dealer_stats ON true
LEFT JOIN LATERAL (
  SELECT 
    COUNT(o.id) AS ordini_count,
    SUM(o.importo_totale) AS fatturato_totale
  FROM orders o
  WHERE o.commerciale_id = p.id
) order_stats ON true
LEFT JOIN LATERAL (
  SELECT 
    SUM(CASE WHEN c.stato_liquidazione = 'dovuta' THEN c.importo_calcolato ELSE 0 END) AS provvigioni_dovute,
    SUM(CASE WHEN c.stato_liquidazione = 'liquidata' THEN c.importo_calcolato ELSE 0 END) AS provvigioni_liquidate
  FROM commissions c
  WHERE c.commerciale_id = p.id
) commission_stats ON true;

-- Concedi permessi di SELECT sulle views
GRANT SELECT ON dealers_with_stats TO authenticated;
GRANT SELECT ON commerciali_with_stats TO authenticated;