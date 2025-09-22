import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api.config';
import { ApiResponse, AuditLogDto } from '../api.types';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuditService {
  constructor(private http: HttpClient) {}

  // Registrar acción (lo usaremos en el interceptor más adelante)
  log(action: string, meta?: any) {
    return this.http.post<void>(`${API_CONFIG.baseUrl}/AuditLogs`, { action, meta });
  }

  // Listar logs para una vista de auditoría (puedes añadir params tipo page/size si luego paginas en el backend)
  list() {
    return this.http
      .get<ApiResponse<AuditLogDto[]>>(`${API_CONFIG.baseUrl}/AuditLogs`)
      .pipe(map((r) => r.data ?? []));
  }
}
