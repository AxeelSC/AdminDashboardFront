// Estructura genérica de respuesta de tu API (esto deberia ir en archivos separados pero lo voy a dejar asi por el momento)
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[];
}

export interface RoleDto {
  id: number;
  name: string;
  description: string;
}

export interface CreateRoleDto {
  name: string;
  description: string;
}

export interface UpdateRoleDto {
  name: string;
  description: string;
}

export interface UserSummaryDto {
  id: number;
  username: string;
  email: string;
  roles: string[];
}
export interface UserDto extends UserSummaryDto {
  createdAt: string;
  isActive: boolean;
}

// Auth
export interface LoginRequestDto {
  username: string;
  password: string;
}
export interface LoginResponseDto {
  token: string;
  user: UserDto;
  expiresAt: string;
  refreshToken?: string | null;
}

// Teams
export interface TeamDto {
  id: number;
  name: string;
  managerId?: number | null;
}

// Team Requests
export type TeamRequestStatus = 'Pending' | 'Approved' | 'Rejected';
export interface TeamRequestDto {
  id: number;
  teamId: number;
  userId: number;
  status: TeamRequestStatus;
  createdAt: string;
}

// Audit Logs
export interface AuditLogDto {
  id: number;
  userId: number;
  action: string;
  createdAt: string;
  meta?: any;
}
