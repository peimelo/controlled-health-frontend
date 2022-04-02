import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Unit } from '../../../core/models';
import { FormErrorService } from '../../../core/services/form-error.service';

@Component({
  selector: 'app-unit-form-dialog',
  templateUrl: './unit-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitFormDialogComponent implements OnChanges {
  @Input() unit!: Unit;
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Output() private create = new EventEmitter<Unit>();
  @Output() private update = new EventEmitter<Unit>();

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
      if (this.unit && this.unit.id) {
        this.isEditing = true;

        this.form.patchValue({
          name: this.unit.name,
        });
      } else {
        this.isEditing = false;
      }
    }
  }

  onCreate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const unit = {
        name: value.name,
      };

      this.create.emit(unit as Unit);
    }
  }

  onUpdate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const unit: Unit = {
        ...this.unit,
        name: value.name,
      };

      this.update.emit(unit);
    }
  }
}
