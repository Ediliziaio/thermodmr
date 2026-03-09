
-- Sequence for order IDs
CREATE SEQUENCE IF NOT EXISTS public.order_id_seq START WITH 1 INCREMENT BY 1;

-- Sequence for preventivo IDs
CREATE SEQUENCE IF NOT EXISTS public.preventivo_id_seq START WITH 1 INCREMENT BY 1;

-- Initialize sequences from existing data
DO $$
DECLARE
  max_ord integer;
  max_prv integer;
BEGIN
  SELECT COALESCE(MAX(
    CASE WHEN id ~ '^ORD-\d{4}-\d{4}$' 
    THEN CAST(substring(id FROM 'ORD-\d{4}-(\d{4})') AS integer) 
    ELSE 0 END
  ), 0) INTO max_ord FROM orders;
  
  SELECT COALESCE(MAX(
    CASE WHEN id ~ '^PRV-\d{4}-\d{4}$' 
    THEN CAST(substring(id FROM 'PRV-\d{4}-(\d{4})') AS integer) 
    ELSE 0 END
  ), 0) INTO max_prv FROM orders;
  
  PERFORM setval('public.order_id_seq', GREATEST(max_ord, 1), max_ord > 0);
  PERFORM setval('public.preventivo_id_seq', GREATEST(max_prv, 1), max_prv > 0);
END $$;

-- RPC to generate next order ID atomically
CREATE OR REPLACE FUNCTION public.generate_next_order_id(p_prefix text DEFAULT 'ORD')
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_year text;
  v_next integer;
BEGIN
  v_year := to_char(CURRENT_DATE, 'YYYY');
  
  IF p_prefix = 'PRV' THEN
    v_next := nextval('public.preventivo_id_seq');
  ELSE
    v_next := nextval('public.order_id_seq');
  END IF;
  
  RETURN p_prefix || '-' || v_year || '-' || lpad(v_next::text, 4, '0');
END;
$$;

-- RPC for atomic update of order lines (delete + insert in transaction)
CREATE OR REPLACE FUNCTION public.update_order_lines_atomic(
  p_order_id text,
  p_lines jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_total numeric := 0;
  v_line jsonb;
  v_subtotal numeric;
  v_after_discount numeric;
  v_with_iva numeric;
BEGIN
  -- Delete existing lines
  DELETE FROM order_lines WHERE ordine_id = p_order_id;
  
  -- Insert new lines and calculate total
  FOR v_line IN SELECT * FROM jsonb_array_elements(p_lines)
  LOOP
    v_subtotal := COALESCE((v_line->>'quantita')::integer, 1) * COALESCE((v_line->>'prezzo_unitario')::numeric, 0);
    v_after_discount := v_subtotal * (1 - COALESCE((v_line->>'sconto')::numeric, 0) / 100);
    v_with_iva := v_after_discount * (1 + COALESCE((v_line->>'iva')::numeric, 0) / 100);
    v_total := v_total + v_with_iva;
    
    INSERT INTO order_lines (ordine_id, categoria, descrizione, quantita, prezzo_unitario, sconto, iva, totale_riga)
    VALUES (
      p_order_id,
      COALESCE(v_line->>'categoria', 'Finestra'),
      COALESCE(v_line->>'descrizione', ''),
      COALESCE((v_line->>'quantita')::integer, 1),
      COALESCE((v_line->>'prezzo_unitario')::numeric, 0),
      COALESCE((v_line->>'sconto')::numeric, 0),
      COALESCE((v_line->>'iva')::numeric, 0),
      v_with_iva
    );
  END LOOP;
  
  -- Update order total
  UPDATE orders SET importo_totale = v_total WHERE id = p_order_id;
  
  RETURN jsonb_build_object('importo_totale', v_total);
END;
$$;
