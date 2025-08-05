import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Users, 
  DollarSign,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Calculator,
  FileSpreadsheet,
  Building2,
  CreditCard,
  TrendingUp
} from 'lucide-react'

const companyMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/company' },
  { icon: Building2, label: 'Mi Empresa', path: '/company/profile' },
  { icon: ShoppingCart, label: 'Punto de Venta', path: '/company/pos' },
  { icon: FileText, label: 'Facturas', path: '/company/invoices' },
  { icon: Package, label: 'Inventario', path: '/company/inventory' },
  { icon: Users, label: 'Clientes', path: '/company/customers' },
  { icon: CreditCard, label: 'Pagos', path: '/company/payments' },
  { icon: Calculator, label: 'Contabilidad', path: '/company/accounting' },
  { icon: FileSpreadsheet, label: 'Reportes', path: '/company/reports' },
  { icon: TrendingUp, label: 'Análisis', path: '/company/analytics' },
  { icon: Settings, label: 'Configuración', path: '/company/settings' }
]

export function CompanySidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white">
              E
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-white">Mi Empresa</h2>
                <p className="text-xs text-slate-400">Panel de Control</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {companyMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Company Info */}
      <div className="p-3 border-t border-slate-700">
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-700/50 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-medium">
            C
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Mi Empresa S.A.</p>
              <p className="text-xs text-slate-400">RNC: 123456789</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
