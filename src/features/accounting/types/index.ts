export type TransactionType = 'income' | 'expense' | 'transfer'

export type Transaction = {
  id: string
  companyId: string
  type: TransactionType
  amount: number
  description: string
  category: string
  date: string
  invoiceId?: string
  createdAt: string
  updatedAt: string
}

export type AccountingContextType = {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  createTransaction: (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  generateReport: (startDate: string, endDate: string) => Promise<void>
}
