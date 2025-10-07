import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowed = (route.data['roles'] as string[] | undefined) ?? [];
    const roles = this.auth.user?.roles ?? [];
    const ok = allowed.length === 0 || roles.some((r) => allowed.includes(r));
    if (!ok) this.router.navigate(['/']);
    return ok;
  }
}
