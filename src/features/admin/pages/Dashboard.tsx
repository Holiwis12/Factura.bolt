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
  Clock
} from 'lucide-react';
import { companyService, logService } from '../../../lib/services/api';
import type { Company, SystemLog } from '../../../lib/types/database';

export function AdminDashboard() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [recentLogs, setRecentLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    activeCompanies: 0,
    totalUsers: 0,
    recentActivity: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar empresas
      const companiesResult = await companyService.getAll();
      if (companiesResult.data) {
        setCompanies(companiesResult.data);
        setStats(prev => ({
          ...prev,
          totalCompanies: companiesResult.data.length,
          activeCompanies: companiesResult.data.filter(c => c.is_active).length
        }));
      }

      // Cargar logs recientes
      const logsResult = await logService.getLogs(undefined, { limit: 10 });
      if (logsResult.data) {
        setRecentLogs(logsResult.data);
        setStats(prev => ({
          ...prev,
          recentActivity: logsResult.data.length
        }));
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
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
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
          <Activity className="w-5 h-5 text-purple-400" />
          <span className="text-purple-300 font-medium">Software Owner</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Empresas</p>
              <p className="text-2xl font-bold text-white">{stats.totalCompanies}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Empresas Activas</p>
              <p className="text-2xl font-bold text-white">{stats.activeCompanies}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Usuarios</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Actividad Reciente</p>
              <p className="text-2xl font-bold text-white">{stats.recentActivity}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Companies Overview */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Empresas Registradas</h2>
            <Building2 className="w-5 h-5 text-slate-400" />
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

        {/* Recent Activity */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Actividad Reciente</h2>
            <Clock className="w-5 h-5 text-slate-400" />
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

      {/* System Status */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Estado del Sistema</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-white font-medium mb-1">Base de Datos</h3>
            <p className="text-green-400 text-sm">Operacional</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-white font-medium mb-1">API</h3>
            <p className="text-green-400 text-sm">Operacional</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-white font-medium mb-1">Telegram Bot</h3>
            <p className="text-yellow-400 text-sm">Configuración Pendiente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
