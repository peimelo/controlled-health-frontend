import { formatNumber } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Height } from '../../../core/models';
import { FormErrorService } from '../../../core/services/form-error.service';
import { DateTimeService } from '../../../shared/services/dateTime.service';
import { NumberService } from '../../../shared/services/number.service';

@Component({
  selector: 'app-height-form-dialog',
  templateUrl: './height-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeightFormDialogComponent implements OnChanges {
  @Input() height!: Height;
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Output() private create = new EventEmitter<Height>();
  @Output() private update = new EventEmitter<Height>();

  form = this.fb.group({
    date: ['', Validators.required],
    value: ['', [Validators.min(20), Validators.max(250), Validators.required]],
  });
  isEditing!: boolean;

  constructor(
    private dateTimeService: DateTimeService,
    private numberService: NumberService,
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnChanges(): void {
    if (this.isEditing === undefined) {
      if (this.height && this.height.id) {
        this.isEditing = true;

        this.form.patchValue({
          date: this.dateTimeService.convertDateToUtc(this.height.date),
          value: formatNumber(this.height.value, 'pt', '0.2-2'),
        });
      } else {
        this.isEditing = false;

        this.form.patchValue({
          date: this.dateTimeService.dateNow(),
        });
      }
    }
  }

  onCreate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const height = {
        date: this.dateTimeService.convertDateToSave(value.date),
        value: this.numberService.convertToFloat(value.value),
      };

      this.create.emit(height as Height);
    }
  }

  onUpdate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const height: Height = {
        ...this.height,
        date: this.dateTimeService.convertDateToSave(value.date),
        value: this.numberService.convertToFloat(value.value),
      };

      this.update.emit(height);
    }
  }
}
