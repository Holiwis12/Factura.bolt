import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CompanySidebar } from '../components/company/CompanySidebar'
import { CompanyTopbar } from '../components/company/CompanyTopbar'
import { NotificationsProvider } from '../features/notifications'

export function CompanyLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <NotificationsProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex">
        <CompanySidebar 
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={handleMobileMenuClose}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <CompanyTopbar onMobileMenuToggle={handleMobileMenuToggle} />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </NotificationsProvider>
  )
}
