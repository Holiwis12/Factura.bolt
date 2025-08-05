/*
  # Create companies table and add company_id to products
  1. Creates companies table if not exists
  2. Adds company_id column to products table
  3. Sets up RLS policies
*/

-- First create companies table if it doesn't exist
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

-- Then add company_id to products
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'company_id'
    ) THEN
        ALTER TABLE products 
        ADD COLUMN company_id uuid REFERENCES companies(id);
    END IF;
END $$;

-- Make company_id NOT NULL after adding it
DO $$
BEGIN
    -- First set a default value for existing rows
    UPDATE products 
    SET company_id = (SELECT id FROM companies LIMIT 1)
    WHERE company_id IS NULL;

    -- Then make it NOT NULL
    ALTER TABLE products 
    ALTER COLUMN company_id SET NOT NULL;
EXCEPTION
    WHEN others THEN
        NULL; -- Ignore errors if column is already NOT NULL
END $$;

-- Create RLS policies
CREATE POLICY "Users can view their own company" ON companies
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = companies.id
    )
  );

-- Update products policy
DROP POLICY IF EXISTS "Company users can manage products" ON products;

CREATE POLICY "Company users can manage products" ON products
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = products.company_id
    )
  );