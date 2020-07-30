import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 72px 0;
      }

      .mat-form-field {
        width: 100%;
        min-width: 300px;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      .loginButtons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    `,
  ],
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });
  hide = true;

  @Input() errors: string[];
  @Input() pending: boolean;

  @Output() submitted = new EventEmitter<Credentials>();

  constructor(private fb: FormBuilder) {}

  getErrorEmail(): string {
    return this.form.get('email').hasError('required')
      ? 'Field is required'
      : this.form.get('email').hasError('email')
      ? 'Must be a valid email address'
      : '';
  }

  submit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
