import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <mat-form-field appearance="outline" class="w-100">
      <mat-label>{{ label }}</mat-label>
      <input matInput [type]="type" [placeholder]="placeholder" [formControl]="control" />
      <mat-icon matSuffix *ngIf="suffixIcon">{{ suffixIcon }}</mat-icon>
      <mat-hint *ngIf="hint">{{ hint }}</mat-hint>
    </mat-form-field>
  `,
  styles: [
    `
      .w-100 {
        width: 100%;
      }
    `,
  ],
})
export class AppInputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() control = new FormControl('');
  @Input() hint?: string;
  @Input() suffixIcon?: string;
}
