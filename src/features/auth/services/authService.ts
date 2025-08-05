import { supabase } from '@/lib/supabase';
import { storage } from '@/lib/utils/storage';
import { APP_CONFIG } from '@/lib/config';
import type { User, AuthResponse, LoginCredentials } from '../types';

const DEMO_USER: User = {
  id: 'demo-user',
  name: 'Usuario Demo',
  email: 'demo@facturapro.com',
  role: 'demo',
  isDemo: true,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      
      if (error) throw error;
      
      return {
        data: data.user as User,
        status: 200,
        token: data.session?.access_token
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Error de autenticación',
        status: 401
      };
    }
  },

  loginDemo: (): AuthResponse => {
    storage.set(APP_CONFIG.storage.demoUserKey, DEMO_USER);
    return {
      data: DEMO_USER,
      status: 200
    };
  },

  logout: async (): Promise<void> => {
    const demoUser = storage.get(APP_CONFIG.storage.demoUserKey);
    
    if (demoUser) {
      storage.remove(APP_CONFIG.storage.demoUserKey);
      return;
    }
    
    await supabase.auth.signOut();
  },

  getCurrentUser: async (): Promise<User | null> => {
    const demoUser = storage.get<User>(APP_CONFIG.storage.demoUserKey);
    if (demoUser) return demoUser;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    return profile ? {
      ...profile,
      email: session.user.email!
    } as User : null;
  }
};
