import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';

// Importa aquí tus componentes de Sidebar y Topbar reales si los tienes:
import { AppSidebarComponent } from '../shared/atomic/organisms/app-sidebar/app-sidebar.component';
import { AppTopbarComponent } from '../shared/atomic/organisms/app-topbar/app-topbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, AppSidebarComponent, AppTopbarComponent],
  template: `
    <mat-sidenav-container class="h-100">
      <mat-sidenav #snav mode="side" [opened]="opened" class="w-280">
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-topbar (toggleSidenav)="snav.toggle()"></app-topbar>
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
