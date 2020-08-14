import { Component } from '@angular/core';

/**
 * The dialog will close with true if user clicks the ok button,
 * otherwise it will close with undefined.
 */
@Component({
  template: `
    <h2 mat-dialog-title>Delete Account</h2>

    <mat-dialog-content>
      <span accent-color> Are you sure you want to delete your account?</span>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancel</button>

      <button mat-button [mat-dialog-close]="true">OK</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        max-width: 300px;
      }

      mat-dialog-actions {
        display: flex;
        justify-content: flex-end;
      }

      [mat-button] {
        padding: 0;
      }
    `,
  ],
})
export class DeleteAccountConfirmationComponent {}