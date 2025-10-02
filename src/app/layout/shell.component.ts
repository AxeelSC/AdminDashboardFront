import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importa aquí tus componentes de Sidebar y Topbar reales si los tienes:
import { SidebarMenuComponent, MenuItem } from './sidebar-menu/sidebar-menu.component';
import { AppTopbarComponent } from '../shared/atomic/organisms/app-topbar/app-topbar.component';
import { CommonModule } from '@angular/common';
import { MENU_ITEMS } from './sidebar-menu/menu.config';
import { SpaceBackgroundComponent } from './space-background/space-background.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarMenuComponent,
    AppTopbarComponent,
    SpaceBackgroundComponent,
  ],
  template: `
    <!-- shell.component.html -->
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
        z-index: 2;
        position: relative;
      }

      .main-content {
        flex: 1;
        min-width: 0;
        position: relative;
        z-index: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class ShellComponent {
  menuItems: MenuItem[] = MENU_ITEMS;
}
