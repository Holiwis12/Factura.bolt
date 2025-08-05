import { useState } from 'react'
import { Card } from '../../../components/ui/card'
import { LineChart } from '../../../components/charts'

type Transaction = {
  id: string
  date: string
  description: string
  type: 'income' | 'expense'
  category: string
  amount: number
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15',
    description: 'Venta de productos',
    type: 'income',
    category: 'Ventas',
    amount: 25000
  },
  {
    id: '2',
    date: '2024-03-14',
    description: 'Pago de servicios',
    type: 'expense',
    category: 'Servicios',
    amount: 3500
  },
  {
    id: '3',
    date: '2024-03-13',
    description: 'Pago de nómina',
    type: 'expense',
    category: 'Nómina',
    amount: 12000
  }
]

const cashFlowData = [
  { name: 'Ene', income: 45000, expenses: 32000 },
  { name: 'Feb', income: 38000, expenses: 28000 },
  { name: 'Mar', income: 52000, expenses: 35000 },
  { name: 'Abr', income: 48000, expenses: 30000 },
  { name: 'May', income: 55000, expenses: 38000 },
  { name: 'Jun', income: 62000, expenses: 42000 }
]

export function Accounting() {
  const [transactions] = useState<Transaction[]>(mockTransactions)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Contabilidad</h1>
        <p className="opacity-90">Control de ingresos y gastos</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Balance Total</h3>
          <p className="mt-2 text-2xl font-bold text-white">RD$ 125,000</p>
          <p className="mt-2 text-sm text-green-400">+15.3% este mes</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Ingresos del Mes</h3>
          <p className="mt-2 text-2xl font-bold text-white">RD$ 62,000</p>
          <p className="mt-2 text-sm text-green-400">+8.2% vs mes anterior</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Gastos del Mes</h3>
          <p className="mt-2 text-2xl font-bold text-white">RD$ 42,000</p>
          <p className="mt-2 text-sm text-red-400">+5.1% vs mes anterior</p>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <h3 className="text-lg font-medium mb-4 text-white">Flujo de Efectivo</h3>
        <LineChart data={cashFlowData} />
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4 text-white">Transacciones Recientes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-700">
                  <th className="pb-3 text-slate-400">Fecha</th>
                  <th className="pb-3 text-slate-400">Descripción</th>
                  <th className="pb-3 text-slate-400">Categoría</th>
                  <th className="pb-3 text-slate-400">Tipo</th>
                  <th className="pb-3 text-slate-400">Monto</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-slate-700">
                    <td className="py-4 text-white">{transaction.date}</td>
                    <td className="py-4 text-white">{transaction.description}</td>
                    <td className="py-4 text-white">{transaction.category}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        transaction.type === 'income'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
                      </span>
                    </td>
                    <td className="py-4 text-white">
                      RD$ {transaction.amount.toLocaleString()}
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
