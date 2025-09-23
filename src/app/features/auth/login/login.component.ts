import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

// Importa aquí tus átomos standalone
import { AppInputComponent } from '../../../shared/atomic/atoms/app-input/app-input.component';
import { AppButtonComponent } from '../../../shared/atomic/atoms/app-button/app-button.component';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    AppInputComponent,
    AppButtonComponent,
  ],
  template: `
    <div class="login-wrap">
      <mat-card>
        <h2>Iniciar sesión</h2>
        <form (ngSubmit)="submit()">
          <app-input label="Usuario" [control]="username"></app-input>
          <app-input label="Contraseña" type="password" [control]="password"></app-input>
          <div class="mt-2">
            <app-button variant="raised" color="primary">Entrar</app-button>
          </div>
        </form>
        <div *ngIf="error" class="text-danger mt-2">{{ error }}</div>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-wrap {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }
      mat-card {
        width: 100%;
        max-width: 420px;
      }
      .mt-2 {
        margin-top: 12px;
      }
      .text-danger {
        color: #d32f2f;
      }
    `,
  ],
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.username.invalid || this.password.invalid) return;
    this.auth.login({ username: this.username.value!, password: this.password.value! }).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (e) => (this.error = e?.message || 'Credenciales inválidas'),
    });
  }
}
