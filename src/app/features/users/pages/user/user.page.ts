import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../../../shared/atomic/organisms/section-wrapper/section-wrapper.component';
import { UsersComponent } from '../../components/user/users.component';

@Component({
  selector: 'app-user-page',
  imports: [SectionWrapperComponent, UsersComponent],
  standalone: true,
  templateUrl: './user.page.html',
  styleUrl: './user.page.scss',
})
export class UserPage {}
