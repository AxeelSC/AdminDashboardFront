import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api.config';
import { LoginRequestDto, LoginResponseDto, ApiResponse, UserDto } from '../api.types';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<UserDto | null>(null);
  user$ = this._user$.asObservable();

  constructor(private http: HttpClient) {
    const rawUser = localStorage.getItem('auth_user');
    if (rawUser) this._user$.next(JSON.parse(rawUser));
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }
  get user(): UserDto | null {
    return this._user$.value;
  }
  get isAuthenticated(): boolean {
    return !!this.token;
  }

  login(payload: LoginRequestDto) {
    return this.http
      .post<ApiResponse<LoginResponseDto>>(`${API_CONFIG.baseUrl}/Auth/login`, payload)
      .pipe(
        map((res) => {
          if (!res.success || !res.data) throw new Error(res.message || 'Login failed');
          return res.data;
        }),
        tap((data) => {
          localStorage.setItem('access_token', data.token);
          localStorage.setItem('auth_user', JSON.stringify(data.user));
          this._user$.next(data.user);
        })
      );
  }

  me() {
    return this.http.get<ApiResponse<UserDto>>(`${API_CONFIG.baseUrl}/Auth/me`).pipe(
      map((res) => res.data || null),
      tap((u) => {
        if (u) {
          localStorage.setItem('auth_user', JSON.stringify(u));
          this._user$.next(u);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_user');
    this._user$.next(null);
  }
}
