import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../core/models';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  cancelText: string | undefined;
  confirmText: string | undefined;
  content: string;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData) {
    this.cancelText = data.cancelText;
    this.confirmText = data.confirmText;
    this.content = data.content;
    this.title = data.title;
  }
}
