-- Trigger per aggiornamento automatico stato ordine dopo pagamento acconto
CREATE OR REPLACE FUNCTION update_order_status_on_payment()
RETURNS TRIGGER AS $$
DECLARE
  order_record RECORD;
  total_paid numeric;
BEGIN
  -- Recupera info ordine
  SELECT * INTO order_record FROM orders WHERE id = NEW.ordine_id;
  
  -- Calcola totale pagato per questo ordine
  SELECT COALESCE(SUM(importo), 0) INTO total_paid
  FROM payments WHERE ordine_id = NEW.ordine_id;
  
  -- Se è stato pagato l'acconto e ordine è in "da_pagare_acconto", passa a "in_lavorazione"
  IF order_record.stato = 'da_pagare_acconto' 
     AND total_paid >= order_record.importo_acconto THEN
    UPDATE orders 
    SET stato = 'in_lavorazione', updated_at = now()
    WHERE id = NEW.ordine_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Crea il trigger
DROP TRIGGER IF EXISTS trigger_update_order_on_payment ON payments;
CREATE TRIGGER trigger_update_order_on_payment
  AFTER INSERT ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_order_status_on_payment();

-- Trigger per calcolo automatico provvigioni quando ordine diventa "consegnato"
CREATE OR REPLACE FUNCTION calculate_commission_on_delivery()
RETURNS TRIGGER AS $$
DECLARE
  commission_percentage numeric;
BEGIN
  -- Solo se l'ordine passa a "consegnato" e non era già consegnato
  IF NEW.stato = 'consegnato' AND (OLD.stato IS NULL OR OLD.stato != 'consegnato') THEN
    -- Verifica che non esista già una provvigione per questo ordine
    IF NOT EXISTS (SELECT 1 FROM commissions WHERE ordine_id = NEW.id) THEN
      -- Recupera percentuale personalizzata del dealer o usa default 3%
      SELECT COALESCE(commissione_personalizzata, 3.0) INTO commission_percentage
      FROM dealers WHERE id = NEW.dealer_id;
      
      -- Inserisci provvigione
      INSERT INTO commissions (
        ordine_id,
        commerciale_id,
        base_calcolo,
        percentuale,
        importo_calcolato,
        stato_liquidazione
      ) VALUES (
        NEW.id,
        NEW.commerciale_id,
        'totale',
        commission_percentage,
        NEW.importo_totale * commission_percentage / 100,
        'dovuta'
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Crea il trigger
DROP TRIGGER IF EXISTS trigger_calculate_commission ON orders;
CREATE TRIGGER trigger_calculate_commission
  AFTER INSERT OR UPDATE OF stato ON orders
  FOR EACH ROW
  EXECUTE FUNCTION calculate_commission_on_delivery();