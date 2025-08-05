import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authService } from './services/authService'
import type { User, AuthContextType } from './types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      setLoading(true)
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (err) {
      console.error('Auth check failed:', err)
      setError('Error al verificar autenticación')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await authService.login({ email, password })
      
      if (response.data) {
        setUser(response.data)
        return true
      } else {
        setError(response.error || 'Error de autenticación')
        return false
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado'
      setError(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  const loginAsDemo = async (): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await authService.loginAsDemo()
      
      if (response.data) {
        setUser(response.data)
        return true
      } else {
        setError(response.error || 'Error al acceder al modo demo')
        return false
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado'
      setError(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      setLoading(true)
      await authService.logout()
      setUser(null)
      setError(null)
    } catch (err) {
      console.error('Logout failed:', err)
      setError('Error al cerrar sesión')
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    loginAsDemo,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
