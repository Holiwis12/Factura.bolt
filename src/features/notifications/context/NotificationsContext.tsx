import { createContext, useState, useEffect, ReactNode } from 'react';
import type { Notification, NotificationsContextType, NotificationsState } from '../types';

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
  isOpen: false
};

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NotificationsState>(initialState);

  // Calcular contador de no leídos cuando cambian las notificaciones
  useEffect(() => {
    const unreadCount = state.items.filter(n => !n.read).length;
    setState(prev => ({ ...prev, unreadCount }));
  }, [state.items]);

  const togglePanel = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const markAsRead = (id: string) => {
    setState(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, read: true } : item
      )
    }));
  };

  const markAllAsRead = () => {
    setState(prev => ({
      ...prev,
      items: prev.items.map(item => ({ ...item, read: true }))
    }));
  };

  const clearAll = () => {
    setState(prev => ({ ...prev, items: [], isOpen: false }));
  };

  // Simular algunas notificaciones para demo
  useEffect(() => {
    setState(prev => ({
      ...prev,
      items: [
        {
          id: '1',
          title: 'Nueva venta registrada',
          message: 'Se registró una venta por RD$ 12,500',
          type: 'success',
          time: new Date().toISOString(),
          read: false
        },
        {
          id: '2',
          title: 'Inventario bajo',
          message: 'El producto "Laptop HP" tiene stock bajo',
          type: 'warning',
          time: new Date(Date.now() - 3600000).toISOString(),
          read: false
        },
        {
          id: '3',
          title: 'Factura vencida',
          message: 'La factura #1234 está vencida',
          type: 'error',
          time: new Date(Date.now() - 7200000).toISOString(),
          read: true
        }
      ]
    }));
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications: state.items,
        unreadCount: state.unreadCount,
        isOpen: state.isOpen,
        togglePanel,
        markAsRead,
        markAllAsRead,
        clearAll
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
