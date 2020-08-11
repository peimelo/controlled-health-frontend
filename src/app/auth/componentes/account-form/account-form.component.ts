import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';
import { CreateAccountRequest, User } from '../../models';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent {
  form = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      name: ['', [Validators.email, Validators.required]],
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
  @Input() user: User;

  @Output() deleted = new EventEmitter();
  @Output() submitted = new EventEmitter<CreateAccountRequest>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  delete(): void {
    this.deleted.emit();
  }

  submit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
