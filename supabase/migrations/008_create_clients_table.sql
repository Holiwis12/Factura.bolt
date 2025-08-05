/*
  # Create Clients Table
  1. Create basic clients table structure
  2. Add company_id column
  3. Set up RLS policies
*/

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rnc text,
  email text,
  phone text,
  address text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add company_id column separately
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS company_id uuid REFERENCES companies(id);

-- Make company_id NOT NULL
ALTER TABLE clients 
ALTER COLUMN company_id SET NOT NULL;

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create RLS policy
CREATE POLICY "Users can manage their company's clients" ON clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 
      FROM auth.users
      JOIN companies ON true  -- Simple join to verify company exists
      WHERE auth.users.id = auth.uid()
      AND companies.id = clients.company_id
    )
  );

-- Add updated_at trigger
CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
