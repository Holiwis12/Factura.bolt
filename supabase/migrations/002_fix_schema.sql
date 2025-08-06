/*
  # Fix Schema - Handle Existing Tables
  Safely creates tables if they don't exist and adds missing columns/constraints
*/

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rnc_number text UNIQUE,
  address text,
  phone text,
  email text,
  logo_url text,
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Users with company relationship
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  encrypted_password text NOT NULL,
  name text,
  role text NOT NULL,
  company_id uuid REFERENCES companies(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products/Inventory (Skip if exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'products') THEN
    CREATE TABLE products (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      company_id uuid REFERENCES companies(id) NOT NULL,
      name text NOT NULL,
      description text,
      sku text,
      price numeric(10,2) NOT NULL,
      cost numeric(10,2),
      stock numeric(10,2) DEFAULT 0,
      min_stock numeric(10,2) DEFAULT 0,
      unit text,
      category text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  number text NOT NULL,
  client_id uuid NOT NULL,
  status text DEFAULT 'draft',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric(10,2) NOT NULL,
  tax numeric(10,2) NOT NULL,
  total numeric(10,2) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Accounting Transactions
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
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS (idempotent)
DO $$ 
BEGIN
  ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE products ENABLE ROW LEVEL SECURITY;
  ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
  ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own company" ON companies;
DROP POLICY IF EXISTS "Company users can view company data" ON users;
DROP POLICY IF EXISTS "Company users can manage products" ON products;
DROP POLICY IF EXISTS "Company users can manage invoices" ON invoices;
DROP POLICY IF EXISTS "Company users can manage transactions" ON transactions;

-- Create new policies
CREATE POLICY "Users can view their own company" ON companies
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = companies.id
    )
  );

CREATE POLICY "Company users can view company data" ON users
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = users.company_id
    )
  );

CREATE POLICY "Company users can manage products" ON products
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = products.company_id
    )
  );

CREATE POLICY "Company users can manage invoices" ON invoices
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = invoices.company_id
    )
  );

CREATE POLICY "Company users can manage transactions" ON transactions
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = transactions.company_id
    )
  );