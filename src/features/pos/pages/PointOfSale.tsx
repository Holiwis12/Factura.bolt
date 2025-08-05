import { useState } from 'react'
import { Card } from '../../../components/ui/card'
import { Plus, Minus, ShoppingCart, CreditCard, DollarSign, Trash2 } from 'lucide-react'

type Product = {
  id: string
  name: string
  price: number
  stock: number
  category: string
  image?: string
}

type CartItem = {
  product: Product
  quantity: number
}

const mockProducts: Product[] = [
  { id: '1', name: 'Laptop HP', price: 45000, stock: 15, category: 'Electrónicos' },
  { id: '2', name: 'Mouse Inalámbrico', price: 1200, stock: 50, category: 'Accesorios' },
  { id: '3', name: 'Teclado Mecánico', price: 3500, stock: 25, category: 'Accesorios' },
  { id: '4', name: 'Monitor 24"', price: 18000, stock: 8, category: 'Electrónicos' },
  { id: '5', name: 'Impresora Multifuncional', price: 12000, stock: 12, category: 'Oficina' },
  { id: '6', name: 'Disco Duro Externo 1TB', price: 4500, stock: 30, category: 'Almacenamiento' },
  { id: '7', name: 'Webcam HD', price: 2800, stock: 20, category: 'Accesorios' },
  { id: '8', name: 'Auriculares Bluetooth', price: 3200, stock: 35, category: 'Audio' }
]

export function PointOfSale() {
  const [products] = useState<Product[]>(mockProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id)
    
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      }
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.product.id !== productId))
    } else {
      const product = products.find(p => p.id === productId)
      if (product && newQuantity <= product.stock) {
        setCart(cart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        ))
      }
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId))
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cart.length === 0) return
    
    alert(`Venta procesada por RD$ ${getTotalAmount().toLocaleString()}`)
    setCart([])
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      {/* Products Section */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 text-white">
          <h1 className="text-3xl font-bold">Punto de Venta</h1>
          <p className="opacity-90">Selecciona productos para vender</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          >
            <option value="all">Todas las categorías</option>
            {categories.filter(cat => cat !== 'all').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-slate-600 cursor-pointer transition-colors"
              onClick={() => addToCart(product)}
            >
              <div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {product.name.charAt(0)}
                </div>
              </div>
              <h3 className="font-medium text-white text-sm mb-1">{product.name}</h3>
              <p className="text-slate-400 text-xs mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-bold">RD$ {product.price.toLocaleString()}</span>
                <span className="text-slate-400 text-xs">Stock: {product.stock}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96">
        <Card className="h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex flex-col">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="text-green-400" size={24} />
              <h2 className="text-xl font-bold text-white">Carrito</h2>
              {getTotalItems() > 0 && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center text-slate-400 mt-8">
                <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                <p>Carrito vacío</p>
                <p className="text-sm">Selecciona productos para agregar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white text-sm">{item.product.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center text-white"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded-lg flex items-center justify-center text-white"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="text-green-400 font-bold">
                        RD$ {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-700">
              <div className="mb-4">
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>Total:</span>
                  <span>RD$ {getTotalAmount().toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Procesar Venta
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
