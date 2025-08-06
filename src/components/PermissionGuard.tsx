import { ReactNode } from 'react';
import { useAuth } from '../features/auth/AuthProvider';
import type { UserPermissions } from '../features/auth/types';

interface PermissionGuardProps {
  children: ReactNode;
  permission?: keyof UserPermissions;
  module?: keyof UserPermissions;
  fallback?: ReactNode;
  requireAll?: boolean; // Si necesita todos los permisos (AND) o solo uno (OR)
}

export function PermissionGuard({ 
  children, 
  permission, 
  module, 
  fallback = null,
  requireAll = false 
}: PermissionGuardProps) {
  const { hasPermission, hasModuleAccess } = useAuth();

  // Si no se especifica ningún permiso, mostrar el contenido
  if (!permission && !module) {
    return <>{children}</>;
  }

  let hasAccess = true;

  if (requireAll) {
    // Requiere TODOS los permisos especificados
    if (permission && !hasPermission(permission)) hasAccess = false;
    if (module && !hasModuleAccess(module)) hasAccess = false;
  } else {
    // Requiere AL MENOS UNO de los permisos especificados
    hasAccess = false;
    if (permission && hasPermission(permission)) hasAccess = true;
    if (module && hasModuleAccess(module)) hasAccess = true;
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

// Hook para usar en componentes
export function usePermissions() {
  const { hasPermission, hasModuleAccess, user } = useAuth();

  const canAccess = (permission: keyof UserPermissions) => hasPermission(permission);
  const canAccessModule = (module: keyof UserPermissions) => hasModuleAccess(module);
  
  const getUserRole = () => user?.role || 'employee';
  const isRole = (role: string) => user?.role === role;

  return {
    canAccess,
    canAccessModule,
    getUserRole,
    isRole,
    user
  };
}
