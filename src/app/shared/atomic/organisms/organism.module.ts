import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component/';
import { AppTopbarComponent } from './app-topbar/app-topbar.component';

@NgModule({
  declarations: [AppSidebarComponent, AppTopbarComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [AppSidebarComponent, AppTopbarComponent],
})
export class OrganismsModule {}
