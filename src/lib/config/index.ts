export const APP_CONFIG = {
  app: {
    name: 'FacturaPro',
    version: '1.0.0',
    description: 'Sistema de Facturación y Contabilidad'
  },
  
  storage: {
    demoUserKey: 'facturapro_demo_user',
    demoDataKey: 'facturapro_demo_data'
  },
  
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000
  },
  
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  },
  
  demo: {
    credentials: {
      email: 'demo@empresa.com',
      password: 'demo123'
    },
    company: {
      name: 'Empresa Demo S.A.C.',
      ruc: '20123456789'
    }
  }
} as const;
