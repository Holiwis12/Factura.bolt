export type UserRole = 'global_admin' | 'org_admin' | 'sales' | 'accountant' | 'inventory';

export interface Organization {
  id: string;
  name: string;
  ruc?: string;
  email: string;
  phone?: string;
  address?: string;
  max_users: number;
  max_products: number;
  max_invoices_per_month: number;
  telegram_bot_token?: string;
  telegram_chat_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  organization_id: string;
  name: string;
  tax_id?: string;
  email?: string;
  phone?: string;
  address?: string;
  internal_code?: string;
  telegram_chat_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  organization_id: string;
  code: string;
  name: string;
  description?: string;
  unit: string;
  cost: number;
  price: number;
  stock: number;
  min_stock: number;
  created_at: string;
  updated_at: string;
}
