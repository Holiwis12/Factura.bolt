import { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Select } from 'src/components/ui/select'

export function InvoiceForm() {
  const [items, setItems] = useState<Array<{
    productId: string
    quantity: number
    price: number
    itbis: number
    discount: number
  }>>([])

  const addItem = () => {
    setItems([...items, {
      productId: '',
      quantity: 1,
      price: 0,
      itbis: 18,
      discount: 0
    }])
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="client">Cliente</Label>
          <Input id="client" placeholder="Buscar cliente..." />
        </div>
        <div>
          <Label htmlFor="ncf">NCF</Label>
          <Select id="ncf">
            <option value="B01">B01 - Factura de Crédito Fiscal</option>
            <option value="B02">B02 - Factura de Consumo</option>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Productos</h3>
          <Button onClick={addItem}>Agregar Producto</Button>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <Input placeholder="Buscar producto..." />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="Cantidad" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="Precio" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="ITBIS %" />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <Button variant="destructive">X</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button>Generar Factura</Button>
      </div>
    </div>
  )
}
