import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { User } from '@supabase/supabase-js'

type AuthUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'sales' | 'accountant' | 'inventory' | 'demo'
  isDemo?: boolean
}

const DEMO_USER: AuthUser = {
  id: 'demo-user',
  name: 'Usuario Demo',
  email: 'demo@facturapro.com',
  role: 'demo',
  isDemo: true
}

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  loginAsDemo: () => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for demo user in localStorage
    const savedUser = localStorage.getItem('demoUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setLoading(false)
      return
    }

    // Check active Supabase sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserData(session.user)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserData(session.user)
      } else {
        setUser(null)
        localStorage.removeItem('demoUser')
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const setUserData = async (authUser: User) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single()

    setUser({
      id: authUser.id,
      email: authUser.email!,
      name: profile?.name || 'Usuario',
      role: profile?.role || 'admin'
    })
  }

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
  }

  const loginAsDemo = () => {
    setUser(DEMO_USER)
    localStorage.setItem('demoUser', JSON.stringify(DEMO_USER))
  }

  const logout = async () => {
    if (user?.isDemo) {
      setUser(null)
      localStorage.removeItem('demoUser')
      return
    }
    
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
