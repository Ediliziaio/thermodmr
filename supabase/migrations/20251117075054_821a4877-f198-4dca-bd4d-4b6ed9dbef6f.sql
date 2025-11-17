-- Create view for orders with payment statistics
CREATE OR REPLACE VIEW orders_with_payment_stats AS
SELECT 
  o.*,
  COALESCE(SUM(p.importo), 0) as importo_pagato,
  o.importo_totale - COALESCE(SUM(p.importo), 0) as importo_da_pagare,
  CASE 
    WHEN o.importo_totale = 0 THEN 0
    ELSE ROUND((COALESCE(SUM(p.importo), 0)::numeric / o.importo_totale) * 100, 2)
  END as percentuale_pagata,
  COUNT(p.id) as numero_pagamenti,
  MAX(p.data_pagamento) as data_ultimo_pagamento
FROM orders o
LEFT JOIN payments p ON p.ordine_id = o.id
GROUP BY o.id, o.cliente_finale_id, o.commerciale_id, o.created_at, o.creato_da_user_id, 
         o.data_consegna_prevista, o.data_inserimento, o.dealer_id, o.importo_acconto, 
         o.importo_totale, o.note_interna, o.note_rivenditore, o.stato, o.updated_at;

-- Enable RLS on the view (inherits from orders table policies)
ALTER VIEW orders_with_payment_stats SET (security_invoker = true);