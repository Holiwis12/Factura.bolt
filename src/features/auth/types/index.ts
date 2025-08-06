export interface User {
  id: string;
  name: string;
  email: string;
  role: 'software_owner' | 'company_admin' | 'employee';
  companyId: string | null;
  companyName: string | null;
  isDemo: boolean;
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

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginAsDemo: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}
