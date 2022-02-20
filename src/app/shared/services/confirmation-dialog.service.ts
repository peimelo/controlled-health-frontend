import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogData } from '../../core/models';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  show<T>(
    eventEmitter: EventEmitter<T>,
    data: T,
    dialogData: DialogData
  ): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = false;
    matDialogConfig.data = {
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      ...dialogData,
    };

    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      matDialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        eventEmitter.emit(data);
      }
    });
  }
}
