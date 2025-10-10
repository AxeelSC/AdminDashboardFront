import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../../../shared/atomic/organisms/section-wrapper/section-wrapper.component';
import { TeamsComponent } from '../../components/teams/teams.component';

@Component({
  selector: 'app-team-page',
  imports: [SectionWrapperComponent, TeamsComponent],
  standalone: true,
  templateUrl: './team.page.html',
  styleUrl: './team.page.scss',
})
export class TeamPage {}
