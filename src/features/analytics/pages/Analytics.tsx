import { useState } from 'react'
import { Card } from '../../../components/ui/card'
import { LineChart, BarChart, PieChart } from '../../../components/charts'
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Target, Calendar, Filter } from 'lucide-react'

const performanceData = [
  { name: 'Lun', sales: 12000, visitors: 45, conversion: 8.5 },
  { name: 'Mar', sales: 15000, visitors: 52, conversion: 9.2 },
  { name: 'Mié', sales: 18000, visitors: 48, conversion: 11.1 },
  { name: 'Jue', sales: 22000, visitors: 65, conversion: 12.3 },
  { name: 'Vie', sales: 28000, visitors: 78, conversion: 14.2 },
  { name: 'Sáb', sales: 35000, visitors: 95, conversion: 16.8 },
  { name: 'Dom', sales: 25000, visitors: 68, conversion: 13.5 }
]

const customerSegments = [
  { name: 'Premium', value: 25, revenue: 180000 },
  { name: 'Regular', value: 45, revenue: 120000 },
  { name: 'Ocasional', value: 30, revenue: 60000 }
]

const salesChannels = [
  { name: 'Tienda Física', value: 60, revenue: 240000 },
  { name: 'Online', value: 25, revenue: 100000 },
  { name: 'Teléfono', value: 15, revenue: 60000 }
]

const hourlyData = [
  { hour: '9:00', sales: 2500 },
  { hour: '10:00', sales: 4200 },
  { hour: '11:00', sales: 6800 },
  { hour: '12:00', sales: 8500 },
  { hour: '13:00', sales: 7200 },
  { hour: '14:00', sales: 9100 },
  { hour: '15:00', sales: 11200 },
  { hour: '16:00', sales: 13500 },
  { hour: '17:00', sales: 15800 },
  { hour: '18:00', sales: 12400 }
]

export function Analytics() {
  const [timeRange, setTimeRange] = useState('7-days')
  const [metric, setMetric] = useState('sales')

  const metrics = [
    {
      title: 'Conversión Promedio',
      value: '12.3%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'text-green-400'
    },
    {
      title: 'Ticket Promedio',
      value: 'RD$ 3,450',
      change: '+8.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-blue-400'
    },
    {
      title: 'Visitantes Únicos',
      value: '1,247',
      change: '-3.2%',
      trend: 'down',
      icon: Users,
      color: 'text-purple-400'
    },
    {
      title: 'Transacciones',
      value: '156',
      change: '+15.7%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-orange-400'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Análisis Avanzado</h1>
        <p className="opacity-90">Insights profundos de tu negocio</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          >
            <option value="7-days">Últimos 7 días</option>
            <option value="30-days">Últimos 30 días</option>
            <option value="90-days">Últimos 90 días</option>
            <option value="1-year">Último año</option>
          </select>
          
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          >
            <option value="sales">Ventas</option>
            <option value="customers">Clientes</option>
            <option value="products">Productos</option>
            <option value="conversion">Conversión</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-slate-400">{metric.title}</h3>
                  <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp size={16} className="text-green-400" />
                    ) : (
                      <TrendingDown size={16} className="text-red-400" />
                    )}
                    <span className={metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-opacity-10 ${metric.color.replace('text-', 'bg-')}`}>
                  <Icon size={24} className={metric.color} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Performance Chart */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <h3 className="text-lg font-medium mb-4 text-white">Rendimiento Semanal</h3>
        <LineChart data={performanceData} />
      </Card>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Segmentos de Clientes</h3>
          <PieChart data={customerSegments} />
          <div className="mt-4 space-y-2">
            {customerSegments.map((segment, index) => (
              <div key={segment.name} className="flex justify-between items-center">
                <span className="text-slate-300">{segment.name}</span>
                <div className="text-right">
                  <span className="text-white font-medium">{segment.value}%</span>
                  <div className="text-sm text-slate-400">
                    RD$ {segment.revenue.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Canales de Venta</h3>
          <PieChart data={salesChannels} />
          <div className="mt-4 space-y-2">
            {salesChannels.map((channel, index) => (
              <div key={channel.name} className="flex justify-between items-center">
                <span className="text-slate-300">{channel.name}</span>
                <div className="text-right">
                  <span className="text-white font-medium">{channel.value}%</span>
                  <div className="text-sm text-slate-400">
                    RD$ {channel.revenue.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Hourly Performance */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <h3 className="text-lg font-medium mb-4 text-white">Ventas por Hora</h3>
        <BarChart data={hourlyData} />
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Insights Clave</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Mejor día de ventas</p>
                <p className="text-slate-400 text-sm">Los sábados generan 40% más ingresos que el promedio</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Hora pico</p>
                <p className="text-slate-400 text-sm">Entre 4-6 PM se concentra el 35% de las ventas diarias</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Clientes premium</p>
                <p className="text-slate-400 text-sm">Representan el 25% pero generan el 45% de los ingresos</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Recomendaciones</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Optimizar inventario</p>
                <p className="text-slate-400 text-sm">Aumentar stock de productos top antes del fin de semana</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Promociones dirigidas</p>
                <p className="text-slate-400 text-sm">Crear ofertas especiales para clientes ocasionales</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white font-medium">Expandir horarios</p>
                <p className="text-slate-400 text-sm">Considerar extender horario hasta las 7 PM</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
