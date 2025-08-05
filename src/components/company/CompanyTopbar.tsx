import { Bell, Search, User, LogOut, Settings, Menu } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../features/auth/AuthProvider'
import { useNotifications, NotificationPanel } from '../../features/notifications'

interface CompanyTopbarProps {
  onMobileMenuToggle?: () => void
}

export function CompanyTopbar({ onMobileMenuToggle }: CompanyTopbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { logout, user } = useAuth()
  const { unreadCount, togglePanel } = useNotifications()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const handleProfileClick = () => {
    setShowUserMenu(false)
    console.log('Navigating to profile...')
  }

  const handleSettingsClick = () => {
    setShowUserMenu(false)
    console.log('Navigating to settings...')
  }

  return (
    <header className="bg-slate-800/50 border-b border-slate-700 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-lg md:text-xl font-semibold text-white truncate">
            <span className="hidden sm:inline">Panel Empresarial</span>
            <span className="sm:hidden">Panel</span>
          </h1>
          
          {/* Desktop Search Bar */}
          <div className="hidden lg:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar facturas, clientes..."
              className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={togglePanel}
              className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Bell size={18} className="md:w-5 md:h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <NotificationPanel />
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 md:gap-3 p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-medium">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-white truncate max-w-32">
                  {user?.email || 'Usuario'}
                </p>
                <p className="text-xs text-slate-400">Administrador</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                <div className="py-2">
                  <button 
                    onClick={handleProfileClick}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <User size={16} />
                    Mi Perfil
                  </button>
                  <button 
                    onClick={handleSettingsClick}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <Settings size={16} />
                    Configuración
                  </button>
                  <hr className="my-2 border-slate-700" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
                  >
                    <LogOut size={16} />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Click outside to close menus */}
      {(showUserMenu || showSearch) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false)
            setShowSearch(false)
          }}
        />
      )}
    </header>
  )
}
