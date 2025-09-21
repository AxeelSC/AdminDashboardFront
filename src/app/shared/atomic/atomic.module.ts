import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material-module';

import { AppButtonComponent } from './atoms/app-button/app-button.component';
import { AppInputComponent } from './atoms/app-input/app-input.component';

@NgModule({
  declarations: [AppButtonComponent, AppInputComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [AppButtonComponent, AppInputComponent],
})
export class AtomicModule {}
