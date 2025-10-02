import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../../../shared/atomic/organisms/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-user',
  imports: [SectionWrapperComponent],
  standalone: true,
  templateUrl: './user.page.html',
  styleUrl: './user.page.scss',
})
export class UserPage {}
