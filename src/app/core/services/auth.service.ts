import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthResponse, User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api'; // ajusta baseURL si procede
  private _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();

  constructor(private http: HttpClient) {
    const raw = localStorage.getItem('auth_user');
    if (raw) this._user$.next(JSON.parse(raw));
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }
  get user(): User | null {
    return this._user$.value;
  }
  get isAuthenticated(): boolean {
    return !!this.token;
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.accessToken);
        if (res.refreshToken) localStorage.setItem('refresh_token', res.refreshToken);
        localStorage.setItem('auth_user', JSON.stringify(res.user));
        this._user$.next(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('auth_user');
    this._user$.next(null);
  }
}
