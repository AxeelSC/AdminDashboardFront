import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; // Ajusta la ruta según dónde tengas AuthService
import { LoginComponent } from '../login/login.component'; // Importa tu LoginComponent standalone
import { LoginRequestDto } from '../../../core/api.types';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent],
  template: `
    <app-login
      [brandIcon]="'star'"
      [brandName]="'Lumen Dashboard'"
      [welcomeMessage]="'¡Bienvenido de nuevo!'"
      [buttonLabel]="'Iniciar sesión'"
      [loading]="loading"
      (login)="onLogin($event)"
    ></app-login>
  `,
})
export class LoginPageComponent {
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(payload: LoginRequestDto) {
    this.loading = true;
    this.authService.login(payload).subscribe({
      next: (data) => {
        console.log('Login exitoso:', data);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        alert(err.message || 'Login incorrecto');
      },
    });
  }
}
