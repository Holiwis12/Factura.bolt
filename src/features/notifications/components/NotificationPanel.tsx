import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCheck, Trash2, X } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

export function NotificationPanel() {
  const { notifications, isOpen, togglePanel, markAllAsRead, clearAll, markAsRead } = useNotifications();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100]" 
        onClick={togglePanel}
      />
      
      {/* Panel */}
      <div className="absolute right-0 top-12 w-96 bg-gray-800 rounded-lg shadow-lg z-[101] border border-gray-700">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="font-medium">Notificaciones</h3>
          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
              title="Marcar todas como leídas"
            >
              <CheckCheck size={16} />
            </button>
            <button
              onClick={clearAll}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
              title="Eliminar todas"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={togglePanel}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No hay notificaciones
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${
                    notification.read ? 'bg-gray-800' : 'bg-gray-800/50'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      notification.type === 'error' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {format(new Date(notification.time), 'PPp', { locale: es })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
