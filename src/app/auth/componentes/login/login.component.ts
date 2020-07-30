import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .container {
        height: 100vh;
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

  @Input() errorMessages: string[];
  @Input() isLoading: boolean;

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
