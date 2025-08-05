import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Settings, 
  BarChart3,
  Shield,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Building2, label: 'Empresas', path: '/admin/companies' },
  { icon: Users, label: 'Usuarios', path: '/admin/users' },
  { icon: BarChart3, label: 'Reportes', path: '/admin/reports' },
  { icon: Shield, label: 'Seguridad', path: '/admin/security' },
  { icon: Settings, label: 'Configuración', path: '/admin/settings' }
]

interface AdminSidebarProps {
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function AdminSidebar({ isMobileOpen = false, onMobileClose }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    if (onMobileClose) {
      onMobileClose()
    }
  }, [location.pathname, onMobileClose])

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${collapsed ? 'w-16' : 'w-64'} 
        bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 
        transition-all duration-300 flex flex-col
        
        /* Mobile Styles */
        md:relative md:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-50
        md:z-auto
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white">
                A
              </div>
              {!collapsed && (
                <div className="hidden md:block">
                  <h2 className="font-bold text-white">Admin Panel</h2>
                  <p className="text-xs text-slate-400">Sistema</p>
                </div>
              )}
              {!collapsed && (
                <div className="md:hidden">
                  <h2 className="font-bold text-white text-sm">Admin</h2>
                  <p className="text-xs text-slate-400">Panel</p>
                </div>
              )}
            </div>
            
            {/* Desktop collapse button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block p-1.5 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            {/* Mobile close button */}
            <button
              onClick={onMobileClose}
              className="md:hidden p-1.5 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {adminMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/25' 
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }
                  ${collapsed ? 'justify-center' : ''}
                  /* Mobile touch targets */
                  min-h-[44px] md:min-h-[36px]
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} flex-shrink-0`} />
                {!collapsed && (
                  <span className="font-medium text-sm md:text-base">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Admin Info */}
        <div className="p-3 border-t border-slate-700">
          <div className={`flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-700/50 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
              A
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Administrador</p>
                <p className="text-xs text-slate-400">Sistema</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
