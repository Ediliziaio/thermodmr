CREATE OR REPLACE VIEW public.dealers_with_stats AS
SELECT d.id,
    d.ragione_sociale,
    d.p_iva,
    d.codice_fiscale,
    d.email,
    d.telefono,
    d.indirizzo,
    d.citta,
    d.cap,
    d.provincia,
    d.note,
    d.commerciale_owner_id,
    d.commissione_personalizzata,
    d.created_at,
    d.updated_at,
    COALESCE(stats.orders_count, 0::bigint) AS orders_count,
    COALESCE(stats.total_revenue, 0::numeric) AS total_revenue,
    COALESCE(stats.total_paid, 0::numeric) AS total_paid,
    COALESCE(stats.total_revenue, 0::numeric) - COALESCE(stats.total_paid, 0::numeric) AS total_remaining,
    stats.last_order_date,
    stats.last_order_id,
    COALESCE(stats.preventivi_count, 0::bigint) AS preventivi_count
   FROM dealers d
     LEFT JOIN LATERAL ( SELECT count(o.id) AS orders_count,
            sum(o.importo_totale) AS total_revenue,
            COALESCE(sum(p.paid), 0::numeric) AS total_paid,
            max(o.data_inserimento) AS last_order_date,
            (SELECT o2.id FROM orders o2 WHERE o2.dealer_id = d.id ORDER BY o2.data_inserimento DESC LIMIT 1) AS last_order_id,
            count(o.id) FILTER (WHERE o.stato = 'preventivo') AS preventivi_count
           FROM orders o
             LEFT JOIN LATERAL ( SELECT COALESCE(sum(pay.importo), 0::numeric) AS paid
                   FROM payments pay
                  WHERE pay.ordine_id = o.id) p ON true
          WHERE o.dealer_id = d.id) stats ON true;