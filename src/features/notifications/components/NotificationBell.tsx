import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationPanel } from './NotificationPanel';

export function NotificationBell() {
  const { unreadCount, togglePanel } = useNotifications();

  return (
    <div className="relative">
      <button
        onClick={togglePanel}
        className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      <NotificationPanel />
    </div>
  );
}
