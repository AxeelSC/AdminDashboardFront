import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from '../entity-list/entity-list.component';
import { AuthService } from '../../../../core/services/auth.service';
import { UsersService } from '../../../../core/services/users.service';
import { RolesService } from '../../../../core/services/roles.service';
import { UserDto, UserSummaryDto } from '../../../../core/api.types';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, EntityListComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  private auth = inject(AuthService);
  private usersService = inject(UsersService);
  private rolesService = inject(RolesService);

  users = signal<UserSummaryDto[]>([]);
  columns = [
    { key: 'username', label: 'Usuario' },
    { key: 'role', label: 'Rol' },
  ];

  userRoles = signal<string[]>([]);

  constructor() {
    // Carga inicial de usuarios y roles
    this.loadUsers();
    effect(() => {
      const user = this.auth.user;
      if (user) {
        this.rolesService
          .userRoles(user.id)
          .subscribe((roles) => this.userRoles.set(roles.map((r) => r.name)));
      }
    });
  }

  loadUsers() {
    this.usersService.list().subscribe((users) => this.users.set(users));
  }

  // Control de permisos por roles
  canEdit = computed(
    () => this.userRoles().includes('Admin') || this.userRoles().includes('Manager')
  );
  canDelete = computed(() => this.userRoles().includes('Admin'));

  editUser(user: UserDto) {
    alert('Editar usuario: ' + user.username);
  }

  deleteUser(user: UserDto) {
    if (confirm(`¿Seguro que deseas borrar a ${user.username}?`)) {
      this.usersService.remove(user.id).subscribe(() => this.loadUsers());
    }
  }
}
