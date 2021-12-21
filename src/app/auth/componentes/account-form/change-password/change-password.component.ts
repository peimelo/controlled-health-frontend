import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../../core/services/form-error.service';
import { PasswordCombination } from '../../../models';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../account-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  form = this.fb.group(
    {
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.formErrorService.createPasswordStrengthValidator(),
        ],
      ],
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
    },
    {
      validators: this.formErrorService.comparePasswordValidator(
        'password',
        'passwordConfirmation'
      ),
    }
  );

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Output() private updatePassword = new EventEmitter<PasswordCombination>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  // passwordConfirmation: new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(8),
  //   this.formErrorService.confirmedValidatorw(this.form[''], 'www'),
  // ]),
  onUpdatePassword(): void {
    const { valid, value } = this.form;

    if (valid) {
      this.updatePassword.emit(value);
      this.form.reset();
    }
  }
}
