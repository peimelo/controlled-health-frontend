import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';
import { Account } from '../../models';

@Component({
  selector: 'app-account-form-dialog',
  templateUrl: './account-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormDialogComponent implements OnChanges {
  @Input() account!: Account;
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Output() private create = new EventEmitter<Account>();
  @Output() private update = new EventEmitter<Account>();

  form = this.fb.group({
    name: ['', Validators.required],
  });
  isEditing!: boolean;

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnChanges(): void {
    if (this.isEditing === undefined) {
      if (this.account && this.account.id) {
        this.isEditing = true;

        this.form.patchValue({
          name: this.account.name,
        });
      } else {
        this.isEditing = false;
      }
    }
  }

  onCreate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const account = {
        name: value.name,
      };

      this.create.emit(account as Account);
    }
  }

  onUpdate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const account: Account = {
        ...this.account,
        name: value.name,
      };

      this.update.emit(account);
    }
  }
}
