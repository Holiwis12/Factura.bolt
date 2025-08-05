import { NotificationBell } from '../features/notifications/components/NotificationBell'
import { useAuth } from '../features/auth/AuthProvider'

export function Topbar() {
  const { logout, user } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <header className="bg-slate-800/50 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Sistema de Facturación RD</h1>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
