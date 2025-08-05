import { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { Table } from 'src/components/ui/table'
import { Input } from 'src/components/ui/input'
import { Card } from 'src/components/ui/card'
import { supabase } from 'src/lib/supabase'

export function InventoryTable() {
  const [inventory, setInventory] = useState([
    {
      id: '1',
      code: 'PROD-001',
      name: 'Producto Ejemplo',
      stock: 100,
      minStock: 50,
      unit: 'unidad',
      price: 500
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchInventory = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .ilike('name', `%${searchTerm}%`)
      
      if (error) throw error
      if (data) setInventory(data)
    } catch (error) {
      console.error('Error fetching inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Inventario</h2>
        <div className="flex gap-4">
          <Input
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button onClick={fetchInventory} className="bg-primary">
            Buscar
          </Button>
          <Button variant="outline">
            Nuevo Producto
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Código</Table.Head>
              <Table.Head>Nombre</Table.Head>
              <Table.Head>Stock</Table.Head>
              <Table.Head>Unidad</Table.Head>
              <Table.Head>Precio</Table.Head>
              <Table.Head>Acciones</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {inventory.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.code}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell 
                  className={item.stock < item.minStock ? 'text-destructive' : 'text-success'}
                >
                  {item.stock} {item.unit}
                </Table.Cell>
                <Table.Cell>{item.unit}</Table.Cell>
                <Table.Cell>RD$ {item.price.toFixed(2)}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Eliminar
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Card>
  )
}
