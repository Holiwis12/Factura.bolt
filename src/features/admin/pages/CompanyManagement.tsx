import { useState } from 'react'
import { Card } from '../../../components/ui/card'

type Company = {
  id: string
  name: string
  status: 'active' | 'inactive'
  users: number
  lastActive: string
}

const mockCompanies: Company[] = [
  { id: '1', name: 'Empresa ABC', status: 'active', users: 12, lastActive: '2024-03-15' },
  { id: '2', name: 'Servicios XYZ', status: 'active', users: 8, lastActive: '2024-03-14' },
  { id: '3', name: 'Consultora 123', status: 'inactive', users: 5, lastActive: '2024-03-10' },
]

export function CompanyManagement() {
  const [companies] = useState<Company[]>(mockCompanies)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Gestión de Empresas</h1>
        <p className="opacity-90">Administra las empresas registradas en el sistema</p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar empresa..."
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
            <option value="all">Todos los estados</option>
            <option value="active">Activas</option>
            <option value="inactive">Inactivas</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Nueva Empresa
        </button>
      </div>

      {/* Companies List */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-700">
                  <th className="pb-3 text-slate-400">Empresa</th>
                  <th className="pb-3 text-slate-400">Estado</th>
                  <th className="pb-3 text-slate-400">Usuarios</th>
                  <th className="pb-3 text-slate-400">Última Actividad</th>
                  <th className="pb-3 text-slate-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id} className="border-b border-slate-700">
                    <td className="py-4 text-white">{company.name}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        company.status === 'active' 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {company.status === 'active' ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="py-4 text-white">{company.users}</td>
                    <td className="py-4 text-white">{company.lastActive}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-400 hover:text-blue-300">
                          Editar
                        </button>
                        <button className="p-2 text-red-400 hover:text-red-300">
                          Desactivar
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
