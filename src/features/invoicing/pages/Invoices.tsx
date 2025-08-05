import { useState } from 'react'
import { Card } from '../../../components/ui/card'

type Invoice = {
  id: string
  number: string
  client: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    client: 'Cliente ABC',
    date: '2024-03-15',
    amount: 25000,
    status: 'paid'
  },
  {
    id: '2',
    number: 'INV-2024-002',
    client: 'Servicios XYZ',
    date: '2024-03-14',
    amount: 18500,
    status: 'pending'
  },
  {
    id: '3',
    number: 'INV-2024-003',
    client: 'Empresa 123',
    date: '2024-03-10',
    amount: 12800,
    status: 'overdue'
  }
]

export function Invoices() {
  const [invoices] = useState<Invoice[]>(mockInvoices)

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-400'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400'
      case 'overdue':
        return 'bg-red-500/10 text-red-400'
    }
  }

  const getStatusText = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'Pagada'
      case 'pending':
        return 'Pendiente'
      case 'overdue':
        return 'Vencida'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Facturación</h1>
        <p className="opacity-90">Gestión de facturas y cobros</p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar factura..."
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
            <option value="all">Todos los estados</option>
            <option value="paid">Pagadas</option>
            <option value="pending">Pendientes</option>
            <option value="overdue">Vencidas</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Nueva Factura
        </button>
      </div>

      {/* Invoices List */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-700">
                  <th className="pb-3 text-slate-400">Número</th>
                  <th className="pb-3 text-slate-400">Cliente</th>
                  <th className="pb-3 text-slate-400">Fecha</th>
                  <th className="pb-3 text-slate-400">Monto</th>
                  <th className="pb-3 text-slate-400">Estado</th>
                  <th className="pb-3 text-slate-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-700">
                    <td className="py-4 text-white">{invoice.number}</td>
                    <td className="py-4 text-white">{invoice.client}</td>
                    <td className="py-4 text-white">{invoice.date}</td>
                    <td className="py-4 text-white">
                      RD$ {invoice.amount.toLocaleString()}
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-400 hover:text-blue-300">
                          Ver
                        </button>
                        <button className="p-2 text-green-400 hover:text-green-300">
                          Pagar
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-300">
                          Imprimir
                        </button>
                      </div>
                    </td>
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
