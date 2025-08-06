import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType, ROLE_PERMISSIONS, UserPermissions } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Credenciales del Software Owner
      if (email === 'adminpro' && password === '@Teamo1110a') {
        const userData: User = {
          id: 'software-owner-001',
          name: 'Software Owner',
          email: 'admin@sistema.com',
          role: 'software_owner',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          permissions: ROLE_PERMISSIONS.software_owner
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }

      // Credenciales de Company Owner
      if (email === 'empresa@test.com' && password === 'empresa123') {
        const userData: User = {
          id: 'company-owner-001',
          name: 'María González',
          email: 'empresa@test.com',
          role: 'company_owner',
          companyId: 'company-001',
          companyName: 'Empresa Demo S.A.C.',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          permissions: ROLE_PERMISSIONS.company_owner
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }

      // Credenciales de Empleado - SIN DEMO
      if (email === 'empleado@test.com' && password === 'empleado123') {
        const userData: User = {
          id: 'employee-001',
          name: 'Carlos Vendedor',
          email: 'empleado@test.com',
          role: 'employee',
          companyId: 'company-001',
          companyName: 'Empresa Demo S.A.C.',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          permissions: ROLE_PERMISSIONS.vendedor // Rol específico de vendedor
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }

      setError('Credenciales incorrectas');
      return false;
    } catch (error) {
      setError('Error del sistema');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // SOLO Company Owner puede acceder al demo
      const userData: User = {
        id: 'demo-user-001',
        name: 'María González',
        email: 'demo@empresa.com',
        role: 'demo',
        companyId: 'demo-company',
        companyName: 'Empresa Demo S.A.C.',
        isDemo: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        permissions: ROLE_PERMISSIONS.company_owner // Permisos de company owner
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (error) {
      setError('Error en modo demo');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: keyof UserPermissions): boolean => {
    if (!user?.permissions) return false;
    return user.permissions[permission] === true;
  };

  const hasModuleAccess = (module: keyof UserPermissions): boolean => {
    if (!user?.permissions) return false;
    return user.permissions[module] === true;
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    loginAsDemo,
    logout,
    hasPermission,
    hasModuleAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
