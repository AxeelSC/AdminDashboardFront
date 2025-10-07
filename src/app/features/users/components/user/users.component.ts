import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from '../entity-list/entity-list.component';
import { AuthService } from '../../../../core/services/auth.service';
import { UsersService } from '../../../../core/services/users.service';
import { UserSummaryDto } from '../../../../core/api.types';

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

  users = signal<UserSummaryDto[]>([]);

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'username', label: 'Usuario' },
    { key: 'email', label: 'Email' },
    { key: 'roles', label: 'Roles' },
  ];
  constructor() {
    this.loadUsers();
  }
  canEdit = computed(
    () => this.auth.user?.roles?.some((r) => r === 'Admin' || r === 'Manager') ?? false
  );

  canDelete = computed(() => this.auth.user?.roles?.includes('Admin') ?? false);

  loadUsers() {
    this.usersService.list().subscribe((users) => {
      console.log('Users from API:', users);
      this.users.set(users);
    });
  }

  editUser(user: UserSummaryDto) {
    alert('Editar usuario: ' + user.username);
  }

  deleteUser(user: UserSummaryDto) {
    if (confirm(`¿Seguro que deseas borrar a ${user.username}?`)) {
      this.usersService.remove(user.id).subscribe(() => this.loadUsers());
    }
  }
}
