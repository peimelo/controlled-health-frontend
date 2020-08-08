import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';

@Component({
  selector: 'app-resend-confirmation-form',
  templateUrl: './resend-confirmation-form.component.html',
  styleUrls: ['./resend-confirmation-form.component.scss'],
})
export class ResendConfirmationFormComponent {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
  });

  @Input() pending: boolean;

  @Output() submitted = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  submit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.get('email').value);
    }
  }
}
