export interface User {
  id: string;
  name: string;
  email: string;
  role: 'software_owner' | 'company_owner' | 'manager' | 'employee' | 'demo';
  companyId?: string | null;
  companyName?: string | null;
  isDemo?: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  data?: User;
  error?: string;
  status: number;
  token?: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  loginAsDemo: () => Promise<void>;
  logout: () => Promise<void>;
}
