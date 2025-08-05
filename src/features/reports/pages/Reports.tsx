import { BarChart3, TrendingUp, FileText, Download, Calendar, Filter } from 'lucide-react'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const salesData = [
  { month: 'Ene', sales: 12000, expenses: 8000 },
  { month: 'Feb', sales: 15000, expenses: 9000 },
  { month: 'Mar', sales: 18000, expenses: 11000 },
  { month: 'Abr', sales: 22000, expenses: 13000 },
  { month: 'May', sales: 25000, expenses: 15000 },
  { month: 'Jun', sales: 28000, expenses: 16000 }
]

const categoryData = [
  { name: 'Electrónicos', value: 45, color: '#3B82F6' },
  { name: 'Accesorios', value: 30, color: '#10B981' },
  { name: 'Oficina', value: 15, color: '#F59E0B' },
  { name: 'Otros', value: 10, color: '#EF4444' }
]

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reportes y Análisis</h1>
          <p className="text-slate-400">Analiza el rendimiento de tu empresa</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Esta Semana</option>
            <option value="month">Este Mes</option>
            <option value="quarter">Este Trimestre</option>
            <option value="year">Este Año</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Download size={18} />
            Exportar
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Ventas Totales</p>
              <p className="text-2xl font-bold text-white">S/ 120,000</p>
              <p className="text-green-400 text-sm">+12% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 size={24} className="text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Ganancia Neta</p>
              <p className="text-2xl font-bold text-white">S/ 48,000</p>
              <p className="text-blue-400 text-sm">+8% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Facturas Emitidas</p>
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-purple-400 text-sm">+15% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Promedio Diario</p>
              <p className="text-2xl font-bold text-white">S/ 4,000</p>
              <p className="text-yellow-400 text-sm">+5% vs mes anterior</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Ventas vs Gastos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="sales" fill="#3B82F6" name="Ventas" />
              <Bar dataKey="expenses" fill="#EF4444" name="Gastos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Ventas por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Tendencia de Ventas</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              name="Ventas"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
