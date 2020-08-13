import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';
import { CreateAccountRequest, User } from '../../models';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormComponent implements OnInit {
  form = this.fb.group(
    {
      email: [
        { value: '', disabled: true },
        [Validators.email, Validators.required],
      ],
      name: ['', []],
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
  @Output() save = new EventEmitter<string>();
  @Output() submitted = new EventEmitter<CreateAccountRequest>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnInit(): void {
    this.form.patchValue({
      email: this.user.email,
      name: this.user.name,
    });
  }

  delete(): void {
    this.deleted.emit();
  }

  onSave(): void {
    this.save.emit(this.form.get('name').value);
  }

  submit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
