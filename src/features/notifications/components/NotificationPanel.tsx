import { useEffect, useRef } from 'react'
import { Bell, X, Trash2, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { useNotifications } from '../context/NotificationsContext'

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const colorMap = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400',
}

export function NotificationPanel() {
  const { 
    notifications, 
    unreadCount, 
    isOpen, 
    markAsRead, 
    removeNotification,
    clearAll, 
    closePanel 
  } = useNotifications()
  
  const panelRef = useRef<HTMLDivElement>(null)

  // Close panel when clicking outside - PERO NO en la campanita
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element
      
      // No cerrar si se hace clic en la campanita o sus elementos hijos
      if (target.closest('[aria-label="Notificaciones"]')) {
        return
      }
      
      if (panelRef.current && !panelRef.current.contains(target)) {
        console.log('Clicking outside panel, closing...')
        closePanel()
      }
    }

    if (isOpen) {
      // Pequeño delay para evitar que se cierre inmediatamente después de abrir
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 100)
      
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, closePanel])

  if (!isOpen) return null

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Ahora'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    return `${days}d`
  }

  const handleNotificationClick = (id: string) => {
    markAsRead(id)
  }

  const handleRemoveNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    removeNotification(id)
  }

  const handleClosePanel = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('Close button clicked')
    closePanel()
  }

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    clearAll()
  }

  return (
    <div 
      ref={panelRef}
      className="absolute right-0 top-12 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-slate-400" />
          <h3 className="font-medium text-white">Notificaciones</h3>
          {unreadCount > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              title="Limpiar todas"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button
            onClick={handleClosePanel}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            title="Cerrar panel"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell size={48} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No hay notificaciones</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {notifications.map((notification) => {
              const Icon = iconMap[notification.type]
              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`p-4 hover:bg-slate-700/50 cursor-pointer transition-colors group ${
                    !notification.read ? 'bg-slate-700/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colorMap[notification.type]}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-sm font-medium ${
                          notification.read ? 'text-slate-300' : 'text-white'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-slate-500">
                            {formatTime(notification.timestamp)}
                          </span>
                          <button
                            onClick={(e) => handleRemoveNotification(e, notification.id)}
                            className="text-slate-500 hover:text-slate-300 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                            title="Eliminar notificación"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${
                        notification.read ? 'text-slate-400' : 'text-slate-300'
                      }`}>
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
