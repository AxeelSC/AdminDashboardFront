import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';

// Átomo: fondo animado
import { SpaceBackgroundComponent } from '../../../layout/space-background/space-background.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDivider,
    SpaceBackgroundComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Input() brandIcon: string = 'shield';
  @Input() brandName: string = 'Lumen Dashboard';
  @Input() welcomeMessage: string = 'Welcome back!';
  @Input() buttonLabel = 'Login';
  @Input() loading = false; //For loading purposes
  @Input() showRegisterLink = true; //For private use

  @Output() login = new EventEmitter<{ email: string; password: string }>();
  @Output() register = new EventEmitter<void>();

  showPassword = signal(false);

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit() {
    if (this.form.valid && !this.loading) {
      this.login.emit(this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
    }
  }

  onRegister() {
    this.register.emit();
  }

  togglePassword() {
    this.showPassword.update((v) => !v);
  }
}
