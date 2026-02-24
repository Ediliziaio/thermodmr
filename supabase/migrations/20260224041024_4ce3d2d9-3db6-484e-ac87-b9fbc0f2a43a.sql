
-- ============================================
-- FASE 1: SICUREZZA DATABASE - PRODUCTION HARDENING
-- ============================================

-- 1. Ricreare views con SECURITY INVOKER (non DEFINER)
-- Questo garantisce che le RLS policies delle tabelle base vengano rispettate

DROP VIEW IF EXISTS public.commerciali_with_stats;
DROP VIEW IF EXISTS public.orders_with_payment_stats;
DROP VIEW IF EXISTS public.dealers_with_stats;

-- Ricreare commerciali_with_stats con SECURITY INVOKER
CREATE VIEW public.commerciali_with_stats
WITH (security_invoker = true)
AS
SELECT p.id,
    p.display_name,
    p.email,
    p.is_active,
    COALESCE(dealer_stats.dealers_count, 0::bigint) AS dealers_count,
    COALESCE(order_stats.ordini_count, 0::bigint) AS ordini_count,
    COALESCE(order_stats.fatturato_totale, 0::numeric) AS fatturato_totale,
    COALESCE(commission_stats.provvigioni_dovute, 0::numeric) AS provvigioni_dovute,
    COALESCE(commission_stats.provvigioni_liquidate, 0::numeric) AS provvigioni_liquidate
   FROM profiles p
     JOIN user_roles ur ON ur.user_id = p.id AND ur.role = 'commerciale'::app_role
     LEFT JOIN LATERAL ( SELECT count(d.id) AS dealers_count
           FROM dealers d
          WHERE d.commerciale_owner_id = p.id) dealer_stats ON true
     LEFT JOIN LATERAL ( SELECT count(o.id) AS ordini_count,
            sum(o.importo_totale) AS fatturato_totale
           FROM orders o
          WHERE o.commerciale_id = p.id) order_stats ON true
     LEFT JOIN LATERAL ( SELECT sum(
                CASE
                    WHEN c.stato_liquidazione = 'dovuta'::liquidation_status THEN c.importo_calcolato
                    ELSE 0::numeric
                END) AS provvigioni_dovute,
            sum(
                CASE
                    WHEN c.stato_liquidazione = 'liquidata'::liquidation_status THEN c.importo_calcolato
                    ELSE 0::numeric
                END) AS provvigioni_liquidate
           FROM commissions c
          WHERE c.commerciale_id = p.id) commission_stats ON true;

-- Ricreare orders_with_payment_stats con SECURITY INVOKER
CREATE VIEW public.orders_with_payment_stats
WITH (security_invoker = true)
AS
SELECT o.id,
    o.dealer_id,
    o.commerciale_id,
    o.creato_da_user_id,
    o.cliente_finale_id,
    o.stato,
    o.data_inserimento,
    o.data_consegna_prevista,
    o.importo_totale,
    o.importo_acconto,
    o.note_interna,
    o.note_rivenditore,
    o.created_at,
    o.updated_at,
    COALESCE(sum(p.importo), 0::numeric) AS importo_pagato,
    o.importo_totale - COALESCE(sum(p.importo), 0::numeric) AS importo_da_pagare,
        CASE
            WHEN o.importo_totale = 0::numeric THEN 0::numeric
            ELSE round(COALESCE(sum(p.importo), 0::numeric) / o.importo_totale * 100::numeric, 2)
        END AS percentuale_pagata,
    count(p.id) AS numero_pagamenti,
    max(p.data_pagamento) AS data_ultimo_pagamento
   FROM orders o
     LEFT JOIN payments p ON p.ordine_id = o.id
  GROUP BY o.id, o.cliente_finale_id, o.commerciale_id, o.created_at, o.creato_da_user_id, o.data_consegna_prevista, o.data_inserimento, o.dealer_id, o.importo_acconto, o.importo_totale, o.note_interna, o.note_rivenditore, o.stato, o.updated_at;

-- Ricreare dealers_with_stats con SECURITY INVOKER
CREATE VIEW public.dealers_with_stats
WITH (security_invoker = true)
AS
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
    COALESCE(stats.total_revenue, 0::numeric) - COALESCE(stats.total_paid, 0::numeric) AS total_remaining
   FROM dealers d
     LEFT JOIN LATERAL ( SELECT count(o.id) AS orders_count,
            sum(o.importo_totale) AS total_revenue,
            COALESCE(sum(p.paid), 0::numeric) AS total_paid
           FROM orders o
             LEFT JOIN LATERAL ( SELECT COALESCE(sum(pay.importo), 0::numeric) AS paid
                   FROM payments pay
                  WHERE pay.ordine_id = o.id) p ON true
          WHERE o.dealer_id = d.id) stats ON true;

-- 2. Super admin può vedere tutti i profili (necessario per gestione utenti)
CREATE POLICY "Super admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (has_role(auth.uid(), 'super_admin'::app_role));

-- 3. Utenti autenticati possono inserire audit log (con user_id = auth.uid())
CREATE POLICY "Authenticated users can insert audit logs"
  ON public.audit_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4. Restringere rls_test_runs: rimuovere policy "always true"
DROP POLICY IF EXISTS "System can manage test runs" ON public.rls_test_runs;
CREATE POLICY "Super admins can manage test runs"
  ON public.rls_test_runs FOR ALL
  USING (has_role(auth.uid(), 'super_admin'::app_role));

-- 5. Restringere rls_test_results INSERT
DROP POLICY IF EXISTS "System can insert test results" ON public.rls_test_results;
CREATE POLICY "Super admins can insert test results"
  ON public.rls_test_results FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));
