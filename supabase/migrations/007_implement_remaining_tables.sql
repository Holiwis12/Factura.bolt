/*
  # Implement Remaining Core Tables
  1. Create clients table
  2. Create invoices table with items as JSONB
  3. Create transactions table
  4. Set up proper RLS policies and relationships
*/

-- First create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  name text NOT NULL,
  rnc text,
  email text,
  phone text,
  address text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on clients
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for clients
CREATE POLICY "Users can manage their company's clients" ON clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND EXISTS (
        SELECT 1 FROM companies 
        WHERE companies.id = clients.company_id
      )
    )
  );

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  client_id uuid REFERENCES clients(id) NOT NULL,
  number text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  tax numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  notes text,
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'pending', 'paid', 'cancelled'))
);

-- Create index for invoice number search
CREATE INDEX IF NOT EXISTS idx_invoices_number ON invoices (number);

-- Enable RLS on invoices
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for invoices
CREATE POLICY "Users can manage their company's invoices" ON invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND EXISTS (
        SELECT 1 FROM companies 
        WHERE companies.id = invoices.company_id
      )
    )
  );

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  type text NOT NULL,
  amount numeric(10,2) NOT NULL,
  description text,
  category text,
  date date NOT NULL,
  invoice_id uuid REFERENCES invoices(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_type CHECK (type IN ('income', 'expense', 'transfer'))
);

-- Enable RLS on transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for transactions
CREATE POLICY "Users can manage their company's transactions" ON transactions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND EXISTS (
        SELECT 1 FROM companies 
        WHERE companies.id = transactions.company_id
      )
    )
  );

-- Create useful views
CREATE OR REPLACE VIEW invoice_summary AS
SELECT 
  i.company_id,
  DATE_TRUNC('month', i.created_at) as month,
  i.status,
  COUNT(*) as count,
  SUM(i.total) as total_amount
FROM invoices i
GROUP BY i.company_id, DATE_TRUNC('month', i.created_at), i.status;

CREATE OR REPLACE VIEW transaction_summary AS
SELECT 
  company_id,
  DATE_TRUNC('month', date) as month,
  type,
  category,
  COUNT(*) as count,
  SUM(amount) as total_amount
FROM transactions
GROUP BY company_id, DATE_TRUNC('month', date), type, category;

-- Add useful functions
CREATE OR REPLACE FUNCTION get_company_balance(company_uuid uuid)
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  balance numeric;
BEGIN
  SELECT 
    COALESCE(SUM(
      CASE 
        WHEN type = 'income' THEN amount 
        WHEN type = 'expense' THEN -amount
        ELSE 0
      END
    ), 0) INTO balance
  FROM transactions
  WHERE company_id = company_uuid;
  
  RETURN balance;
END;
$$;

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
    BEFORE UPDATE ON invoices
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
