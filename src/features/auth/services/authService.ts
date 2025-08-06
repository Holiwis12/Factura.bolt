import { supabase } from '@/lib/supabase';
import { storage } from '@/lib/utils/storage';
import { APP_CONFIG } from '@/lib/config';
import type { User, AuthResponse, LoginCredentials } from '../types';

// Usuarios locales para desarrollo y testing
const LOCAL_USERS = [
  {
    email: 'adminpro',
    password: '@Teamo1110a',
    user: {
      id: 'software-owner-001',
      name: 'Administrador del Software',
      email: 'adminpro@sistema.com',
      role: 'software_owner' as const,
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
      id: 'company-admin-001',
      name: 'Admin Empresa',
      email: 'empresa@test.com',
      role: 'company_admin' as const,
      companyId: 'company-001',
      companyName: 'Empresa Demo',
      isDemo: false,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    email: 'empleado@test.com',
    password: 'empleado123',
    user: {
      id: 'employee-001',
      name: 'Empleado Demo',
      email: 'empleado@test.com',
      role: 'employee' as const,
      companyId: 'company-001',
      companyName: 'Empresa Demo',
      isDemo: false,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }
];

// Usuario demo
const DEMO_USER: User = {
  id: 'demo-user-001',
  name: 'Usuario Demo',
  email: 'demo@sistema.com',
  role: 'company_admin',
  companyId: 'demo-company',
  companyName: 'Empresa Demo',
  isDemo: true,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    console.log('🔐 Iniciando proceso de login...');
    console.log('📧 Email/Usuario:', credentials.email);
    
    try {
      // 1. Verificar usuarios locales primero
      console.log('🔍 Buscando en usuarios locales...');
      const localUser = LOCAL_USERS.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (localUser) {
        console.log('✅ Usuario local encontrado:', localUser.user.name);
        console.log('👤 Rol:', localUser.user.role);
        
        // Guardar en localStorage
        storage.set(APP_CONFIG.storage.userKey, localUser.user);
        
        return {
          data: localUser.user,
          status: 200
        };
      }

      // 2. Si no es usuario local, intentar con Supabase
      console.log('🔄 Intentando autenticación con Supabase...');
      
      // Verificar que tenemos las credenciales de Supabase
      if (!APP_CONFIG.supabase.url || !APP_CONFIG.supabase.anonKey) {
        console.warn('⚠️ Credenciales de Supabase no configuradas');
        throw new Error('Credenciales incorrectas');
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (authError) {
        console.error('❌ Error de autenticación Supabase:', authError.message);
        throw new Error('Credenciales incorrectas');
      }

      if (!authData.user) {
        console.error('❌ No se obtuvo usuario de Supabase');
        throw new Error('Error en la autenticación');
      }

      console.log('✅ Autenticación Supabase exitosa');

      // Obtener perfil del usuario
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
          *,
          organizations (
            id,
            name
          )
        `)
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.warn('⚠️ Error obteniendo perfil, usando datos básicos:', profileError.message);
      }

      const user: User = {
        id: authData.user.id,
        name: profile?.name || authData.user.email!.split('@')[0],
        email: authData.user.email!,
        role: profile?.role || 'employee',
        companyId: profile?.organization_id || null,
        companyName: profile?.organizations?.name || null,
        isDemo: false,
        is_active: profile?.is_active ?? true,
        created_at: authData.user.created_at,
        updated_at: profile?.updated_at || authData.user.updated_at
      };

      // Guardar en localStorage
      storage.set(APP_CONFIG.storage.userKey, user);
      if (authData.session?.access_token) {
        storage.set(APP_CONFIG.storage.tokenKey, authData.session.access_token);
      }

      console.log('✅ Usuario autenticado y guardado:', user.name);

      return {
        data: user,
        status: 200,
        token: authData.session?.access_token
      };

    } catch (error) {
      console.error('❌ Error en login:', error);
      return {
        error: error instanceof Error ? error.message : 'Error al iniciar sesión',
        status: 401
      };
    }
  },

  loginAsDemo: async (): Promise<AuthResponse> => {
    console.log('🚀 Iniciando sesión demo...');
    
    try {
      storage.set(APP_CONFIG.storage.userKey, DEMO_USER);
      console.log('✅ Usuario demo autenticado');
      
      return {
        data: DEMO_USER,
        status: 200
      };
    } catch (error) {
      console.error('❌ Error en login demo:', error);
      return {
        error: 'Error al acceder al modo demo',
        status: 500
      };
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      // Verificar usuario en localStorage
      const storedUser = storage.get<User>(APP_CONFIG.storage.userKey);
      if (storedUser) {
        console.log('👤 Usuario encontrado en localStorage:', storedUser.name);
        return storedUser;
      }

      // Verificar sesión en Supabase
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.log('❌ No hay sesión activa en Supabase');
        return null;
      }

      console.log('✅ Sesión activa en Supabase, obteniendo perfil...');

      // Obtener perfil actualizado
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

      const user: User = {
        id: session.user.id,
        name: profile?.name || session.user.email!.split('@')[0],
        email: session.user.email!,
        role: profile?.role || 'employee',
        companyId: profile?.organization_id || null,
        companyName: profile?.organizations?.name || null,
        isDemo: false,
        is_active: profile?.is_active ?? true,
        created_at: session.user.created_at,
        updated_at: profile?.updated_at || session.user.updated_at
      };

      storage.set(APP_CONFIG.storage.userKey, user);
      return user;
    } catch (error) {
      console.error('❌ Error obteniendo usuario actual:', error);
      return null;
    }
  },

  logout: async (): Promise<void> => {
    try {
      console.log('🚪 Cerrando sesión...');
      
      // Limpiar localStorage
      storage.remove(APP_CONFIG.storage.userKey);
      storage.remove(APP_CONFIG.storage.tokenKey);
      
      // Cerrar sesión en Supabase
      await supabase.auth.signOut();
      
      console.log('✅ Sesión cerrada correctamente');
    } catch (error) {
      console.error('❌ Error cerrando sesión:', error);
    }
  }
};
