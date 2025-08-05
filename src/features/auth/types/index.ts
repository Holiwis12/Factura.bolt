export type AuthUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'sales' | 'accountant' | 'inventory' | 'demo'
  companyId?: string
  isDemo?: boolean
}

export type LoginCredentials = {
  email: string
  password: string
}

export type AuthState = {
  user: AuthUser | null
  loading: boolean
  error: string | null
}

export type AuthContextType = AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>
  loginAsDemo: () => void
  logout: () => Promise<void>
}
