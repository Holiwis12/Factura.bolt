import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getCurrentUserRole, UserRole } from '@/lib/auth'

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: UserRole
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser()
        if (!user) {
          navigate('/login')
          return
        }

        if (requiredRole) {
          const userRole = await getCurrentUserRole()
          if (!userRole || !hasPermission(userRole, requiredRole)) {
            navigate('/unauthorized')
            return
          }
        }

        setIsAuthorized(true)
      } catch (error) {
        console.error('Auth check failed:', error)
        navigate('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [navigate, requiredRole])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuthorized ? children : null
}

function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    'global_admin': 4,
    'org_admin': 3,
    'accountant': 2,
    'sales': 1,
    'inventory': 1
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}
