import { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Select } from 'src/components/ui/select'
import { Card } from 'src/components/ui/card'
import { supabase } from 'src/lib/supabase'

interface InvoiceItem {
  productId: string
  quantity: number
  price: number
  itbis: number
  discount: number
}

export function InvoiceForm() {
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [loading, setLoading] = useState(false)
  const [client, setClient] = useState('')
  const [ncf, setNcf] = useState('B01')

  const addItem = () => {
    setItems([...items, {
      productId: '',
      quantity: 1,
      price: 0,
      itbis: 18,
      discount: 0
    }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: number | string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const subtotal = item.quantity * item.price
      const itbisAmount = subtotal * (item.itbis / 100)
      const discountAmount = subtotal * (item.discount / 100)
      return total + subtotal + itbisAmount - discountAmount
    }, 0)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('invoices')
        .insert({
          client,
          ncf,
          items,
          total: calculateTotal(),
          created_at: new Date()
        })
      
      if (error) throw error
      
      // Reset form
      setItems([])
      setClient('')
      setNcf('B01')
      
    } catch (error) {
      console.error('Error creating invoice:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-card">
      <h2 className="text-2xl font-bold text-foreground mb-6">Nueva Factura</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="client">Cliente</Label>
            <Input
              id="client"
              placeholder="Buscar cliente..."
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="bg-input"
            />
          </div>
          <div>
            <Label htmlFor="ncf">NCF</Label>
            <Select
              id="ncf"
              value={ncf}
              onChange={(e) => setNcf(e.target.value)}
              className="bg-input"
            >
              <option value="B01">B01 - Factura de Crédito Fiscal</option>
              <option value="B02">B02 - Factura de Consumo</option>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground">Productos</h3>
            <Button onClick={addItem} variant="outline">
              Agregar Producto
            </Button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 p-4 rounded-lg border border-border">
              <div className="col-span-4">
                <Input
                  placeholder="Buscar producto..."
                  value={item.productId}
                  onChange={(e) => updateItem(index, 'productId', e.target.value)}
                  className="bg-input"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="Cantidad"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                  className="bg-input"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="Precio"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                  className="bg-input"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="ITBIS %"
                  value={item.itbis}
                  onChange={(e) => updateItem(index, 'itbis', Number(e.target.value))}
                  className="bg-input"
                />
              </div>
              <div className="col-span-1">
                <Input
                  type="number"
                  placeholder="Desc %"
                  value={item.discount}
                  onChange={(e) => updateItem(index, 'discount', Number(e.target.value))}
                  className="bg-input"
                />
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(index)}
                >
                  X
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div className="text-lg font-semibold">
            Total: RD$ {calculateTotal().toFixed(2)}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading || items.length === 0}
            className="bg-primary"
          >
            {loading ? 'Generando...' : 'Generar Factura'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
