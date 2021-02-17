import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IsLoadingPipeModule } from '@service-work/is-loading';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { IconsModule } from './icons/icons.module';
import { MaterialModule } from './material/material.module';
import { FormatDatetimeUtcPipe } from './pipes/format-datetime-utc.pipe';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { PaginationService } from './services/pagination.service';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    DatePickerComponent,
    FormatDatetimeUtcPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    IconsModule,
    MaterialModule,
  ],
  exports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // third-party
    FlexLayoutModule,
    IconsModule,
    IsLoadingPipeModule,
    MaterialModule,

    // app
    ConfirmationDialogComponent,
    DatePickerComponent,
    FormatDatetimeUtcPipe,
  ],
  providers: [ConfirmationDialogService, PaginationService],
})
export class SharedModule {}
