import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from '../../../users/components/entity-list/entity-list.component';
import { AuthService } from '../../../../core/services/auth.service';
import { RolesService } from '../../../../core/services/roles.service';
import { RoleDto, UpdateRoleDto, UserSummaryDto } from '../../../../core/api.types';

@Component({
  selector: 'app-teams-component',
  imports: [CommonModule, EntityListComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent {
  private auth = inject(AuthService);
  private rolesService = inject(RolesService);

  roles = signal<RoleDto[]>([]);

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
  ];

  constructor() {
    this.loadRoles();
  }
  loadRoles() {
    this.rolesService.list().subscribe((users) => {
      console.log('Roles from API:', users);
      this.roles.set(users);
    });
  }
  canEdit = computed(
    () => this.auth.user?.roles?.some((r) => r === 'Admin' || r === 'Manager') ?? false
  );

  canDelete = computed(() => this.auth.user?.roles?.includes('Admin') ?? false);

  editRole(user: UpdateRoleDto) {
    alert('Editar usuario: ' + user.name);
  }

  deleteRole(user: RoleDto) {
    if (confirm(`¿Seguro que deseas borrar a ${user.name}?`)) {
      this.rolesService.remove(user.id).subscribe(() => this.loadRoles());
    }
  }
}
