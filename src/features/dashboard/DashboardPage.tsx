import { LineChart, BarChart, PieChart } from '../../components/charts'
import { Card } from '../../components/ui/card'
import { MetricCard } from '../../components/dashboard/MetricCard'

const metrics = [
  { title: 'Ingresos Totales', value: 'RD$ 1,250,000', change: '+12.5%' },
  { title: 'Ventas del Mes', value: 'RD$ 285,400', change: '+5.3%' },
  { title: 'Gastos Operativos', value: 'RD$ 78,200', change: '-2.1%' },
  { title: 'Clientes Activos', value: '243', change: '+8.7%' }
]

const salesData = [
  { name: 'Ene', value: 400, revenue: 120000 },
  { name: 'Feb', value: 300, revenue: 90000 },
  { name: 'Mar', value: 600, revenue: 180000 },
  { name: 'Abr', value: 800, revenue: 240000 },
  { name: 'May', value: 500, revenue: 150000 },
  { name: 'Jun', value: 900, revenue: 270000 }
]

const expenseData = [
  { name: 'Alquiler', value: 1200 },
  { name: 'Salarios', value: 3500 },
  { name: 'Suministros', value: 800 },
  { name: 'Marketing', value: 1500 },
  { name: 'IT', value: 900 }
]

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Panel de Control</h1>
        <p className="opacity-90">Resumen financiero y métricas clave</p>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Tendencias de Ventas</h3>
          <LineChart data={salesData} />
        </Card>
        
        <Card className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Distribución de Gastos</h3>
          <PieChart data={expenseData} />
        </Card>
      </div>
      
      <div className="grid grid-cols-1">
        <Card className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Desempeño Mensual</h3>
          <BarChart data={salesData} />
        </Card>
      </div>
    </div>
  )
}
