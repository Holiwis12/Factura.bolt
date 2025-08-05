export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  read: boolean;
}

export interface NotificationsState {
  items: Notification[];
  unreadCount: number;
  isOpen: boolean;
}

export interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;
  togglePanel: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}
