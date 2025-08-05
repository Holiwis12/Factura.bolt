import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '../components/admin/AdminSidebar'
import { AdminTopbar } from '../components/admin/AdminTopbar'

export function AdminLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    console.log('Admin toggle clicked, current state:', isMobileSidebarOpen)
    setIsMobileSidebarOpen(prev => !prev)
  }

  const handleMobileMenuClose = () => {
    console.log('Closing admin mobile menu')
    setIsMobileSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={handleMobileMenuClose}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          <AdminTopbar onMobileMenuToggle={handleMobileMenuToggle} />
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
