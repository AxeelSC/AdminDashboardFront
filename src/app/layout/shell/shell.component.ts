import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importa aquí tus componentes de Sidebar y Topbar reales si los tienes:
import { SidebarMenuComponent, MenuItem } from '../sidebar-menu/sidebar-menu.component';
import { CommonModule } from '@angular/common';
import { MENU_ITEMS } from '../sidebar-menu/menu.config';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarMenuComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  menuItems: MenuItem[] = MENU_ITEMS;
}
