import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api.config';
import { ApiResponse, RoleDto } from '../api.types';
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

  create(payload: Partial<RoleDto>) {
    return this.http
      .post<ApiResponse<RoleDto>>(`${API_CONFIG.baseUrl}/Roles`, payload)
      .pipe(map((r) => r.data!));
  }

  update(id: number, payload: Partial<RoleDto>) {
    return this.http
      .put<ApiResponse<RoleDto>>(`${API_CONFIG.baseUrl}/Roles/${id}`, payload)
      .pipe(map((r) => r.data!));
  }

  remove(id: number) {
    return this.http.delete<ApiResponse<object>>(`${API_CONFIG.baseUrl}/Roles/${id}`);
  }

  byName(name: string) {
    return this.http
      .get<ApiResponse<RoleDto>>(`${API_CONFIG.baseUrl}/Roles/by-name/${encodeURIComponent(name)}`)
      .pipe(map((r) => r.data!));
  }

  userRoles(userId: number) {
    return this.http
      .get<ApiResponse<RoleDto[]>>(`${API_CONFIG.baseUrl}/Roles/user/${userId}`)
      .pipe(map((r) => r.data ?? []));
  }
}
