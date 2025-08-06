/*
  # Create organizations table
  1. New Tables: organizations (id uuid, name text, is_active boolean)
  2. Security: Enable RLS, add policies for authenticated users
*/

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read organizations they belong to" ON organizations
  FOR SELECT TO authenticated
  USING (
    id IN (
      SELECT organization_id 
      FROM profiles 
      WHERE id = auth.uid()
    )
  );
