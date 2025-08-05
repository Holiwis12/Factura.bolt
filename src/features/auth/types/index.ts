export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'company' | 'demo';
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
  login: (credentials: LoginCredentials) => Promise<void>;
  loginAsDemo: () => void;
  logout: () => Promise<void>;
}
