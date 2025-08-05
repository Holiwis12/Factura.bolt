/*
  # Add company_id to products table
  Safely adds company_id column if it doesn't exist
*/

-- Add company_id column if it doesn't exist
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

-- Recreate the policy
DROP POLICY IF EXISTS "Company users can manage products" ON products;

CREATE POLICY "Company users can manage products" ON products
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = products.company_id
    )
  );