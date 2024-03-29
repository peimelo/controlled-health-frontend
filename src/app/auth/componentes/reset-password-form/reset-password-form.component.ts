import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';
import { PasswordCombination } from '../../models';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent {
  form = this.fb.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.formErrorService.createPasswordStrengthValidator(),
        ],
      ],
      passwordConfirmation: ['', Validators.required],
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

  @Output() private submitted = new EventEmitter<PasswordCombination>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  onSubmit(): void {
    const { valid, value } = this.form;

    if (valid) {
      this.submitted.emit(value);
    }
  }
}
