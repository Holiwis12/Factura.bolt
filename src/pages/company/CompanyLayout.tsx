import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CompanySidebar } from '../../components/company/CompanySidebar'
import { CompanyTopbar } from '../../components/company/CompanyTopbar'

export function CompanyLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    console.log('Toggle clicked, current state:', isMobileSidebarOpen)
    setIsMobileSidebarOpen(prev => !prev)
  }

  const handleMobileMenuClose = () => {
    console.log('Closing mobile menu')
    setIsMobileSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <CompanySidebar 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={handleMobileMenuClose}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          <CompanyTopbar onMobileMenuToggle={handleMobileMenuToggle} />
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
