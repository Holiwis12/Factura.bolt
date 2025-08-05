/*
  # Sistema SaaS Completo - Multi-tenant con Telegram y IA-ready
  1. Estructura completa multi-empresa
  2. Gestión de usuarios por empresa
  3. Sistema de facturación JSON
  4. Inventario y contabilidad
  5. Integración Telegram
  6. Endpoints IA-ready
*/

-- Crear tabla de configuración del sistema
CREATE TABLE IF NOT EXISTS system_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Actualizar tabla de empresas con más campos
ALTER TABLE companies ADD COLUMN IF NOT EXISTS rnc text;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS logo_url text;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS currency text DEFAULT 'DOP';
ALTER TABLE companies ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'America/Santo_Domingo';
ALTER TABLE companies ADD COLUMN IF NOT EXISTS user_limit integer DEFAULT 5;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS subscription_plan text DEFAULT 'basic';
ALTER TABLE companies ADD COLUMN IF NOT EXISTS telegram_bot_token text;

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  code text NOT NULL,
  name text NOT NULL,
  description text,
  category text,
  unit_price numeric(10,2) NOT NULL DEFAULT 0,
  cost_price numeric(10,2) NOT NULL DEFAULT 0,
  stock_quantity integer NOT NULL DEFAULT 0,
  min_stock integer DEFAULT 0,
  unit_measure text DEFAULT 'unidad',
  barcode text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, code)
);

-- Crear tabla de movimientos de inventario
CREATE TABLE IF NOT EXISTS inventory_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  type text NOT NULL, -- 'in', 'out', 'adjustment'
  quantity integer NOT NULL,
  unit_cost numeric(10,2),
  reference_type text, -- 'invoice', 'purchase', 'adjustment'
  reference_id uuid,
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_movement_type CHECK (type IN ('in', 'out', 'adjustment'))
);

-- Crear tabla de cotizaciones
CREATE TABLE IF NOT EXISTS quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  client_id uuid REFERENCES clients(id) NOT NULL,
  number text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  tax numeric(10,2) NOT NULL DEFAULT 0,
  discount numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  notes text,
  valid_until date,
  converted_to_invoice_id uuid REFERENCES invoices(id),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_quotation_status CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired', 'converted'))
);

-- Actualizar tabla de facturas con más campos
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS ncf text;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS payment_terms text DEFAULT 'immediate';
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending';
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS discount numeric(10,2) DEFAULT 0;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS quotation_id uuid REFERENCES quotations(id);

-- Actualizar constraint de status de facturas
ALTER TABLE invoices DROP CONSTRAINT IF EXISTS valid_status;
ALTER TABLE invoices ADD CONSTRAINT valid_invoice_status CHECK (status IN ('draft', 'pending', 'paid', 'cancelled', 'overdue'));

-- Crear tabla de asientos contables
CREATE TABLE IF NOT EXISTS accounting_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  entry_number text NOT NULL,
  date date NOT NULL,
  description text NOT NULL,
  reference_type text, -- 'invoice', 'payment', 'expense', 'manual'
  reference_id uuid,
  total_debit numeric(10,2) NOT NULL DEFAULT 0,
  total_credit numeric(10,2) NOT NULL DEFAULT 0,
  is_balanced boolean GENERATED ALWAYS AS (total_debit = total_credit) STORED,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de líneas de asientos contables
CREATE TABLE IF NOT EXISTS accounting_entry_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id uuid REFERENCES accounting_entries(id) ON DELETE CASCADE,
  account_code text NOT NULL,
  account_name text NOT NULL,
  description text,
  debit numeric(10,2) DEFAULT 0,
  credit numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_debit_credit CHECK ((debit > 0 AND credit = 0) OR (credit > 0 AND debit = 0))
);

-- Crear tabla de configuración de Telegram por empresa
CREATE TABLE IF NOT EXISTS telegram_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL UNIQUE,
  bot_token text NOT NULL,
  default_chat_id text,
  webhook_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Actualizar tabla de clientes con Telegram
ALTER TABLE clients ADD COLUMN IF NOT EXISTS telegram_chat_id text;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS telegram_username text;

-- Crear tabla de logs del sistema
CREATE TABLE IF NOT EXISTS system_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de configuración de punto de venta
CREATE TABLE IF NOT EXISTS pos_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL UNIQUE,
  receipt_header text,
  receipt_footer text,
  auto_print boolean DEFAULT false,
  default_payment_method text DEFAULT 'cash',
  tax_rate numeric(5,2) DEFAULT 18.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear índices para optimización
CREATE INDEX IF NOT EXISTS idx_products_company_id ON products(company_id);
CREATE INDEX IF NOT EXISTS idx_products_code ON products(company_id, code);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_product ON inventory_movements(product_id);
CREATE INDEX IF NOT EXISTS idx_quotations_company_id ON quotations(company_id);
CREATE INDEX IF NOT EXISTS idx_quotations_number ON quotations(company_id, number);
CREATE INDEX IF NOT EXISTS idx_accounting_entries_company ON accounting_entries(company_id);
CREATE INDEX IF NOT EXISTS idx_system_logs_company ON system_logs(company_id);
CREATE INDEX IF NOT EXISTS idx_system_logs_user ON system_logs(user_id);

-- Habilitar RLS en todas las tablas
ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting_entry_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE telegram_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pos_config ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para system_config (solo admin global)
CREATE POLICY "Only global admins can manage system config" ON system_config
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'global_admin'
    )
  );

-- Políticas RLS para productos
CREATE POLICY "Users can manage their company's products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.organization_id = products.company_id
    )
  );

-- Políticas RLS para movimientos de inventario
CREATE POLICY "Users can manage their company's inventory movements" ON inventory_movements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.organization_id = inventory_movements.company_id
    )
  );

-- Políticas RLS para cotizaciones
CREATE POLICY "Users can manage their company's quotations" ON quotations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.organization_id = quotations.company_id
    )
  );

-- Políticas RLS para asientos contables
CREATE POLICY "Users can manage their company's accounting entries" ON accounting_entries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.organization_id = accounting_entries.company_id
    )
  );

-- Políticas RLS para líneas de asientos
CREATE POLICY "Users can manage their company's accounting entry lines" ON accounting_entry_lines
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM accounting_entries ae
      JOIN profiles p ON p.id = auth.uid()
      WHERE ae.id = accounting_entry_lines.entry_id
      AND p.organization_id = ae.company_id
    )
  );

-- Políticas RLS para configuración de Telegram
CREATE POLICY "Users can manage their company's telegram config" ON telegram_config
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.organization_id = telegram_config.company_id
    )
  );

-- Políticas RLS para logs del sistema
CREATE POLICY "Users can view their company's logs" ON system_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND (profiles.organization_id = system_logs.company_id OR profiles.role = 'global_admin')
    )
  );

-- Políticas RLS para configuración POS
CREATE POLICY "Users can manage their company's POS config" ON pos_config
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.organization_id = pos_config.company_id
    )
  );

-- Funciones útiles para el sistema

-- Función para obtener el siguiente número de factura
CREATE OR REPLACE FUNCTION get_next_invoice_number(company_uuid uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  next_number integer;
  formatted_number text;
BEGIN
  -- Obtener el siguiente número
  SELECT COALESCE(MAX(CAST(SUBSTRING(number FROM '[0-9]+') AS integer)), 0) + 1
  INTO next_number
  FROM invoices
  WHERE company_id = company_uuid
  AND number ~ '^[0-9]+$';
  
  -- Formatear con ceros a la izquierda
  formatted_number := LPAD(next_number::text, 8, '0');
  
  RETURN formatted_number;
END;
$$;

-- Función para obtener el siguiente número de cotización
CREATE OR REPLACE FUNCTION get_next_quotation_number(company_uuid uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  next_number integer;
  formatted_number text;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(number FROM '[0-9]+') AS integer)), 0) + 1
  INTO next_number
  FROM quotations
  WHERE company_id = company_uuid
  AND number ~ '^COT-[0-9]+$';
  
  formatted_number := 'COT-' || LPAD(next_number::text, 6, '0');
  
  RETURN formatted_number;
END;
$$;

-- Función para actualizar stock de producto
CREATE OR REPLACE FUNCTION update_product_stock(
  product_uuid uuid,
  quantity_change integer,
  movement_type text,
  reference_type text DEFAULT NULL,
  reference_uuid uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  company_uuid uuid;
  current_stock integer;
BEGIN
  -- Obtener información del producto
  SELECT company_id, stock_quantity INTO company_uuid, current_stock
  FROM products
  WHERE id = product_uuid;
  
  -- Actualizar stock
  UPDATE products
  SET stock_quantity = stock_quantity + quantity_change,
      updated_at = now()
  WHERE id = product_uuid;
  
  -- Registrar movimiento
  INSERT INTO inventory_movements (
    company_id,
    product_id,
    type,
    quantity,
    reference_type,
    reference_id,
    created_by
  ) VALUES (
    company_uuid,
    product_uuid,
    movement_type,
    ABS(quantity_change),
    reference_type,
    reference_uuid,
    auth.uid()
  );
END;
$$;

-- Función para crear asiento contable automático
CREATE OR REPLACE FUNCTION create_automatic_accounting_entry(
  company_uuid uuid,
  entry_description text,
  ref_type text,
  ref_id uuid,
  debit_account text,
  debit_amount numeric,
  credit_account text,
  credit_amount numeric
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  entry_id uuid;
  entry_num text;
BEGIN
  -- Generar número de asiento
  SELECT 'AST-' || LPAD((COALESCE(MAX(CAST(SUBSTRING(entry_number FROM '[0-9]+') AS integer)), 0) + 1)::text, 6, '0')
  INTO entry_num
  FROM accounting_entries
  WHERE company_id = company_uuid;
  
  -- Crear asiento
  INSERT INTO accounting_entries (
    company_id,
    entry_number,
    date,
    description,
    reference_type,
    reference_id,
    total_debit,
    total_credit,
    created_by
  ) VALUES (
    company_uuid,
    entry_num,
    CURRENT_DATE,
    entry_description,
    ref_type,
    ref_id,
    debit_amount,
    credit_amount,
    auth.uid()
  ) RETURNING id INTO entry_id;
  
  -- Crear líneas del asiento
  INSERT INTO accounting_entry_lines (entry_id, account_code, account_name, description, debit, credit)
  VALUES 
    (entry_id, debit_account, debit_account, entry_description, debit_amount, 0),
    (entry_id, credit_account, credit_account, entry_description, 0, credit_amount);
  
  RETURN entry_id;
END;
$$;

-- Triggers para updated_at
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_quotations_updated_at
    BEFORE UPDATE ON quotations
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_accounting_entries_updated_at
    BEFORE UPDATE ON accounting_entries
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_telegram_config_updated_at
    BEFORE UPDATE ON telegram_config
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_pos_config_updated_at
    BEFORE UPDATE ON pos_config
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Insertar configuración inicial del sistema
INSERT INTO system_config (key, value, description) VALUES
  ('app_name', '"Sistema de Facturación SaaS"', 'Nombre de la aplicación'),
  ('app_version', '"1.0.0"', 'Versión actual del sistema'),
  ('default_currency', '"DOP"', 'Moneda por defecto'),
  ('default_tax_rate', '18.00', 'Tasa de impuesto por defecto (%)'),
  ('max_companies', '100', 'Máximo número de empresas permitidas'),
  ('default_user_limit', '5', 'Límite por defecto de usuarios por empresa')
ON CONFLICT (key) DO NOTHING;
