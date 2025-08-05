export const APP_CONFIG = {
  name: 'FacturaPRO',
  version: '1.0.0',
  api: {
    baseUrl: import.meta.env.VITE_API_URL || '',
    timeout: 10000
  },
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  },
  storage: {
    demoUserKey: 'demo_user',
    themeKey: 'theme_preference',
    authTokenKey: 'auth_token'
  }
} as const;
