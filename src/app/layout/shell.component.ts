import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importa aquí tus componentes de Sidebar y Topbar reales si los tienes:
import { SidebarMenuComponent, MenuItem } from './sidebar-menu/sidebar-menu.component';
import { AppTopbarComponent } from '../shared/atomic/organisms/app-topbar/app-topbar.component';
import { CommonModule } from '@angular/common';
import { MENU_ITEMS } from './sidebar-menu/menu.config';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarMenuComponent, AppTopbarComponent],
  template: `
    <div class="shell-layout">
      <app-sidebar-menu [menuItems]="menuItems"></app-sidebar-menu>
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .shell-layout {
        display: flex;
        min-height: 100vh;
      }

      app-sidebar-menu {
        min-width: 220px;
        max-width: 240px;
        background: #1a2233;
        color: white;
      }

      .main-content {
        flex: 1;
        padding: 24px;
        background: #f3f5fa;
      }
    `,
  ],
})
export class ShellComponent {
  menuItems: MenuItem[] = MENU_ITEMS;
}
