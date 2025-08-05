/*
  # Fix Products Schema and RLS Policies
  1. Ensure company_id exists in products table
  2. Update RLS policies to work with existing schema
*/

-- First check if products table exists and create if not
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

-- Add company_id if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'company_id'
  ) THEN
    ALTER TABLE products ADD COLUMN company_id uuid REFERENCES companies(id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Company users can manage products" ON products;

-- Create new policy
CREATE POLICY "Company users can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 
      FROM users 
      WHERE users.id = auth.uid() 
      AND users.company_id = products.company_id
    )
  );
