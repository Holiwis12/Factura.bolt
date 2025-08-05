// Tipos para la base de datos completa del sistema SaaS

export interface Company {
  id: string;
  name: string;
  rnc?: string;
  phone?: string;
  address?: string;
  logo_url?: string;
  currency: string;
  timezone: string;
  user_limit: number;
  is_active: boolean;
  subscription_plan: string;
  telegram_bot_token?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  company_id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  unit_price: number;
  cost_price: number;
  stock_quantity: number;
  min_stock: number;
  unit_measure: string;
  barcode?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InventoryMovement {
  id: string;
  company_id: string;
  product_id: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  unit_cost?: number;
  reference_type?: string;
  reference_id?: string;
  notes?: string;
  created_by?: string;
  created_at: string;
}

export interface Quotation {
  id: string;
  company_id: string;
  client_id: string;
  number: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired' | 'converted';
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  valid_until?: string;
  converted_to_invoice_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface QuotationItem {
  product_id: string;
  product_name: string;
  product_code: string;
  quantity: number;
  unit_price: number;
  discount: number;
  total: number;
}

export interface Invoice {
  id: string;
  company_id: string;
  client_id: string;
  number: string;
  ncf?: string;
  status: 'draft' | 'pending' | 'paid' | 'cancelled' | 'overdue';
  payment_terms: string;
  payment_status: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  due_date?: string;
  quotation_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  product_id: string;
  product_name: string;
  product_code: string;
  quantity: number;
  unit_price: number;
  discount: number;
  total: number;
}

export interface AccountingEntry {
  id: string;
  company_id: string;
  entry_number: string;
  date: string;
  description: string;
  reference_type?: string;
  reference_id?: string;
  total_debit: number;
  total_credit: number;
  is_balanced: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
  lines?: AccountingEntryLine[];
}

export interface AccountingEntryLine {
  id: string;
  entry_id: string;
  account_code: string;
  account_name: string;
  description?: string;
  debit: number;
  credit: number;
  created_at: string;
}

export interface TelegramConfig {
  id: string;
  company_id: string;
  bot_token: string;
  default_chat_id?: string;
  webhook_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  company_id: string;
  code: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  rnc?: string;
  telegram_chat_id?: string;
  telegram_username?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SystemLog {
  id: string;
  company_id?: string;
  user_id?: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface POSConfig {
  id: string;
  company_id: string;
  receipt_header?: string;
  receipt_footer?: string;
  auto_print: boolean;
  default_payment_method: string;
  tax_rate: number;
  created_at: string;
  updated_at: string;
}

export interface SystemConfig {
  id: string;
  key: string;
  value: any;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tipos para filtros y búsquedas
export interface BaseFilter {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProductFilter extends BaseFilter {
  category?: string;
  is_active?: boolean;
  low_stock?: boolean;
}

export interface InvoiceFilter extends BaseFilter {
  status?: string;
  client_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface TransactionFilter extends BaseFilter {
  type?: string;
  category?: string;
  date_from?: string;
  date_to?: string;
}
