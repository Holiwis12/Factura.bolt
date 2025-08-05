import { useState } from 'react'
import { Card } from '../../../components/ui/card'

type User = {
  id: string
  name: string
  email: string
  role: string
  company: string
  status: 'active' | 'inactive'
}

const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'Juan Pérez', 
    email: 'juan@empresa.com',
    role: 'Administrador',
    company: 'Empresa ABC',
    status: 'active'
  },
  { 
    id: '2', 
    name: 'María García', 
    email: 'maria@xyz.com',
    role: 'Contador',
    company: 'Servicios XYZ',
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Carlos López', 
    email: 'carlos@123.com',
    role: 'Vendedor',
    company: 'Consultora 123',
    status: 'inactive'
  },
]

export function UserManagement() {
  const [users] = useState<User[]>(mockUsers)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <p className="opacity-90">Administra los usuarios del sistema</p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
            <option value="all">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="accountant">Contador</option>
            <option value="sales">Vendedor</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Nuevo Usuario
        </button>
      </div>

      {/* Users List */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-700">
                  <th className="pb-3 text-slate-400">Usuario</th>
                  <th className="pb-3 text-slate-400">Email</th>
                  <th className="pb-3 text-slate-400">Rol</th>
                  <th className="pb-3 text-slate-400">Empresa</th>
                  <th className="pb-3 text-slate-400">Estado</th>
                  <th className="pb-3 text-slate-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700">
                    <td className="py-4 text-white">{user.name}</td>
                    <td className="py-4 text-white">{user.email}</td>
                    <td className="py-4 text-white">{user.role}</td>
                    <td className="py-4 text-white">{user.company}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        user.status === 'active' 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {user.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
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
