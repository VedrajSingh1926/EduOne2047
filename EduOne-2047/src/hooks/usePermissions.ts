import { useMemo } from 'react';
import { CurrentUser, Role } from '../types';
import { ROLE_CONFIGS, Permission } from '../config/rbac';

export const useRole = (user: CurrentUser | null) => {
  return useMemo(() => user?.role || null, [user]);
};

export const usePermissions = (user: CurrentUser | null) => {
  return useMemo(() => {
    if (!user || !user.role) return [];
    const config = ROLE_CONFIGS[user.role];
    return config ? config.permissions : [];
  }, [user]);
};

export const hasPermission = (user: CurrentUser | null, permission: Permission): boolean => {
  if (!user || !user.role) return false;
  const config = ROLE_CONFIGS[user.role];
  if (!config) return false;
  return config.permissions.includes(permission);
};

export const canAccess = (user: CurrentUser | null, routePermission?: Permission): boolean => {
  if (!routePermission) return true; // If no permission specified, route is public to authenticated users
  return hasPermission(user, routePermission);
};

export const getDefaultDashboard = (role: Role): string => {
  return ROLE_CONFIGS[role]?.defaultDashboard || 'dashboard';
};
