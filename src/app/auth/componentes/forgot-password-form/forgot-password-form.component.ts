import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
})
export class ForgotPasswordFormComponent {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
  });

  @Input() errors: string[];
  @Input() pending: boolean;

  @Output() submitted = new EventEmitter<string>();

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
      this.submitted.emit(this.form.get('email').value);
    }
  }
}
