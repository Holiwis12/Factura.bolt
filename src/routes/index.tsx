import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminLayout } from '../layouts/AdminLayout'
import { CompanyLayout } from '../layouts/CompanyLayout'
import { useAuth } from '../features/auth/AuthProvider'

// Admin Pages
import { AdminDashboard } from '../features/admin/pages/Dashboard'
import { CompanyManagement } from '../features/admin/pages/CompanyManagement'
import { UserManagement } from '../features/admin/pages/UserManagement'

// Company Pages
import { CompanyDashboard } from '../features/dashboard/pages/Dashboard'
import { Invoices } from '../features/invoicing/pages/Invoices'
import { Inventory } from '../features/inventory/pages/Inventory'
import { Accounting } from '../features/accounting/pages/Accounting'
import { Settings } from '../features/settings/pages/Settings'

export function AppRoutes() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <Routes>
      {/* Admin Routes */}
      {user.role === 'admin' && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="companies" element={<CompanyManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
      )}

      {/* Company Routes */}
      <Route path="/company" element={<CompanyLayout />}>
        <Route index element={<CompanyDashboard />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="accounting" element={<Accounting />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Redirect based on role */}
      <Route
        path="/"
        element={
          <Navigate
            to={user.role === 'admin' ? '/admin' : '/company'}
            replace
          />
        }
      />
    </Routes>
  )
}
