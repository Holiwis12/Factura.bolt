import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './features/auth/AuthProvider'
import { NotificationsProvider } from './features/notifications/context/NotificationsContext'
import { NotificationContainer } from './components/notifications/NotificationContainer'
import { AppRoutes } from './routes'
import { LoginPage } from './features/auth/pages/LoginPage'
import { useAuth } from './features/auth/AuthProvider'
import { ErrorBoundary } from './components/common/ErrorBoundary'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return (
    <>
      <AppRoutes />
      <NotificationContainer />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <NotificationsProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </NotificationsProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
