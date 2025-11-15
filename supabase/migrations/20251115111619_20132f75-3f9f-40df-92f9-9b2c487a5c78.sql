-- Add ON UPDATE CASCADE to all foreign keys referencing orders.id

-- Drop and recreate foreign key for order_lines
ALTER TABLE order_lines 
DROP CONSTRAINT IF EXISTS order_lines_ordine_id_fkey;

ALTER TABLE order_lines
ADD CONSTRAINT order_lines_ordine_id_fkey 
FOREIGN KEY (ordine_id) 
REFERENCES orders(id) 
ON UPDATE CASCADE 
ON DELETE CASCADE;

-- Drop and recreate foreign key for payments
ALTER TABLE payments 
DROP CONSTRAINT IF EXISTS payments_ordine_id_fkey;

ALTER TABLE payments
ADD CONSTRAINT payments_ordine_id_fkey 
FOREIGN KEY (ordine_id) 
REFERENCES orders(id) 
ON UPDATE CASCADE 
ON DELETE CASCADE;

-- Drop and recreate foreign key for commissions
ALTER TABLE commissions 
DROP CONSTRAINT IF EXISTS commissions_ordine_id_fkey;

ALTER TABLE commissions
ADD CONSTRAINT commissions_ordine_id_fkey 
FOREIGN KEY (ordine_id) 
REFERENCES orders(id) 
ON UPDATE CASCADE 
ON DELETE CASCADE;

-- Drop and recreate foreign key for attachments
ALTER TABLE attachments 
DROP CONSTRAINT IF EXISTS attachments_ordine_id_fkey;

ALTER TABLE attachments
ADD CONSTRAINT attachments_ordine_id_fkey 
FOREIGN KEY (ordine_id) 
REFERENCES orders(id) 
ON UPDATE CASCADE 
ON DELETE CASCADE;