import { useState } from 'react'
import { Card } from '../../../components/ui/card'
import { CreditCard, DollarSign, Calendar, Filter, Plus, CheckCircle, Clock, XCircle } from 'lucide-react'

type Payment = {
  id: string
  invoiceNumber: string
  customerName: string
  amount: number
  method: 'cash' | 'card' | 'transfer' | 'check'
  status: 'completed' | 'pending' | 'failed'
  date: string
  reference?: string
}

const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    customerName: 'Juan Pérez',
    amount: 25000,
    method: 'card',
    status: 'completed',
    date: '2024-03-15',
    reference: 'TXN-123456'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    customerName: 'María García',
    amount: 18500,
    method: 'cash',
    status: 'completed',
    date: '2024-03-14'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    customerName: 'Carlos Rodríguez',
    amount: 12800,
    method: 'transfer',
    status: 'pending',
    date: '2024-03-13',
    reference: 'TRF-789012'
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    customerName: 'Ana Martínez',
    amount: 8900,
    method: 'check',
    status: 'failed',
    date: '2024-03-12',
    reference: 'CHK-345678'
  }
]

export function Payments() {
  const [payments] = useState<Payment[]>(mockPayments)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [methodFilter, setMethodFilter] = useState<string>('all')

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter
    return matchesStatus && matchesMethod
  })

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-400" size={20} />
      case 'pending':
        return <Clock className="text-yellow-400" size={20} />
      case 'failed':
        return <XCircle className="text-red-400" size={20} />
    }
  }

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-400'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400'
      case 'failed':
        return 'bg-red-500/10 text-red-400'
    }
  }

  const getStatusText = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'Completado'
      case 'pending':
        return 'Pendiente'
      case 'failed':
        return 'Fallido'
    }
  }

  const getMethodIcon = (method: Payment['method']) => {
    switch (method) {
      case 'cash':
        return <DollarSign className="text-green-400" size={16} />
      case 'card':
        return <CreditCard className="text-blue-400" size={16} />
      case 'transfer':
        return <div className="w-4 h-4 bg-purple-400 rounded-full" />
      case 'check':
        return <div className="w-4 h-4 bg-orange-400 rounded-sm" />
    }
  }

  const getMethodText = (method: Payment['method']) => {
    switch (method) {
      case 'cash':
        return 'Efectivo'
      case 'card':
        return 'Tarjeta'
      case 'transfer':
        return 'Transferencia'
      case 'check':
        return 'Cheque'
    }
  }

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const completedAmount = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Pagos</h1>
        <p className="opacity-90">Gestión de pagos y cobros</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Total Pagos</h3>
          <p className="mt-2 text-2xl font-bold text-white">RD$ {totalAmount.toLocaleString()}</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Completados</h3>
          <p className="mt-2 text-2xl font-bold text-green-400">RD$ {completedAmount.toLocaleString()}</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Pendientes</h3>
          <p className="mt-2 text-2xl font-bold text-yellow-400">RD$ {pendingAmount.toLocaleString()}</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Transacciones</h3>
          <p className="mt-2 text-2xl font-bold text-white">{payments.length}</p>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          >
            <option value="all">Todos los estados</option>
            <option value="completed">Completados</option>
            <option value="pending">Pendientes</option>
            <option value="failed">Fallidos</option>
          </select>
          
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          >
            <option value="all">Todos los métodos</option>
            <option value="cash">Efectivo</option>
            <option value="card">Tarjeta</option>
            <option value="transfer">Transferencia</option>
            <option value="check">Cheque</option>
          </select>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
          <Plus size={20} />
          Registrar Pago
        </button>
      </div>

      {/* Payments List */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-700">
                  <th className="pb-3 text-slate-400">Factura</th>
                  <th className="pb-3 text-slate-400">Cliente</th>
                  <th className="pb-3 text-slate-400">Monto</th>
                  <th className="pb-3 text-slate-400">Método</th>
                  <th className="pb-3 text-slate-400">Estado</th>
                  <th className="pb-3 text-slate-400">Fecha</th>
                  <th className="pb-3 text-slate-400">Referencia</th>
                  <th className="pb-3 text-slate-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-slate-700">
                    <td className="py-4 text-white font-medium">{payment.invoiceNumber}</td>
                    <td className="py-4 text-white">{payment.customerName}</td>
                    <td className="py-4 text-white font-medium">
                      RD$ {payment.amount.toLocaleString()}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {getMethodIcon(payment.method)}
                        <span className="text-white">{getMethodText(payment.method)}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(payment.status)}`}>
                          {getStatusText(payment.status)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-white">{payment.date}</td>
                    <td className="py-4 text-slate-400 text-sm">
                      {payment.reference || '-'}
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg">
                          Ver
                        </button>
                        {payment.status === 'pending' && (
                          <button className="p-2 text-green-400 hover:text-green-300 hover:bg-slate-700 rounded-lg">
                            Confirmar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No se encontraron pagos con los filtros seleccionados</p>
        </div>
      )}
    </div>
  )
}
