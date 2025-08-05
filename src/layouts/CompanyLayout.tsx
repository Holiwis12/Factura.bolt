import { Outlet } from 'react-router-dom'
import { CompanySidebar } from '../components/company/CompanySidebar'
import { CompanyTopbar } from '../components/company/CompanyTopbar'

export function CompanyLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <CompanySidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <CompanyTopbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
