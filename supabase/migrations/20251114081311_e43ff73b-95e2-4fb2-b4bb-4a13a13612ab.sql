-- Add performance indexes for commerciali and payments queries
CREATE INDEX IF NOT EXISTS idx_payments_data_pagamento ON payments(data_pagamento DESC);
CREATE INDEX IF NOT EXISTS idx_payments_ordine_id ON payments(ordine_id);
CREATE INDEX IF NOT EXISTS idx_dealers_commerciale_owner_id ON dealers(commerciale_owner_id);
CREATE INDEX IF NOT EXISTS idx_orders_commerciale_id ON orders(commerciale_id);
CREATE INDEX IF NOT EXISTS idx_commissions_commerciale_id ON commissions(commerciale_id);

-- Add is_active field to profiles for better user management
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;