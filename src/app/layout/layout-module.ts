import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material-module';
import { AtomicModule } from '../shared/atomic/atomic.module';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, MaterialModule, AtomicModule, RouterModule],
  exports: [ShellComponent],
})
export class LayoutModule {}
