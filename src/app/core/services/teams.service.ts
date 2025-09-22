import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api.config';
import { ApiResponse, TeamDto } from '../api.types';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http
      .get<ApiResponse<TeamDto[]>>(`${API_CONFIG.baseUrl}/Teams`)
      .pipe(map((r) => r.data ?? []));
  }
  get(id: number) {
    return this.http
      .get<ApiResponse<TeamDto>>(`${API_CONFIG.baseUrl}/Teams/${id}`)
      .pipe(map((r) => r.data!));
  }
  create(payload: Partial<TeamDto>) {
    return this.http
      .post<ApiResponse<TeamDto>>(`${API_CONFIG.baseUrl}/Teams`, payload)
      .pipe(map((r) => r.data!));
  }
  update(id: number, payload: Partial<TeamDto>) {
    return this.http
      .put<ApiResponse<TeamDto>>(`${API_CONFIG.baseUrl}/Teams/${id}`, payload)
      .pipe(map((r) => r.data!));
  }
  remove(id: number) {
    return this.http.delete<ApiResponse<object>>(`${API_CONFIG.baseUrl}/Teams/${id}`);
  }
}
