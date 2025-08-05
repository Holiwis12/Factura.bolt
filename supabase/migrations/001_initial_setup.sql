/*
  # Initial Setup - Core System Tables
  1. Organizations (tenants)
  2. Users with role-based access
  3. Basic RLS policies
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations (Tenants)
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  ruc text UNIQUE,
  email text UNIQUE,
  phone text,
  address text,
  max_users integer DEFAULT 5,
  max_products integer DEFAULT 1000,
  max_invoices_per_month integer DEFAULT 1000,
  telegram_bot_token text,
  telegram_chat_id text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Organization Members (Users + Roles)
CREATE TYPE user_role AS ENUM ('global_admin', 'org_admin', 'sales', 'accountant', 'inventory');

CREATE TABLE IF NOT EXISTS organization_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid REFERENCES organizations(id),
  user_id uuid REFERENCES auth.users(id),
  role user_role NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Clients
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid REFERENCES organizations(id),
  name text NOT NULL,
  tax_id text,
  email text,
  phone text,
  address text,
  internal_code text,
  telegram_chat_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, tax_id)
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid REFERENCES organizations(id),
  code text NOT NULL,
  name text NOT NULL,
  description text,
  unit text NOT NULL,
  cost decimal(12,2) DEFAULT 0,
  price decimal(12,2) DEFAULT 0,
  stock decimal(12,2) DEFAULT 0,
  min_stock decimal(12,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, code)
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Organizations: Only global admins can manage
CREATE POLICY "Global admins can manage organizations"
ON organizations
USING (
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE user_id = auth.uid()
    AND role = 'global_admin'
  )
);

-- Organization Members: Organization admins can manage their org's members
CREATE POLICY "Org admins can manage members"
ON organization_members
USING (
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE user_id = auth.uid()
    AND organization_id = organization_members.organization_id
    AND role = 'org_admin'
  )
);

-- Clients: Users can only access their organization's clients
CREATE POLICY "Users can access their org's clients"
ON clients
USING (
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE user_id = auth.uid()
    AND organization_id = clients.organization_id
    AND is_active = true
  )
);

-- Products: Users can only access their organization's products
CREATE POLICY "Users can access their org's products"
ON products
USING (
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE user_id = auth.uid()
    AND organization_id = products.organization_id
    AND is_active = true
  )
);

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_organization_members_updated_at
  BEFORE UPDATE ON organization_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();