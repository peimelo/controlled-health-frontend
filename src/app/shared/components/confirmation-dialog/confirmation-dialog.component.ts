import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfig } from '../../models';

@Component({
  selector: 'app-confirmation-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  cancelText: string | undefined = '';
  confirmText: string | undefined = '';
  content = '';
  title = '';

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogConfig) {
    this.cancelText = data.cancelText;
    this.confirmText = data.confirmText;
    this.content = data.content;
    this.title = data.title;
  }
}
