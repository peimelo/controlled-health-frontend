import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from '../material/material.module';
import {
  ConfirmationDialogComponent,
  DatePickerComponent,
  LineChartComponent,
  PaginatorComponent,
} from './components';
import { FormatDatetimeUtcPipe } from './pipes/format-datetime-utc.pipe';

const SHARED_COMPONENTS = [
  ConfirmationDialogComponent,
  DatePickerComponent,
  LineChartComponent,
  PaginatorComponent,
];

@NgModule({
  declarations: [...SHARED_COMPONENTS, FormatDatetimeUtcPipe],
  imports: [
    // @angular
    CommonModule,
    ReactiveFormsModule,

    // third-party
    NgxChartsModule,

    // app
    MaterialModule,
  ],
  exports: [...SHARED_COMPONENTS, FormatDatetimeUtcPipe],
})
export class SharedModule {}
