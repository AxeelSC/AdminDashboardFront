import { Component, Output, EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleSidenav.emit()"><mat-icon>menu</mat-icon></button>
      <span>Topbar</span>
    </mat-toolbar>
  `,
})
export class AppTopbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
}
