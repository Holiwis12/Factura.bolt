import { createBrowserRouter } from 'react-router-dom'
import { AuthGuard } from '@/components/layout/AuthGuard'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { MainLayout } from '@/layouts/MainLayout'
import { Dashboard } from '@/pages/Dashboard'
import { Login } from '@/pages/Login'
import { Organizations } from '@/pages/Organizations'
import { Clients } from '@/pages/Clients'
import { Products } from '@/pages/Products'
import { Invoices } from '@/pages/Invoices'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        )
      },
      {
        path: 'organizations',
        element: (
          <AuthGuard requiredRole="global_admin">
            <Organizations />
          </AuthGuard>
        )
      },
      {
        path: 'clients',
        element: (
          <AuthGuard>
            <Clients />
          </AuthGuard>
        )
      },
      {
        path: 'products',
        element: (
          <AuthGuard>
            <Products />
          </AuthGuard>
        )
      },
      {
        path: 'invoices',
        element: (
          <AuthGuard>
            <Invoices />
          </AuthGuard>
        )
      }
    ]
  }
])
