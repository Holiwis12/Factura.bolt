import { useState } from 'react'
import { Card } from '../../../components/ui/card'
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react'

type Customer = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  totalPurchases: number
  lastPurchase: string
  status: 'active' | 'inactive'
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '809-555-0123',
    address: 'Av. Winston Churchill 1234',
    city: 'Santo Domingo',
    totalPurchases: 125000,
    lastPurchase: '2024-03-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria.garcia@email.com',
    phone: '809-555-0456',
    address: 'Calle El Conde 567',
    city: 'Santo Domingo',
    totalPurchases: 89500,
    lastPurchase: '2024-03-12',
    status: 'active'
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '809-555-0789',
    address: 'Av. 27 de Febrero 890',
    city: 'Santiago',
    totalPurchases: 45000,
    lastPurchase: '2024-02-28',
    status: 'inactive'
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '809-555-0321',
    address: 'Calle Duarte 123',
    city: 'La Vega',
    totalPurchases: 67800,
    lastPurchase: '2024-03-10',
    status: 'active'
  }
]

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  const handleDeleteCustomer = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      setCustomers(customers.filter(c => c.id !== id))
    }
  }

  const getStatusColor = (status: Customer['status']) => {
    return status === 'active' 
      ? 'bg-green-500/10 text-green-400' 
      : 'bg-red-500/10 text-red-400'
  }

  const getStatusText = (status: Customer['status']) => {
    return status === 'active' ? 'Activo' : 'Inactivo'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <p className="opacity-90">Gestión de clientes y contactos</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Total Clientes</h3>
          <p className="mt-2 text-2xl font-bold text-white">{customers.length}</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Clientes Activos</h3>
          <p className="mt-2 text-2xl font-bold text-white">
            {customers.filter(c => c.status === 'active').length}
          </p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Ventas Totales</h3>
          <p className="mt-2 text-2xl font-bold text-white">
            RD$ {customers.reduce((sum, c) => sum + c.totalPurchases, 0).toLocaleString()}
          </p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h3 className="text-sm font-medium text-slate-400">Promedio por Cliente</h3>
          <p className="mt-2 text-2xl font-bold text-white">
            RD$ {Math.round(customers.reduce((sum, c) => sum + c.totalPurchases, 0) / customers.length).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white w-80"
          />
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus size={20} />
          Nuevo Cliente
        </button>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{customer.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(customer.status)}`}>
                    {getStatusText(customer.status)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingCustomer(customer)}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail size={14} />
                {customer.email}
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone size={14} />
                {customer.phone}
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin size={14} />
                {customer.city}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Compras:</span>
                <span className="text-white font-medium">RD$ {customer.totalPurchases.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-slate-400">Última Compra:</span>
                <span className="text-white">{customer.lastPurchase}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No se encontraron clientes</p>
        </div>
      )}
    </div>
  )
}
