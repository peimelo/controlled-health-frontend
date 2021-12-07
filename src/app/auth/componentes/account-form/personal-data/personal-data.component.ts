import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FormErrorService } from '../../../../core/services/form-error.service';
import { User } from '../../../models';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['../account-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataComponent implements OnChanges {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', []],
    gender: ['', []],
    date_of_birth: ['', []],
  });

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() user!: User;

  @Output() private update = new EventEmitter<User>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && changes.user.currentValue) {
      this.form.patchValue({
        date_of_birth: this.user.date_of_birth,
        email: this.user.email,
        gender: this.user.gender,
        name: this.user.name,
      });
    }
  }

  onUpdate(): void {
    const { valid, value } = this.form;

    if (valid) {
      this.update.emit({
        ...this.user,
        date_of_birth: moment(value.date_of_birth).format('YYYY-MM-DD'),
        email: value.email,
        gender: value.gender,
        name: value.name,
      });
    }
  }
}
