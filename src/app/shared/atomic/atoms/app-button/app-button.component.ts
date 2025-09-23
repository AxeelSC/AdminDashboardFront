import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-button [color]="color" [disabled]="disabled" [ngClass]="variant">
      <mat-icon *ngIf="icon" class="me-2">{{ icon }}</mat-icon>
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class AppButtonComponent {
  @Input() color: 'primary' | 'accent' | 'warn' | undefined = 'primary';
  @Input() icon?: string;
  @Input() disabled = false;
  @Input() variant: 'text' | 'raised' | 'stroked' | 'flat' | 'fab' = 'text';
}
