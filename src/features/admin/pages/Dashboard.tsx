import { Card } from '../../../components/ui/card'
import { MetricCard } from '../../../components/dashboard/MetricCard'

const metrics = [
  { title: 'Empresas Activas', value: '24', change: '+3' },
  { title: 'Usuarios Totales', value: '156', change: '+12' },
  { title: 'Facturación Total', value: 'RD$ 2.4M', change: '+15.3%' },
  { title: 'Tasa de Actividad', value: '92%', change: '+2.1%' }
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Panel Administrativo</h1>
        <p className="opacity-90">Gestión y monitoreo del sistema</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard 
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Empresas Recientes</h3>
          <div className="space-y-4">
            {/* Placeholder content - replace with real data */}
            <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div>
                <p className="font-medium text-white">Empresa ABC</p>
                <p className="text-sm text-slate-400">Registrada hace 2 días</p>
              </div>
              <span className="px-3 py-1 text-sm bg-green-500/10 text-green-400 rounded-full">
                Activa
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div>
                <p className="font-medium text-white">Servicios XYZ</p>
                <p className="text-sm text-slate-400">Registrada hace 5 días</p>
              </div>
              <span className="px-3 py-1 text-sm bg-green-500/10 text-green-400 rounded-full">
                Activa
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Actividad del Sistema</h3>
          <div className="space-y-4">
            {/* Placeholder content - replace with real data */}
            <div className="flex items-center gap-4 p-3 bg-slate-800 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium text-white">Nuevo usuario registrado</p>
                <p className="text-sm text-slate-400">Hace 1 hora</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-800 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-white">Actualización del sistema</p>
                <p className="text-sm text-slate-400">Hace 3 horas</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
