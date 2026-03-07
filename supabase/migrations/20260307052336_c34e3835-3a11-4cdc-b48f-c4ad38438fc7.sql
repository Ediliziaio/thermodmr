DROP VIEW IF EXISTS orders_with_payment_stats;

CREATE VIEW orders_with_payment_stats WITH (security_invoker = true) AS
SELECT 
    o.id,
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
    o.modalita_pagamento,
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
GROUP BY o.id, o.cliente_finale_id, o.commerciale_id, o.created_at, o.creato_da_user_id, o.data_consegna_prevista, o.data_inserimento, o.dealer_id, o.importo_acconto, o.importo_totale, o.note_interna, o.note_rivenditore, o.modalita_pagamento, o.stato, o.updated_at;