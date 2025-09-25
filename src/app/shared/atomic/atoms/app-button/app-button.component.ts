import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss',
})
export class AppButtonComponent {
  @Input() color: 'primary' | 'accent' | 'warn' | undefined = 'primary';
  @Input() icon?: string;
  @Input() disabled = false;
  @Input() variant: 'text' | 'raised' | 'stroked' | 'flat' | 'fab' = 'text';
}
