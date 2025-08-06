export const APP_CONFIG = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  storage: {
    userKey: 'billing_user',
    tokenKey: 'billing_token',
  },
  app: {
    name: 'Sistema de Facturación',
    version: '1.0.0',
  }
};
