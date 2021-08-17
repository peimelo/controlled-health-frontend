import { formatNumber } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { FormErrorService } from '../../../core/services/form-error.service';
import { Weight } from '../../../shared/models';
import { DateTimeService } from '../../../shared/services/dateTime.service';
import { NumberService } from '../../../shared/services/number.service';

@Component({
  selector: 'app-exam-result-form-dialog',
  templateUrl: './exam-result-form-dialog.component.html',
})
export class ExamResultFormDialogComponent implements OnChanges {
  form = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    value: ['', [Validators.min(3), Validators.max(400), Validators.required]],
  });
  isEditing = false;
  isNotFilledWeight = true;
  originalWeight!: Weight;

  @Input() error!: Observable<any>;

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() user!: User;
  @Input() weight!: Weight;

  @Output() private create = new EventEmitter<Weight>();
  @Output() private update = new EventEmitter<Weight>();

  constructor(
    private dateTimeService: DateTimeService,
    private numberService: NumberService,
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.weight && this.weight.id) {
      this.isEditing = true;

      if (changes.weight && changes.weight.firstChange) {
        this.originalWeight = changes.weight.currentValue;
      }

      this.form.patchValue({
        date: this.dateTimeService.convertDateToUtc(this.weight.date),
        time: this.dateTimeService.convertTimeToUtc(this.weight.date),
        value: formatNumber(this.weight.value, 'pt', '0.2-2'),
      });
    } else {
      if (this.isNotFilledWeight) {
        this.form.patchValue({
          date: this.dateTimeService.dateNow(),
          time: this.dateTimeService.timeNow(),
        });

        this.isNotFilledWeight = false;
      }
    }
  }

  getErrorValue(): string {
    return this.form.get('value')?.hasError('required')
      ? 'Field is required.'
      : this.form.get('value')?.hasError('min')
      ? 'Must be >= 3'
      : this.form.get('value')?.hasError('max')
      ? 'Must be <= 400'
      : '';
  }

  onCreate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
      const date = this.dateTimeService.convertDateToSave(value.date);

      const weight = {
        ...this.weight,
        date: this.dateTimeService.convertDateTimeToSave(date, value.time),
        value: value.value,
      };

      this.create.emit(weight);
    }
  }

  onUpdate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
      const date = this.dateTimeService.convertDateToSave(value.date);

      const weight = {
        ...this.weight,
        date: this.dateTimeService.convertDateTimeToSave(date, value.time),
        value: this.numberService.convertToFloat(
          this.originalWeight.value,
          value.value
        ),
      };

      this.update.emit(weight);
    }
  }
}
