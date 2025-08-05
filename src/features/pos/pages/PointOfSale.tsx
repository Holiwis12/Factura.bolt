import { ShoppingCart, Plus, Minus, Search, CreditCard, DollarSign, Receipt } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
}

interface CartItem extends Product {
  quantity: number
}

const mockProducts: Product[] = [
  { id: '1', name: 'Laptop HP', price: 2500, stock: 10, category: 'Electrónicos' },
  { id: '2', name: 'Mouse Logitech', price: 45, stock: 25, category: 'Accesorios' },
  { id: '3', name: 'Teclado Mecánico', price: 120, stock: 15, category: 'Accesorios' },
  { id: '4', name: 'Monitor 24"', price: 350, stock: 8, category: 'Electrónicos' },
  { id: '5', name: 'Impresora Canon', price: 180, stock: 12, category: 'Oficina' },
  { id: '6', name: 'Webcam HD', price: 75, stock: 20, category: 'Accesorios' }
]

export function PointOfSale() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id))
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    alert('Procesando venta...')
    setCart([])
  }

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Punto de Venta</h1>
          <p className="text-slate-400">Gestiona las ventas de tu empresa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => addToCart(product)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{product.name}</h3>
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-400">S/ {product.price}</span>
                  <span className="text-sm text-slate-400">Stock: {product.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart size={20} className="text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Carrito de Compras</h2>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
            {cart.length === 0 ? (
              <p className="text-slate-400 text-center py-8">Carrito vacío</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-slate-700 rounded-lg p-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm">{item.name}</h4>
                    <p className="text-slate-400 text-xs">S/ {item.price} c/u</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-white w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <>
              <div className="border-t border-slate-700 pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total:</span>
                  <span className="text-xl font-bold text-green-400">S/ {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
                >
                  <CreditCard size={18} />
                  Procesar Venta
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  <Receipt size={18} />
                  Generar Factura
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
