import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api.config';
import { ApiResponse, TeamRequestDto } from '../api.types';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamRequestsService {
  constructor(private http: HttpClient) {}

  create(teamId: number) {
    return this.http
      .post<ApiResponse<TeamRequestDto>>(`${API_CONFIG.baseUrl}/TeamRequests`, { teamId })
      .pipe(map((r) => r.data!));
  }
  myRequests() {
    return this.http
      .get<ApiResponse<TeamRequestDto[]>>(`${API_CONFIG.baseUrl}/TeamRequests/my-requests`)
      .pipe(map((r) => r.data ?? []));
  }
  mailbox() {
    return this.http
      .get<ApiResponse<TeamRequestDto[]>>(`${API_CONFIG.baseUrl}/TeamRequests/mailbox`)
      .pipe(map((r) => r.data ?? []));
  }
  process(id: number, approve: boolean) {
    return this.http.post<ApiResponse<object>>(`${API_CONFIG.baseUrl}/TeamRequests/${id}/process`, {
      approve,
    });
  }
  cancel(id: number) {
    return this.http.delete<ApiResponse<object>>(`${API_CONFIG.baseUrl}/TeamRequests/${id}`);
  }
  teamPending(teamId: number) {
    return this.http
      .get<ApiResponse<TeamRequestDto[]>>(`${API_CONFIG.baseUrl}/TeamRequests/team/${teamId}`)
      .pipe(map((r) => r.data ?? []));
  }
}
