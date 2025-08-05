import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { useNotifications } from '../../features/notifications'
import type { Notification } from '../../features/notifications/context/NotificationsContext'

interface NotificationItemProps {
  notification: Notification
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const colorMap = {
  success: 'bg-green-500 border-green-600',
  error: 'bg-red-500 border-red-600',
  warning: 'bg-yellow-500 border-yellow-600',
  info: 'bg-blue-500 border-blue-600',
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { removeNotification } = useNotifications()
  const Icon = iconMap[notification.type]

  useEffect(() => {
    // Auto-remove notification after 5 seconds for toast-style notifications
    const timer = setTimeout(() => {
      removeNotification(notification.id)
    }, 5000)

    return () => clearTimeout(timer)
  }, [notification.id, removeNotification])

  const handleRemove = () => {
    removeNotification(notification.id)
  }

  return (
    <div className={`
      ${colorMap[notification.type]}
      border rounded-lg p-4 shadow-lg backdrop-blur-sm
      transform transition-all duration-300 ease-in-out
      animate-in slide-in-from-right-full
    `}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm">
            {notification.title}
          </h4>
          <p className="text-white/90 text-sm mt-1">
            {notification.message}
          </p>
        </div>

        <button
          onClick={handleRemove}
          className="text-white/80 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
