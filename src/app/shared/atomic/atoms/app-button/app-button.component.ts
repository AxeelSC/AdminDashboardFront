import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
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
