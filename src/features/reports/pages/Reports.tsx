import { useState } from 'react'
import { Card } from '../../../components/ui/card'
import { BarChart, LineChart, PieChart } from '../../../components/charts'
import { Download, Calendar, Filter, TrendingUp, DollarSign, Users, Package } from 'lucide-react'

const salesData = [
  { name: 'Ene', sales: 45000, expenses: 32000, profit: 13000 },
  { name: 'Feb', sales: 38000, expenses: 28000, profit: 10000 },
  { name: 'Mar', sales: 52000, expenses: 35000, profit: 17000 },
  { name: 'Abr', sales: 48000, expenses: 30000, profit: 18000 },
  { name: 'May', sales: 55000, expenses: 38000, profit: 17000 },
  { name: 'Jun', sales: 62000, expenses: 42000, profit: 20000 }
]

const categoryData = [
  { name: 'Electrónicos', value: 45, revenue: 180000 },
  { name: 'Oficina', value: 25, revenue: 100000 },
  { name: 'Accesorios', value: 20, revenue: 80000 },
  { name: 'Audio', value: 10, revenue: 40000 }
]

const topProducts = [
  { name: 'Laptop HP', sales: 25, revenue: 1125000 },
  { name: 'Monitor 24"', sales: 18, revenue: 324000 },
  { name: 'Impresora Multifuncional', sales: 15, revenue: 180000 },
  { name: 'Teclado Mecánico', sales: 12, revenue: 42000 },
  { name: 'Mouse Inalámbrico', sales: 35, revenue: 42000 }
]

const customerData = [
  { name: 'Nuevos', value: 35 },
  { name: 'Recurrentes', value: 45 },
  { name: 'Inactivos', value: 20 }
]

export function Reports() {
  const [dateRange, setDateRange] = useState('last-6-months')
  const [reportType, setReportType] = useState('sales')

  const handleExportReport = (format: 'pdf' | 'excel') => {
    alert(`Exportando reporte en formato ${format.toUpperCase()}...`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Reportes</h1>
        <p className="opacity-90">Análisis detallado de tu negocio</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          >
            <option value="sales">Ventas</option>
            <option value="inventory">Inventario</option>
            <option value="customers">Clientes</option>
            <option value="financial">Financiero</option>
          </select>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          >
            <option value="last-7-days">Últimos 7 días</option>
            <option value="last-30-days">Últimos 30 días</option>
            <option value="last-3-months">Últimos 3 meses</option>
            <option value="last-6-months">Últimos 6 meses</option>
            <option value="last-year">Último año</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => handleExportReport('pdf')}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Download size={20} />
            PDF
          </button>
          <button 
            onClick={() => handleExportReport('excel')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download size={20} />
            Excel
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <DollarSign className="text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">Ingresos Totales</h3>
              <p className="text-2xl font-bold text-white">RD$ 300,000</p>
              <p className="text-sm text-green-400">+15.3% vs período anterior</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">Ganancia Neta</h3>
              <p className="text-2xl font-bold text-white">RD$ 95,000</p>
              <p className="text-sm text-green-400">+8.7% vs período anterior</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Users className="text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">Clientes Activos</h3>
              <p className="text-2xl font-bold text-white">243</p>
              <p className="text-sm text-green-400">+12.1% vs período anterior</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Package className="text-orange-400" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">Productos Vendidos</h3>
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-sm text-green-400">+5.4% vs período anterior</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Tendencia de Ventas y Gastos</h3>
          <LineChart data={salesData} />
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Ventas por Categoría</h3>
          <PieChart data={categoryData} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Productos Más Vendidos</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-slate-400 text-sm">{product.sales} unidades</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">RD$ {product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-lg font-medium mb-4 text-white">Distribución de Clientes</h3>
          <PieChart data={customerData} />
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4 text-white">Resumen Mensual</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-700">
                  <th className="pb-3 text-slate-400">Mes</th>
                  <th className="pb-3 text-slate-400">Ventas</th>
                  <th className="pb-3 text-slate-400">Gastos</th>
                  <th className="pb-3 text-slate-400">Ganancia</th>
                  <th className="pb-3 text-slate-400">Margen</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((month) => (
                  <tr key={month.name} className="border-b border-slate-700">
                    <td className="py-4 text-white font-medium">{month.name}</td>
                    <td className="py-4 text-white">RD$ {month.sales.toLocaleString()}</td>
                    <td className="py-4 text-white">RD$ {month.expenses.toLocaleString()}</td>
                    <td className="py-4 text-green-400 font-medium">RD$ {month.profit.toLocaleString()}</td>
                    <td className="py-4 text-white">{((month.profit / month.sales) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}
