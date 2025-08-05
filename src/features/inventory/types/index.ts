export type Product = {
  id: string
  companyId: string
  name: string
  description?: string
  sku: string
  price: number
  cost: number
  stock: number
  minStock: number
  unit: string
  category: string
  createdAt: string
  updatedAt: string
}

export type InventoryContextType = {
  products: Product[]
  loading: boolean
  error: string | null
  createProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  updateStock: (id: string, quantity: number) => Promise<void>
}
