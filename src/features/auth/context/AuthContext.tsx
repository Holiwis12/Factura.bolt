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
      const user = await authService.getCurrentUser();
      setState(prev => ({ ...prev, user, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error al verificar autenticación',
        loading: false
      }));
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const response = await authService.login(credentials);
    
    if (response.error) {
      setState(prev => ({
        ...prev,
        error: response.error,
        loading: false
      }));
      throw new Error(response.error);
    }

    setState(prev => ({
      ...prev,
      user: response.data!,
      loading: false
    }));
  };

  const loginAsDemo = () => {
    const response = authService.loginDemo();
    setState(prev => ({
      ...prev,
      user: response.data!,
      loading: false
    }));
  };

  const logout = async () => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      await authService.logout();
      setState({ ...initialState, loading: false });
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
