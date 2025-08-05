import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText, 
  Settings, 
  CreditCard,
  BarChart3,
  Menu,
  X,
  Shield,
  Database
} from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
    description: 'Panel principal'
  },
  {
    title: 'Empresas',
    icon: Building2,
    path: '/admin/companies',
    description: 'Gestión de empresas'
  },
  {
    title: 'Usuarios',
    icon: Users,
    path: '/admin/users',
    description: 'Administrar usuarios'
  },
  {
    title: 'Facturación',
    icon: FileText,
    path: '/admin/billing',
    description: 'Sistema de facturación'
  },
  {
    title: 'Pagos',
    icon: CreditCard,
    path: '/admin/payments',
    description: 'Gestión de pagos'
  },
  {
    title: 'Reportes',
    icon: BarChart3,
    path: '/admin/reports',
    description: 'Análisis y reportes'
  },
  {
    title: 'Base de Datos',
    icon: Database,
    path: '/admin/database',
    description: 'Gestión de datos'
  },
  {
    title: 'Seguridad',
    icon: Shield,
    path: '/admin/security',
    description: 'Configuración de seguridad'
  },
  {
    title: 'Configuración',
    icon: Settings,
    path: '/admin/settings',
    description: 'Configuración del sistema'
  }
]

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div className={`bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Admin Panel</h2>
                <p className="text-slate-400 text-xs">Sistema de Gestión</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'group-hover:text-primary'} transition-colors`} />
              {!isCollapsed && (
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300">
                    {item.description}
                  </div>
                </div>
              )}
              {isActive && !isCollapsed && (
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Super Admin</div>
                <div className="text-slate-400 text-xs">Acceso completo</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
