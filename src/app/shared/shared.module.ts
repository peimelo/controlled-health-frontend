import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IsLoadingPipeModule } from '@service-work/is-loading';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { IconsModule } from './icons/icons.module';
import { MaterialModule } from './material/material.module';
import { FormatDatetimeUtcPipe } from './pipes/format-datetime-utc.pipe';

const COMPONENTS = [
  ConfirmationDialogComponent,
  DatePickerComponent,
  FormatDatetimeUtcPipe,
  PaginatorComponent,
];

const MODULES = [
  // Angular
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  // third-party
  FlexLayoutModule,
  IsLoadingPipeModule,

  // app
  IconsModule,
  MaterialModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS, ...MODULES],
})
export class SharedModule {}
