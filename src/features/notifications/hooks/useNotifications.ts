import { useContext } from 'react';
import { NotificationsContext } from '../context/NotificationsContext';
import type { NotificationsContextType } from '../types';

export function useNotifications(): NotificationsContextType {
  const context = useContext(NotificationsContext);
  
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }
  
  return context;
}
