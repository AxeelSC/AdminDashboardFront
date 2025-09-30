import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service'; // Ajusta la ruta según dónde tengas AuthService
import { LoginFormComponent } from '../../components/login-form/login-form.component'; // Importa tu LoginComponent standalone
import { LoginRequestDto } from '../../../../core/api.types';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
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
