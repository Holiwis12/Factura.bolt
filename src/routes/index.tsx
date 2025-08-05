import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminLayout } from '../layouts/AdminLayout'
import { CompanyLayout } from '../layouts/CompanyLayout'
import { useAuth } from '../features/auth/AuthProvider'
import { Suspense } from 'react'

// Admin Pages (Software Owner)
import { AdminDashboard } from '../features/admin/pages/Dashboard'
import { CompanyManagement } from '../features/admin/pages/CompanyManagement'
import { UserManagement } from '../features/admin/pages/UserManagement'

// Company Pages
import { CompanyDashboard } from '../features/dashboard/pages/Dashboard'
import { CompanyProfile } from '../features/company/pages/CompanyProfile'
import { PointOfSale } from '../features/pos/pages/PointOfSale'
import { Invoices } from '../features/invoicing/pages/Invoices'
import { Inventory } from '../features/inventory/pages/Inventory'
import { Customers } from '../features/customers/pages/Customers'
import { Payments } from '../features/payments/pages/Payments'
import { Accounting } from '../features/accounting/pages/Accounting'
import { Reports } from '../features/reports/pages/Reports'
import { Settings } from '../features/settings/pages/Settings'

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  )
}

export function AppRoutes() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Software Owner Routes (adminpro) */}
        {user.role === 'software_owner' && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="companies" element={<CompanyManagement />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        )}

        {/* Company Routes (Owner, Employees, Demo) */}
        {(user.role === 'company_owner' || user.role === 'employee' || user.role === 'demo') && (
          <Route path="/company" element={<CompanyLayout />}>
            <Route index element={<CompanyDashboard />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="pos" element={<PointOfSale />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="customers" element={<Customers />} />
            <Route path="payments" element={<Payments />} />
            <Route path="accounting" element={<Accounting />} />
            <Route path="reports" element={<Reports />} />
            <Route path="analytics" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        )}

        {/* Redirect based on role */}
        <Route
          path="/"
          element={
            <Navigate
              to={user.role === 'software_owner' ? '/admin' : '/company'}
              replace
            />
          }
        />

        {/* Catch all route */}
        <Route
          path="*"
          element={
            <Navigate
              to={user.role === 'software_owner' ? '/admin' : '/company'}
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  )
}
