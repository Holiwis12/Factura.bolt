import { createContext, useState, useCallback, ReactNode, useContext } from 'react'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'warning' | 'info' | 'error'
  timestamp: Date
  read: boolean
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  isOpen: boolean
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  clearAll: () => void
  togglePanel: () => void
  closePanel: () => void
}

export const NotificationsContext = createContext<NotificationsContextType | null>(null)

// Hook personalizado
export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider')
  }
  return context
}

// Mock notifications for demo
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nueva factura generada',
    message: 'Se ha generado la factura F001-00123 por S/ 1,250.00',
    type: 'success',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false
  },
  {
    id: '2',
    title: 'Pago pendiente',
    message: 'El cliente Juan Pérez tiene un pago pendiente de S/ 850.00',
    type: 'warning',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false
  },
  {
    id: '3',
    title: 'Stock bajo',
    message: 'El producto "Mouse Logitech" tiene solo 3 unidades en stock',
    type: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true
  },
  {
    id: '4',
    title: 'Backup completado',
    message: 'La copia de seguridad diaria se ha completado exitosamente',
    type: 'info',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true
  }
]

interface NotificationsProviderProps {
  children: ReactNode
}

export function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    setIsOpen(false)
  }, [])

  const togglePanel = useCallback(() => {
    console.log('Toggle panel called, current state:', isOpen)
    setIsOpen(prev => {
      const newState = !prev
      console.log('Setting panel to:', newState)
      return newState
    })
  }, [isOpen])

  const closePanel = useCallback(() => {
    console.log('Close panel called')
    setIsOpen(false)
  }, [])

  const value: NotificationsContextType = {
    notifications,
    unreadCount,
    isOpen,
    addNotification,
    removeNotification,
    markAsRead,
    clearAll,
    togglePanel,
    closePanel
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}
