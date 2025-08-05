import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '../components/admin/AdminSidebar'
import { AdminTopbar } from '../components/admin/AdminTopbar'

export function AdminLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
