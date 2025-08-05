import { useState } from 'react'
import { Card } from '../../../components/ui/card'

type Product = {
  id: string
  name: string
  category: string
  stock: number
  price: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Producto A',
    category: 'Electrónicos',
    stock: 45,
    price: 1200,
    status: 'in_stock'
  },
  {
    id: '2',
    name: 'Producto B',
    category: 'Oficina',
    stock: 8,
    price: 350,
    status: 'low_stock'
  },
  {
    id: '3',
    name: 'Producto C',
    category: 'Electrónicos',
    stock: 0,
    price: 800,
    status: 'out_of_stock'
  }
]

export function Inventory() {
  const [products] = useState<Product[]>(mockProducts)

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-500/10 text-green-400'
      case 'low_stock':
        return 'bg-yellow-500/10 text-yellow-400'
      case 'out_of_stock':
        return 'bg-red-500/10 text-red-400'
    }
  }

  const getStatusText = (status: Product['status']) => {
    switch (status) {
      case 'in_stock':
        return 'En Stock'
      case 'low_stock':
        return 'Stock Bajo'
      case 'out_of_stock':
        return 'Agotado'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold">Inventario</h1>
        <p className="opacity-90">Gestión de productos y existencias</p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white">
            <option value="all">Todas las categorías</option>
            <option value="electronics">Electrónicos</option>
            <option value="office">Oficina</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          Nuevo Producto
        </button>
      </div>

      {/* Products List */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-700">
                  <th className="pb-3 text-slate-400">Producto</th>
                  <th className="pb-3 text-slate-400">Categoría</th>
                  <th className="pb-3 text-slate-400">Stock</th>
                  <th className="pb-3 text-slate-400">Precio</th>
                  <th className="pb-3 text-slate-400">Estado</th>
                  <th className="pb-3 text-slate-400">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-700">
                    <td className="py-4 text-white">{product.name}</td>
                    <td className="py-4 text-white">{product.category}</td>
                    <td className="py-4 text-white">{product.stock}</td>
                    <td className="py-4 text-white">
                      RD$ {product.price.toLocaleString()}
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(product.status)}`}>
                        {getStatusText(product.status)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-400 hover:text-blue-300">
                          Editar
                        </button>
                        <button className="p-2 text-green-400 hover:text-green-300">
                          Ajustar Stock
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
