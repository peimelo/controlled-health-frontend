import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { IconsModule } from './icons/icons.module';
import { MaterialModule } from './material/material.module';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { PaginationService } from './services/pagination.service';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, FlexLayoutModule, IconsModule, MaterialModule],
  exports: [
    // Angular
    CommonModule,

    // third-party
    FlexLayoutModule,
    IconsModule,
    MaterialModule,

    // app
    ConfirmationDialogComponent,
  ],
  providers: [ConfirmationDialogService, PaginationService],
})
export class SharedModule {}
