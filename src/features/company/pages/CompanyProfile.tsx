import { useAuth } from '../../auth/AuthProvider'
import { Building2, Mail, Phone, MapPin, Calendar, Shield, User, Crown } from 'lucide-react'

export function CompanyProfile() {
  const { user } = useAuth()

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'software_owner':
        return {
          icon: Crown,
          label: 'Dueño del Software',
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/20'
        }
      case 'company_owner':
        return {
          icon: Shield,
          label: 'Dueño de la Empresa',
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/20'
        }
      case 'employee':
        return {
          icon: User,
          label: 'Empleado',
          color: 'text-green-400',
          bgColor: 'bg-green-500/20'
        }
      case 'demo':
        return {
          icon: User,
          label: 'Usuario Demo',
          color: 'text-orange-400',
          bgColor: 'bg-orange-500/20'
        }
      default:
        return {
          icon: User,
          label: 'Usuario',
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20'
        }
    }
  }

  const roleInfo = getRoleInfo(user?.role || '')
  const RoleIcon = roleInfo.icon

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
          <p className="text-slate-400 mt-1">Información personal y de la empresa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información Personal */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Información Personal</h2>
              <p className="text-slate-400 text-sm">Datos del usuario</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nombre Completo
              </label>
              <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                <User className="w-5 h-5 text-slate-400" />
                <span className="text-white">{user?.name}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Correo Electrónico
              </label>
              <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                <Mail className="w-5 h-5 text-slate-400" />
                <span className="text-white">{user?.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Rol en el Sistema
              </label>
              <div className={`flex items-center gap-3 p-3 rounded-lg ${roleInfo.bgColor}`}>
                <RoleIcon className={`w-5 h-5 ${roleInfo.color}`} />
                <span className={`font-medium ${roleInfo.color}`}>{roleInfo.label}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Fecha de Registro
              </label>
              <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                <Calendar className="w-5 h-5 text-slate-400" />
                <span className="text-white">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('es-ES') : 'No disponible'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Información de la Empresa */}
        {user?.companyName && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Mi Empresa</h2>
                <p className="text-slate-400 text-sm">Información empresarial</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nombre de la Empresa
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <Building2 className="w-5 h-5 text-slate-400" />
                  <span className="text-white">{user.companyName}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ID de la Empresa
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <Shield className="w-5 h-5 text-slate-400" />
                  <span className="text-white font-mono text-sm">{user.companyId}</span>
                </div>
              </div>

              {user.isDemo && (
                <div className="p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-orange-400 mb-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Cuenta Demo</span>
                  </div>
                  <p className="text-orange-300 text-sm">
                    Esta es una cuenta de demostración con datos de prueba.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  RNC/RUC
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-400 text-sm">123456789</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Teléfono
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-400 text-sm">+1 (809) 555-0123</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Dirección
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-400 text-sm">Santo Domingo, República Dominicana</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Solo información personal para software owner */}
        {user?.role === 'software_owner' && !user?.companyName && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Administración del Software</h2>
                <p className="text-slate-400 text-sm">Panel de control principal</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <Crown className="w-5 h-5" />
                  <span className="font-medium">Acceso Total</span>
                </div>
                <p className="text-purple-300 text-sm">
                  Tienes acceso completo a todas las funciones del sistema y puedes administrar todas las empresas.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Permisos
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Gestión de empresas
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Administración de usuarios
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Configuración del sistema
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Reportes globales
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
