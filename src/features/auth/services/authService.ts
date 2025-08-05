import { supabase } from '@/lib/supabase';
import { storage } from '@/lib/utils/storage';
import { APP_CONFIG } from '@/lib/config';
import type { User, AuthResponse, LoginCredentials } from '../types';

// Usuario demo de empresa completamente local
const DEMO_COMPANY_USER: User = {
  id: 'demo-company-001',
  name: 'María González',
  email: 'demo@empresa.com',
  role: 'company',
  companyId: 'company-demo-001',
  companyName: 'Empresa Demo S.A.C.',
  isDemo: true,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Usuarios locales para desarrollo
const LOCAL_USERS = [
  {
    email: 'admin@sistema.com',
    password: 'admin123',
    user: {
      id: 'admin-001',
      name: 'Administrador Sistema',
      email: 'admin@sistema.com',
      role: 'admin' as const,
      companyId: null,
      companyName: null,
      isDemo: false,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    email: 'empresa@test.com',
    password: 'empresa123',
    user: {
      id: 'company-001',
      name: 'Usuario Empresa',
      email: 'empresa@test.com',
      role: 'company' as const,
      companyId: 'company-001',
      companyName: 'Empresa Test S.A.C.',
      isDemo: false,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
];

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      // Simular delay para UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Buscar usuario local primero
      const localUser = LOCAL_USERS.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (localUser) {
        return {
          data: localUser.user,
          status: 200
        };
      }

      // Si no es usuario local, intentar con Supabase
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      
      if (error) throw error;
      
      // Obtener perfil del usuario
      const { data: profile } = await supabase
        .from('profiles')
        .select(`
          *,
          organizations (
            id,
            name
          )
        `)
        .eq('id', data.user.id)
        .single();

      const user: User = {
        id: data.user.id,
        name: profile?.name || data.user.email!,
        email: data.user.email!,
        role: profile?.role || 'company',
        companyId: profile?.organization_id,
        companyName: profile?.organizations?.name,
        isDemo: false,
        is_active: profile?.is_active ?? true,
        created_at: data.user.created_at,
        updated_at: profile?.updated_at || data.user.updated_at || new Date().toISOString()
      };
      
      return {
        data: user,
        status: 200,
        token: data.session?.access_token
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Credenciales inválidas',
        status: 401
      };
    }
  },

  loginAsDemo: async (): Promise<AuthResponse> => {
    try {
      // Simular delay para UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Guardar usuario demo en localStorage
      storage.set(APP_CONFIG.storage.demoUserKey, DEMO_COMPANY_USER);
      
      return {
        data: DEMO_COMPANY_USER,
        status: 200
      };
    } catch (error) {
      return {
        error: 'Error al acceder al modo demo',
        status: 500
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      // Verificar si es usuario demo
      const demoUser = storage.get(APP_CONFIG.storage.demoUserKey);
      
      if (demoUser) {
        // Solo limpiar localStorage para usuario demo
        storage.remove(APP_CONFIG.storage.demoUserKey);
        return;
      }
      
      // Cerrar sesión de Supabase para usuarios reales
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      // Primero verificar si hay usuario demo en localStorage
      const demoUser = storage.get<User>(APP_CONFIG.storage.demoUserKey);
      if (demoUser) {
        return demoUser;
      }

      // Si no es demo, verificar sesión de Supabase
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      // Obtener perfil del usuario real
      const { data: profile } = await supabase
        .from('profiles')
        .select(`
          *,
          organizations (
            id,
            name
          )
        `)
        .eq('id', session.user.id)
        .single();

      if (!profile) return null;

      return {
        id: session.user.id,
        name: profile.name,
        email: session.user.email!,
        role: profile.role,
        companyId: profile.organization_id,
        companyName: profile.organizations?.name,
        isDemo: false,
        is_active: profile.is_active,
        created_at: session.user.created_at,
        updated_at: profile.updated_at
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
};
