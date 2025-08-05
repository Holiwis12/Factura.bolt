export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'company';
  companyId?: string | null;
  companyName?: string | null;
  isDemo?: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginAsDemo: () => Promise<void>;
  logout: () => Promise<void>;
}
