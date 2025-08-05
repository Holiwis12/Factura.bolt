import { NavLink } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthProvider'

export function Sidebar() {
  const { user } = useAuth()
  
  const navItems = [
    { to: '/', icon: 'LayoutDashboard', label: 'Dashboard' },
    { to: '/invoices', icon: 'FileText', label: 'Facturación' },
    { to: '/quotes', icon: 'FileSearch', label: 'Cotizaciones' },
    { to: '/pos', icon: 'ShoppingCart', label: 'Punto de Venta' },
    { to: '/inventory', icon: 'Package', label: 'Inventario' },
    { to: '/accounting', icon: 'Calculator', label: 'Contabilidad' },
    { to: '/clients', icon: 'Users', label: 'Clientes' },
    ...(user?.role === 'admin' ? [
      { to: '/admin', icon: 'Settings', label: 'Administración' }
    ] : [])
  ]

  return (
    <aside className="w-64 border-r bg-white">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Facturación RD</h1>
      </div>
      
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-md ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
