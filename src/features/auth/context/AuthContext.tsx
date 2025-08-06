import { createContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, AuthContextType, LoginCredentials } from '../types';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 Inicializando AuthProvider...');
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      console.log('🔍 Verificando usuario actual...');
      
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        console.log('✅ Usuario encontrado:', currentUser.name);
        setUser(currentUser);
      } else {
        console.log('❌ No hay usuario autenticado');
      }
    } catch (error) {
      console.error('❌ Error inicializando auth:', error);
    } finally {
      setLoading(false);
      console.log('✅ AuthProvider inicializado');
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setLoading(true);
      console.log('🔐 Intentando login...');
      
      const response = await authService.login(credentials);
      
      if (response.error) {
        console.error('❌ Error en login:', response.error);
        throw new Error(response.error);
      }
      
      if (response.data) {
        console.log('✅ Login exitoso:', response.data.name);
        setUser(response.data);
      } else {
        throw new Error('No se recibieron datos del usuario');
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log('🚀 Iniciando modo demo...');
      
      const response = await authService.loginAsDemo();
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        console.log('✅ Demo login exitoso');
        setUser(response.data);
      }
    } catch (error) {
      console.error('❌ Error en demo login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log('🚪 Cerrando sesión...');
      
      await authService.logout();
      setUser(null);
      
      console.log('✅ Logout exitoso');
    } catch (error) {
      console.error('❌ Error en logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    loginAsDemo,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
