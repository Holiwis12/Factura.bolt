export type Company = {
  id: string
  name: string
  rncNumber: string
  address: string
  phone: string
  email: string
  logo?: string
  settings: {
    currency: string
    taxRate: number
    telegramEnabled: boolean
    telegramChatId?: string
  }
  createdAt: string
  updatedAt: string
}

export type CompanyContextType = {
  currentCompany: Company | null
  loading: boolean
  error: string | null
  switchCompany: (companyId: string) => Promise<void>
  updateCompanySettings: (settings: Partial<Company['settings']>) => Promise<void>
}
