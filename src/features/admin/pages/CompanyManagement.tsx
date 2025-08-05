import { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  Settings,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { companyService } from '../../../lib/services/api';
import { useNotifications } from '../../notifications/context/NotificationsContext';
import type { Company } from '../../../lib/types/database';

export function CompanyManagement() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const result = await companyService.getAll();
      if (result.data) {
        setCompanies(result.data);
      } else {
        addNotification({
          type: 'error',
          title: 'Error',
          message: result.error || 'Error al cargar empresas'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error inesperado al cargar empresas'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.rnc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCompany = async (companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const result = await companyService.create(companyData);
      if (result.data) {
        setCompanies(prev => [...prev, result.data!]);
        setShowCreateModal(false);
        addNotification({
          type: 'success',
          title: 'Empresa creada',
          message: `${result.data.name} ha sido creada exitosamente`
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Error',
          message: result.error || 'Error al crear empresa'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error inesperado al crear empresa'
      });
    }
  };

  const handleToggleStatus = async (company: Company) => {
    try {
      const result = await companyService.update(company.id, {
        is_active: !company.is_active
      });
      
      if (result.data) {
        setCompanies(prev => 
          prev.map(c => c.id === company.id ? result.data! : c)
        );
        addNotification({
          type: 'success',
          title: 'Estado actualizado',
          message: `${company.name} ha sido ${result.data.is_active ? 'activada' : 'desactivada'}`
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error al actualizar estado de la empresa'
      });
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
          <h1 className="text-3xl font-bold text-white">Gestión de Empresas</h1>
          <p className="text-slate-400 mt-1">
            Administra todas las empresas del sistema
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nueva Empresa
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar empresas por nombre o RNC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Empresa</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">RNC</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Usuarios</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Fecha</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{company.name}</p>
                        <p className="text-slate-400 text-sm">{company.currency}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300">{company.rnc || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                      {company.subscription_plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{company.user_limit}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(company)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                        company.is_active
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      }`}
                    >
                      {company.is_active ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Activa
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          Inactiva
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-sm">
                      {new Date(company.created_at).toLocaleDateString('es-ES')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedCompany(company)}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-green-400 hover:bg-slate-700 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-700 rounded-lg transition-colors"
                        title="Configuración"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">
              {searchTerm ? 'No se encontraron empresas' : 'No hay empresas registradas'}
            </p>
          </div>
        )}
      </div>

      {/* Create Company Modal */}
      {showCreateModal && (
        <CreateCompanyModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCompany}
        />
      )}

      {/* Company Details Modal */}
      {selectedCompany && (
        <CompanyDetailsModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}

// Modal para crear empresa
function CreateCompanyModal({ 
  onClose, 
  onSubmit 
}: { 
  onClose: () => void;
  onSubmit: (data: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    rnc: '',
    phone: '',
    address: '',
    currency: 'DOP',
    user_limit: 5,
    subscription_plan: 'basic',
    is_active: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      timezone: 'America/Santo_Domingo'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-6">Nueva Empresa</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nombre de la Empresa *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              RNC
            </label>
            <input
              type="text"
              value={formData.rnc}
              onChange={(e) => setFormData(prev => ({ ...prev, rnc: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Teléfono
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Límite de Usuarios
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.user_limit}
              onChange={(e) => setFormData(prev => ({ ...prev, user_limit: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Crear Empresa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal para detalles de empresa
function CompanyDetailsModal({ 
  company, 
  onClose 
}: { 
  company: Company;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Detalles de la Empresa</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Información General</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-400">Nombre</label>
                <p className="text-white">{company.name}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-400">RNC</label>
                <p className="text-white">{company.rnc || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-400">Teléfono</label>
                <p className="text-white">{company.phone || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-400">Dirección</label>
                <p className="text-white">{company.address || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Configuración</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-400">Plan</label>
                <p className="text-white">{company.subscription_plan}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-400">Moneda</label>
                <p className="text-white">{company.currency}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-400">Límite de Usuarios</label>
                <p className="text-white">{company.user_limit}</p>
              </div>
              <div>
                <label className="block text-sm text-slate-400">Estado</label>
                <p className={`${company.is_active ? 'text-green-400' : 'text-red-400'}`}>
                  {company.is_active ? 'Activa' : 'Inactiva'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Creada: {new Date(company.created_at).toLocaleString('es-ES')}</span>
            <span>Actualizada: {new Date(company.updated_at).toLocaleString('es-ES')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
