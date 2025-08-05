// Tipos base compartidos
export type UserRole = 'global_admin' | 'org_admin' | 'sales' | 'accountant' | 'inventory' | 'demo';

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  organization_id?: string;
  is_active: boolean;
  isDemo?: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
