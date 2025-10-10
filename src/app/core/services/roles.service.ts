import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api.config';
import { ApiResponse, RoleDto, CreateRoleDto, UpdateRoleDto } from '../api.types';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RolesService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http
      .get<ApiResponse<RoleDto[]>>(`${API_CONFIG.baseUrl}/Roles`)
      .pipe(map((r) => r.data ?? []));
  }

  get(id: number) {
    return this.http
      .get<ApiResponse<RoleDto>>(`${API_CONFIG.baseUrl}/Roles/${id}`)
      .pipe(map((r) => r.data!));
  }

  byRoleName(name: string) {
    return this.http
      .get<ApiResponse<RoleDto>>(`${API_CONFIG.baseUrl}/Roles/by-name/${encodeURIComponent(name)}`)
      .pipe(map((r) => r.data!));
  }

  userRoles(userId: number) {
    return this.http
      .get<ApiResponse<RoleDto[]>>(`${API_CONFIG.baseUrl}/Roles/user/${userId}`)
      .pipe(map((r) => r.data ?? []));
  }

  create(payload: CreateRoleDto) {
    return this.http
      .post<ApiResponse<RoleDto>>(`${API_CONFIG.baseUrl}/Roles`, payload)
      .pipe(map((r) => r.data!));
  }

  update(id: number, payload: UpdateRoleDto) {
    return this.http
      .put<ApiResponse<RoleDto>>(`${API_CONFIG.baseUrl}/Roles/${id}`, payload)
      .pipe(map((r) => r.data!));
  }

  remove(id: number) {
    return this.http.delete<ApiResponse<object>>(`${API_CONFIG.baseUrl}/Roles/${id}`);
  }
}
