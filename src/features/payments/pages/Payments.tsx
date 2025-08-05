import { CreditCard, Plus, Search, CheckCircle, Clock, XCircle, DollarSign } from 'lucide-react'
import { useState } from 'react'

interface Payment {
  id: string
  customer: string
  amount: number
  method: 'cash' | 'card' | 'transfer'
  status: 'completed' | 'pending' | 'failed'
  date: string
  invoice: string
}

const mockPayments: Payment[] = [
  {
    id: '1',
    customer: 'Juan Pérez',
    amount: 1250,
    method: 'card',
    status: 'completed',
    date: '2024-01-15',
    invoice: 'F001-00001'
  },
  {
    id: '2',
    customer: 'María García',
    amount: 850,
    method: 'cash',
    status: 'completed',
    date: '2024-01-15',
    invoice: 'F001-00002'
  },
  {
    id: '3',
    customer: 'Carlos López',
    amount: 2100,
    method: 'transfer',
    status: 'pending',
    date: '2024-01-15',
    invoice: 'F001-00003'
  }
]

const methodLabels = {
  cash: 'Efectivo',
  card: 'Tarjeta',
  transfer: 'Transferencia'
}

const statusLabels = {
  completed: 'Completado',
  pending: 'Pendiente',
  failed: 'Fallido'
}

const statusColors = {
  completed: 'text-green-400 bg-green-500/20',
  pending: 'text-yellow-400 bg-yellow-500/20',
  failed: 'text-red-400 bg-red-500/20'
}

const statusIcons = {
  completed: CheckCircle,
  pending: Clock,
  failed: XCircle
}

export function Payments() {
  const [payments] = useState<Payment[]>(mockPayments)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPayments = payments.filter(payment =>
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.invoice.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const completedPayments = payments.filter(p => p.status === 'completed')
  const pendingPayments = payments.filter(p => p.status === 'pending')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pagos</h1>
          <p className="text-slate-400">Gestiona los pagos de tu empresa</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <Plus size={18} />
          Registrar Pago
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Recaudado</p>
              <p className="text-2xl font-bold text-white">S/ {totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Pagos Completados</p>
              <p className="text-2xl font-bold text-white">{completedPayments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Pagos Pendientes</p>
              <p className="text-2xl font-bold text-white">{pendingPayments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <CreditCard size={24} className="text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Pagos</p>
              <p className="text-2xl font-bold text-white">{payments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Buscar pagos por cliente o factura..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Payments Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left p-4 text-slate-300 font-medium">Cliente</th>
                <th className="text-left p-4 text-slate-300 font-medium">Factura</th>
                <th className="text-left p-4 text-slate-300 font-medium">Monto</th>
                <th className="text-left p-4 text-slate-300 font-medium">Método</th>
                <th className="text-left p-4 text-slate-300 font-medium">Estado</th>
                <th className="text-left p-4 text-slate-300 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => {
                const StatusIcon = statusIcons[payment.status]
                return (
                  <tr key={payment.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                    <td className="p-4">
                      <p className="font-medium text-white">{payment.customer}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-blue-400 font-mono">{payment.invoice}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-green-400 font-medium">
                        S/ {payment.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-slate-300">{methodLabels[payment.method]}</span>
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${statusColors[payment.status]}`}>
                        <StatusIcon size={14} />
                        {statusLabels[payment.status]}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-slate-300">{payment.date}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
