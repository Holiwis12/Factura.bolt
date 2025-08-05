import { BrowserRouter as Router } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { NotificationsProvider } from './features/notifications/context/NotificationsContext'
import { AuthProvider } from './features/auth/AuthProvider'

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationsProvider>
          <MainLayout />
        </NotificationsProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
