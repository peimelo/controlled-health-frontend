import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';
import { PasswordCombination } from '../../models';

@Component({
  selector: 'app-change-password',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          Change Password
        </mat-panel-title>

        <mat-panel-description>
          Type your new password
        </mat-panel-description>
      </mat-expansion-panel-header>

      <form [formGroup]="form">
        <mat-form-field>
          <input
            formControlName="currentPassword"
            matInput
            placeholder="Current password"
            required
            type="password"
          />

          <mat-error
            *ngFor="
              let error of formErrorService.mapErrors(
                form.get('currentPassword').errors
              )
            "
          >
            {{ error }}
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <input
            formControlName="password"
            matInput
            placeholder="New password"
            required
            type="password"
          />

          <mat-error
            *ngFor="
              let error of formErrorService.mapErrors(
                form.get('password').errors
              )
            "
          >
            {{ error }}
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <input
            formControlName="passwordConfirmation"
            matInput
            placeholder="New password confirmation"
            required
            type="password"
          />

          <mat-error
            *ngFor="
              let error of formErrorService.mapErrors(
                form.get('passwordConfirmation').errors,
                'Password and Password confirmation'
              )
            "
          >
            {{ error }}
          </mat-error>
        </mat-form-field>
      </form>

      <mat-action-row>
        <button
          color="primary"
          [disabled]="!form.valid || pending"
          mat-button
          (click)="onUpdatePassword()"
        >
          Update password
        </button>
      </mat-action-row>
    </mat-expansion-panel>
  `,
  styleUrls: ['./account-form.component.scss'],
})
export class ChangePasswordComponent {
  form = this.fb.group(
    {
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required],
    },
    {
      validators: this.formErrorService.confirmedValidator(
        'password',
        'passwordConfirmation'
      ),
    }
  );

  @Input() pending: boolean;

  @Output() updatePassword = new EventEmitter<PasswordCombination>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  onUpdatePassword(): void {
    if (this.form.valid) {
      this.updatePassword.emit(this.form.value);
      this.form.reset();
    }
  }
}
