import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SvgBrandIconComponent } from '../../../../shared/atomic/atoms/svg-brand-icon/svg-brand-icon.component';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';

// Átomo: fondo animado
import { SpaceBackgroundComponent } from '../../../../layout/space-background/space-background.component';
import { IconName } from '../../../../shared/svg-icons/svg-icons';

@Component({
  selector: 'app-login-form',
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
    SvgBrandIconComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  @Input() brandIcon: IconName = 'star';
  @Input() brandName: string = 'Lumen Dashboard';
  @Input() welcomeMessage: string = 'Welcome back!';
  @Input() buttonLabel = 'Login';
  @Input() loading = false; //For loading purposes
  @Input() showRegisterLink = true; //For private use

  @Output() login = new EventEmitter<{ username: string; password: string }>();
  @Output() register = new EventEmitter<void>();

  showPassword = signal(false);

  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
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

  togglePassword() {
    this.showPassword.update((v) => !v);
  }
}
