import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  Server,
  Zap
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import type { Company, SystemLog } from '../../../lib/types/database';

interface DashboardStats {
  totalCompanies: number;
  activeCompanies: number;
  totalUsers: number;
  totalInvoices: number;
  monthlyRevenue: number;
  recentActivity: number;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [recentLogs, setRecentLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalCompanies: 0,
    activeCompanies: 0,
    totalUsers: 0,
    totalInvoices: 0,
    monthlyRevenue: 0,
    recentActivity: 0
  });
  const [systemStatus, setSystemStatus] = useState({
    database: 'operational',
    api: 'operational',
    telegram: 'maintenance'
  });

  useEffect(() => {
    loadRealTimeData();
    
    // Configurar actualizaciones en tiempo real
    const interval = setInterval(loadRealTimeData, 30000); // Cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);

  const loadRealTimeData = async () => {
    try {
      setLoading(true);
      
      // Cargar empresas desde Supabase
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (companiesError) throw companiesError;

      if (companiesData) {
        setCompanies(companiesData);
        
        // Calcular estadísticas de empresas
        const activeCompanies = companiesData.filter(c => c.is_active).length;
        
        setStats(prev => ({
          ...prev,
          totalCompanies: companiesData.length,
          activeCompanies
        }));
      }

      // Cargar usuarios totales
      const { count: usersCount, error: usersError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (usersError) throw usersError;

      // Cargar facturas totales
      const { count: invoicesCount, error: invoicesError } = await supabase
        .from('invoices')
        .select('*', { count: 'exact', head: true });

      if (invoicesError) throw invoicesError;

      // Cargar ingresos del mes actual
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: monthlyInvoices, error: monthlyError } = await supabase
        .from('invoices')
        .select('total')
        .gte('created_at', startOfMonth.toISOString())
        .eq('status', 'paid');

      if (monthlyError) throw monthlyError;

      const monthlyRevenue = monthlyInvoices?.reduce((sum, invoice) => sum + (invoice.total || 0), 0) || 0;

      // Cargar logs recientes
      const { data: logsData, error: logsError } = await supabase
        .from('system_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (logsError) throw logsError;

      if (logsData) {
        setRecentLogs(logsData);
      }

      // Actualizar estadísticas
      setStats(prev => ({
        ...prev,
        totalUsers: usersCount || 0,
        totalInvoices: invoicesCount || 0,
        monthlyRevenue,
        recentActivity: logsData?.length || 0
      }));

      // Verificar estado del sistema
      await checkSystemStatus();

    } catch (error) {
      console.error('Error loading real-time data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkSystemStatus = async () => {
    try {
      // Test database connection
      const { error: dbError } = await supabase.from('companies').select('id').limit(1);
      
      setSystemStatus(prev => ({
        ...prev,
        database: dbError ? 'error' : 'operational',
        api: 'operational' // Si llegamos aquí, la API funciona
      }));
    } catch (error) {
      setSystemStatus(prev => ({
        ...prev,
        database: 'error',
        api: 'error'
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-400 bg-green-500/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle;
      case 'maintenance': return Clock;
      case 'error': return AlertCircle;
      default: return AlertCircle;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Cargando datos en tiempo real...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
          <p className="text-slate-400 mt-1">
            Bienvenido {user?.name} - Control total del sistema
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Última actualización: {new Date().toLocaleString('es-ES')}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
          <Activity className="w-5 h-5 text-purple-400" />
          <span className="text-purple-300 font-medium">Software Owner</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Stats Cards - TIEMPO REAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Empresas</p>
              <p className="text-2xl font-bold text-white">{stats.totalCompanies}</p>
              <p className="text-xs text-green-400 mt-1">
                {stats.activeCompanies} activas
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Usuarios</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              <p className="text-xs text-blue-400 mt-1">
                Todos los roles
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Facturas</p>
              <p className="text-2xl font-bold text-white">{stats.totalInvoices}</p>
              <p className="text-xs text-orange-400 mt-1">
                Sistema completo
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Ingresos Mes</p>
              <p className="text-2xl font-bold text-white">
                ${stats.monthlyRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-green-400 mt-1">
                {new Date().toLocaleDateString('es-ES', { month: 'long' })}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Companies Overview - TIEMPO REAL */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Empresas Registradas</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400">En vivo</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {companies.slice(0, 5).map((company) => (
              <div key={company.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${company.is_active ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <div>
                    <p className="text-white font-medium">{company.name}</p>
                    <p className="text-slate-400 text-sm">{company.subscription_plan}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-300 text-sm">{company.user_limit} usuarios</p>
                  <p className="text-slate-400 text-xs">{company.currency}</p>
                </div>
              </div>
            ))}
          </div>

          {companies.length > 5 && (
            <div className="mt-4 text-center">
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Ver todas las empresas ({companies.length})
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity - TIEMPO REAL */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Actividad Reciente</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400">Tiempo real</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{log.action}</p>
                  <p className="text-slate-400 text-xs">
                    {new Date(log.created_at).toLocaleString('es-ES')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {recentLogs.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No hay actividad reciente</p>
            </div>
          )}
        </div>
      </div>

      {/* System Status - TIEMPO REAL */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Estado del Sistema</h2>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-slate-400">Monitoreo activo</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getStatusColor(systemStatus.database)}`}>
              {(() => {
                const Icon = getStatusIcon(systemStatus.database);
                return <Icon className="w-8 h-8" />;
              })()}
            </div>
            <h3 className="text-white font-medium mb-1">Base de Datos</h3>
            <p className={`text-sm capitalize ${getStatusColor(systemStatus.database).split(' ')[0]}`}>
              {systemStatus.database === 'operational' ? 'Operacional' : 
               systemStatus.database === 'maintenance' ? 'Mantenimiento' : 'Error'}
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getStatusColor(systemStatus.api)}`}>
              {(() => {
                const Icon = getStatusIcon(systemStatus.api);
                return <Icon className="w-8 h-8" />;
              })()}
            </div>
            <h3 className="text-white font-medium mb-1">API Supabase</h3>
            <p className={`text-sm capitalize ${getStatusColor(systemStatus.api).split(' ')[0]}`}>
              {systemStatus.api === 'operational' ? 'Operacional' : 
               systemStatus.api === 'maintenance' ? 'Mantenimiento' : 'Error'}
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getStatusColor(systemStatus.telegram)}`}>
              {(() => {
                const Icon = getStatusIcon(systemStatus.telegram);
                return <Icon className="w-8 h-8" />;
              })()}
            </div>
            <h3 className="text-white font-medium mb-1">Telegram Bot</h3>
            <p className={`text-sm capitalize ${getStatusColor(systemStatus.telegram).split(' ')[0]}`}>
              {systemStatus.telegram === 'operational' ? 'Operacional' : 
               systemStatus.telegram === 'maintenance' ? 'Configuración Pendiente' : 'Error'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
