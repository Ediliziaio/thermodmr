-- Aggiungere il valore 'preventivo' all'enum order_status prima di 'da_confermare'
ALTER TYPE order_status ADD VALUE 'preventivo' BEFORE 'da_confermare';

-- Aggiungere colonna data_scadenza_preventivo alla tabella orders
ALTER TABLE public.orders ADD COLUMN data_scadenza_preventivo date;