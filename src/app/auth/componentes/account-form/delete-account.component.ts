import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          Delete Account
        </mat-panel-title>

        <mat-panel-description>
          Danger zone
        </mat-panel-description>
      </mat-expansion-panel-header>

      <p>
        Once you delete your account, there is no going back. Please be certain.
      </p>

      <button color="warn" mat-raised-button (click)="onDelete()">
        Delete your account
      </button>
    </mat-expansion-panel>
  `,
  styleUrls: ['./account-form.component.scss'],
})
export class DeleteAccountComponent {
  @Output() delete = new EventEmitter();

  onDelete(): void {
    this.delete.emit();
  }
}
