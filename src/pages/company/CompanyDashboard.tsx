import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users,
  FileText,
  Package,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

const stats = [
  {
    title: 'Ventas del Mes',
    value: 'RD$ 125,430',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-400 bg-green-500/20'
  },
  {
    title: 'Facturas Emitidas',
    value: '248',
    change: '+8.2%',
    trend: 'up',
    icon: FileText,
    color: 'text-blue-400 bg-blue-500/20'
  },
  {
    title: 'Clientes Activos',
    value: '1,234',
    change: '+5.1%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-400 bg-purple-500/20'
  },
  {
    title: 'Productos',
    value: '456',
    change: '-2.3%',
    trend: 'down',
    icon: Package,
    color: 'text-orange-400 bg-orange-500/20'
  }
]

const recentInvoices = [
  { id: 'INV-001', client: 'Juan Pérez', amount: 'RD$ 2,500', status: 'paid', date: '2024-01-15' },
  { id: 'INV-002', client: 'María García', amount: 'RD$ 1,800', status: 'pending', date: '2024-01-14' },
  { id: 'INV-003', client: 'Carlos López', amount: 'RD$ 3,200', status: 'paid', date: '2024-01-13' },
  { id: 'INV-004', client: 'Ana Martínez', amount: 'RD$ 950', status: 'overdue', date: '2024-01-12' },
]

const alerts = [
  { type: 'warning', message: '5 productos con stock bajo', icon: AlertTriangle },
  { type: 'success', message: 'Backup completado exitosamente', icon: CheckCircle },
  { type: 'warning', message: '3 facturas vencen hoy', icon: AlertTriangle },
]

export function CompanyDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Resumen de tu negocio</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
            Nueva Factura
          </button>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
            Ver Reportes
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 md:p-3 rounded-lg ${stat.color}`}>
                  <Icon size={20} className="md:w-6 md:h-6" />
                </div>
                <span className={`text-xs md:text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs md:text-sm text-slate-400">{stat.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Invoices */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
            <h2 className="text-lg md:text-xl font-semibold text-white">Facturas Recientes</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm self-start sm:self-auto">
              Ver todas
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-b-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <p className="font-medium text-white text-sm">{invoice.id}</p>
                      <p className="text-slate-400 text-sm truncate">{invoice.client}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 sm:hidden">{invoice.date}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-right">
                    <p className="font-semibold text-white text-sm">{invoice.amount}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'paid' 
                        ? 'bg-green-500/20 text-green-400'
                        : invoice.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {invoice.status === 'paid' ? 'Pagada' : 
                       invoice.status === 'pending' ? 'Pendiente' : 'Vencida'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-6">Alertas</h2>
          
          <div className="space-y-4">
            {alerts.map((alert, index) => {
              const Icon = alert.icon
              return (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30">
                  <Icon size={16} className={`mt-0.5 flex-shrink-0 ${
                    alert.type === 'warning' ? 'text-yellow-400' : 'text-green-400'
                  }`} />
                  <p className="text-sm text-slate-300 break-words">{alert.message}</p>
                </div>
              )
            })}
          </div>

          <button className="w-full mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
            Ver todas las alertas
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-white mb-6">Acciones Rápidas</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {[
            { icon: FileText, label: 'Nueva Factura', color: 'bg-blue-600 hover:bg-blue-700' },
            { icon: Users, label: 'Agregar Cliente', color: 'bg-green-600 hover:bg-green-700' },
            { icon: Package, label: 'Nuevo Producto', color: 'bg-purple-600 hover:bg-purple-700' },
            { icon: ShoppingCart, label: 'Punto de Venta', color: 'bg-orange-600 hover:bg-orange-700' },
            { icon: TrendingUp, label: 'Ver Reportes', color: 'bg-cyan-600 hover:bg-cyan-700' },
            { icon: DollarSign, label: 'Registrar Pago', color: 'bg-emerald-600 hover:bg-emerald-700' },
          ].map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-lg transition-colors ${action.color}`}
              >
                <Icon size={20} className="text-white" />
                <span className="text-xs md:text-sm text-white text-center leading-tight">
                  {action.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
