import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api.config';
import { ApiResponse, UserDto, UserSummaryDto } from '../api.types';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  list(): Observable<UserSummaryDto[]> {
    return this.http
      .get<ApiResponse<UserSummaryDto[]>>(`${API_CONFIG.baseUrl}/Users`)
      .pipe(map((r) => r.data ?? []));
  }

  get(id: number): Observable<UserDto | null> {
    return this.http
      .get<ApiResponse<UserDto>>(`${API_CONFIG.baseUrl}/Users/${id}`)
      .pipe(map((r) => r.data ?? null));
  }

  update(id: number, payload: Partial<UserDto>) {
    return this.http
      .put<ApiResponse<UserDto>>(`${API_CONFIG.baseUrl}/Users/${id}`, payload)
      .pipe(map((r) => r.data!));
  }

  remove(id: number) {
    return this.http.delete<ApiResponse<object>>(`${API_CONFIG.baseUrl}/Users/${id}`);
  }
}
