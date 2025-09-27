import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' },
];
