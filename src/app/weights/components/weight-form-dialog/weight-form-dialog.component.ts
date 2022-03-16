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
import { Weight } from '../../../core/models';
import { FormErrorService } from '../../../core/services/form-error.service';
import { DateTimeService } from '../../../shared/services/dateTime.service';
import { NumberService } from '../../../shared/services/number.service';

@Component({
  selector: 'app-weight-form-dialog',
  templateUrl: './weight-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeightFormDialogComponent implements OnChanges {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() weight!: Weight;

  @Output() private create = new EventEmitter<Weight>();
  @Output() private update = new EventEmitter<Weight>();

  form = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    value: ['', [Validators.min(1), Validators.max(400), Validators.required]],
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
      if (this.weight && this.weight.id) {
        this.isEditing = true;

        this.form.patchValue({
          date: this.dateTimeService.convertDateToUtc(this.weight.date),
          time: this.dateTimeService.convertTimeToUtc(this.weight.date),
          value: formatNumber(this.weight.value, 'pt', '0.2-2'),
        });
      } else {
        this.isEditing = false;

        this.form.patchValue({
          date: this.dateTimeService.dateNow(),
          time: this.dateTimeService.timeNow(),
        });
      }
    }
  }

  onCreate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const date = this.dateTimeService.convertDateToSave(value.date);

      const weight = {
        date: this.dateTimeService.convertDateTimeToSave(date, value.time),
        value: this.numberService.convertToFloat(value.value),
      };

      this.create.emit(weight as Weight);
    }
  }

  onUpdate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const date = this.dateTimeService.convertDateToSave(value.date);

      const weight: Weight = {
        ...this.weight,
        date: this.dateTimeService.convertDateTimeToSave(date, value.time),
        value: this.numberService.convertToFloat(value.value),
      };

      this.update.emit(weight);
    }
  }
}
