import { createContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import type { AuthContextType, AuthState, LoginCredentials } from '../types';

export const AuthContext = createContext<AuthContextType | null>(null);

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('🔍 Verificando autenticación...');
      const user = await authService.getCurrentUser();
      console.log('👤 Usuario actual:', user?.role || 'ninguno');
      setState(prev => ({ ...prev, user, loading: false }));
    } catch (error) {
      console.log('❌ Error verificando auth:', error);
      setState(prev => ({
        ...prev,
        error: 'Error al verificar autenticación',
        loading: false
      }));
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('🚀 Iniciando login...');
      const response = await authService.login(credentials);
      
      if (response.error) {
        setState(prev => ({
          ...prev,
          error: response.error,
          loading: false
        }));
        throw new Error(response.error);
      }

      console.log('✅ Login exitoso:', response.data?.role);
      setState(prev => ({
        ...prev,
        user: response.data!,
        loading: false
      }));
    } catch (error) {
      console.log('❌ Error en login:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error al iniciar sesión',
        loading: false
      }));
      throw error;
    }
  };

  const loginAsDemo = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('🚀 Iniciando demo...');
      const response = await authService.loginAsDemo();
      
      if (response.error) {
        setState(prev => ({
          ...prev,
          error: response.error,
          loading: false
        }));
        throw new Error(response.error);
      }

      console.log('✅ Demo exitoso');
      setState(prev => ({
        ...prev,
        user: response.data!,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error al acceder al modo demo',
        loading: false
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      console.log('🚪 Cerrando sesión...');
      await authService.logout();
      setState({ ...initialState, loading: false });
      console.log('✅ Sesión cerrada');
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error al cerrar sesión',
        loading: false
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginAsDemo,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
