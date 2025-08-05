export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'cancelled'

export type InvoiceItem = {
  productId: string
  quantity: number
  price: number
  tax: number
  discount?: number
  total: number
}

export type Invoice = {
  id: string
  number: string
  clientId: string
  companyId: string
  status: InvoiceStatus
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export type InvoiceContextType = {
  invoices: Invoice[]
  loading: boolean
  error: string | null
  createInvoice: (data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateInvoice: (id: string, data: Partial<Invoice>) => Promise<void>
  deleteInvoice: (id: string) => Promise<void>
  sendToTelegram: (id: string) => Promise<void>
}
