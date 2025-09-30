// menu.config.ts
import { MenuItem } from './menu-item.model';

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Usuarios', icon: 'people', route: '/dashboard/users' },
  { label: 'Roles', icon: 'verified_user', route: '/dashboard/roles' },
  { label: 'Equipos', icon: 'groups', route: '/dashboard/teams' },
  { label: 'Team Requests', icon: 'mail', route: '/dashboard/requests' },
  { label: 'AuditLogs', icon: 'history', route: '/dashboard/auditlogs' },
  { label: 'Configuración', icon: 'settings', route: '/dashboard/settings' }
];
