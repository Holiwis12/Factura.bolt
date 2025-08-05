import { Table } from 'src/components/ui/table'

export function InventoryTable() {
  const inventory = [
    {
      id: '1',
      code: 'PROD-001',
      name: 'Producto Ejemplo',
      stock: 100,
      minStock: 50,
      unit: 'unidad',
      price: 500
    }
  ]

  return (
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
            <Table.Cell className={item.stock < item.minStock ? 'text-red-500' : ''}>
              {item.stock} {item.unit}
            </Table.Cell>
            <Table.Cell>{item.unit}</Table.Cell>
            <Table.Cell>RD$ {item.price.toFixed(2)}</Table.Cell>
            <Table.Cell>
              <Button variant="ghost">Editar</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
