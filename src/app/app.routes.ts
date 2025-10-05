import { Routes } from '@angular/router';
import { LoginPage } from './features/login/pages/login/login.page';
import { AuthGuard } from './core/guards/auth.guard';
import { ShellComponent } from './layout/shell/shell.component';
import { UserPage } from './features/users/pages/user/user.page';
import { DashboardPage } from './features/dashboard/pages/dashboard/dashboard.page';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },

  {
    path: 'dashboard',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardPage },
      { path: 'users', component: UserPage },
    ],
  },

  { path: '**', redirectTo: '/login' },
];
