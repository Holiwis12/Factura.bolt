import { createClient } from '@supabase/supabase-js';
import { APP_CONFIG } from './config';

console.log('🔧 Configurando Supabase...');
console.log('📍 URL:', APP_CONFIG.supabase.url);
console.log('🔑 Anon Key:', APP_CONFIG.supabase.anonKey ? 'Configurada' : 'No configurada');

if (!APP_CONFIG.supabase.url || !APP_CONFIG.supabase.anonKey) {
  console.warn('⚠️ Credenciales de Supabase no configuradas, usando modo local');
}

export const supabase = createClient(
  APP_CONFIG.supabase.url || 'https://placeholder.supabase.co',
  APP_CONFIG.supabase.anonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Verificador de conexión
export const verifySupabaseConnection = async () => {
  try {
    if (!APP_CONFIG.supabase.url || !APP_CONFIG.supabase.anonKey) {
      console.log('⚠️ Supabase no configurado, usando modo local');
      return false;
    }

    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) {
      console.warn('⚠️ Error conectando a Supabase:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection verified');
    return true;
  } catch (error) {
    console.warn('⚠️ Supabase connection error:', error);
    return false;
  }
};

// Verificar conexión al inicializar
verifySupabaseConnection();
