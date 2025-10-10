import { Component } from '@angular/core';
import { RolesComponent } from '../../components/roles/roles.component';
import { SectionWrapperComponent } from '../../../../shared/atomic/organisms/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-role-page',
  imports: [SectionWrapperComponent, RolesComponent],
  standalone: true,
  templateUrl: './role.page.html',
  styleUrl: './role.page.scss',
})
export class RolePage {}
