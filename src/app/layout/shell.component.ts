import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-shell',
  template: `
    <mat-sidenav-container class="h-100">
      <mat-sidenav #snav mode="side" [opened]="opened" class="w-280">
        <!-- Aquí irá el Sidebar -->
        <div>Sidebar</div>
      </mat-sidenav>
      <mat-sidenav-content>
        <!-- Aquí irá el Topbar -->
        <div>Topbar</div>
        <div class="content container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .h-100 {
        height: 100vh;
      }
      .w-280 {
        width: 280px;
      }
      .content {
        padding: 16px;
      }
      @media (max-width: 991px) {
        :host ::ng-deep mat-sidenav {
          width: 240px;
        }
      }
    `,
  ],
})
export class ShellComponent {
  @ViewChild('snav') snav!: MatSidenav;
  opened = window.innerWidth >= 992;
}
