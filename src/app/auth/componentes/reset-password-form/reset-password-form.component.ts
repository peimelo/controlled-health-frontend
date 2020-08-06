import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent {
  form = this.fb.group(
    {
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

  @Input() errors: string[];
  @Input() pending: boolean;

  @Output() submitted = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  submit(): void {
    // if (this.form.valid) {
    //   this.submitted.emit(this.form.get('email').value);
    // }
  }
}
