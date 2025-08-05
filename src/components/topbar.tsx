import { useAuth } from '../features/auth/AuthProvider'

export function Topbar() {
  const { user, logout } = useAuth()
  
  return (
    <header className="border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-medium">Bienvenido, {user?.name}</h2>
        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
          {user?.role}
        </span>
      </div>
      
      <button 
        onClick={logout}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Cerrar Sesión
      </button>
    </header>
  )
}
