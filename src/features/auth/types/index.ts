export interface User {
  id: string;
  name: string;
  email: string;
  role: 'software_owner' | 'company_owner' | 'employee' | 'demo';
  companyId?: string;
  companyName?: string;
  isDemo?: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthResponse {
  data?: User;
  error?: string;
  status: number;
  token?: string;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: () => Promise<boolean>;
  logout: () => Promise<void>;
}
