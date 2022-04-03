import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Reference } from '../../../core/models';
import { FormErrorService } from '../../../core/services/form-error.service';

@Component({
  selector: 'app-reference-form-dialog',
  templateUrl: './reference-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceFormDialogComponent implements OnChanges {
  @Input() reference!: Reference;
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Output() private create = new EventEmitter<Reference>();
  @Output() private update = new EventEmitter<Reference>();

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
      if (this.reference && this.reference.id) {
        this.isEditing = true;

        this.form.patchValue({
          name: this.reference.name,
        });
      } else {
        this.isEditing = false;
      }
    }
  }

  onCreate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const reference = {
        name: value.name,
      };

      this.create.emit(reference as Reference);
    }
  }

  onUpdate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const reference: Reference = {
        ...this.reference,
        name: value.name,
      };

      this.update.emit(reference);
    }
  }
}
