/*
  # Create Companies Table and Fix Products Schema
  1. Create companies table first
  2. Modify products table to include company_id
  3. Set up proper RLS policies
*/

-- First create companies table
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

-- Enable RLS on companies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for companies
CREATE POLICY "Users can view their own company" ON companies
  FOR ALL USING (
    EXISTS (
      SELECT 1 
      FROM auth.users 
      WHERE auth.users.id = auth.uid()
    )
  );

-- Now handle products table
DO $$ 
BEGIN
  -- Create products table if it doesn't exist
  CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id uuid REFERENCES companies(id),
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

  -- Add company_id if table existed but column didn't
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'company_id'
  ) THEN
    ALTER TABLE products ADD COLUMN company_id uuid REFERENCES companies(id);
  END IF;
END $$;

-- Enable RLS on products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create products RLS policy
DROP POLICY IF EXISTS "Company users can manage products" ON products;

CREATE POLICY "Company users can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 
      FROM auth.users 
      WHERE auth.users.id = auth.uid()
    )
  );
