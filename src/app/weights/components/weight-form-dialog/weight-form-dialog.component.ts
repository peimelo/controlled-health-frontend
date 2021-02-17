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
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { Weight } from '../../../shared/models';

@Component({
  selector: 'app-weight-form-dialog',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weight-form-dialog.component.html',
})
export class WeightFormDialogComponent implements OnChanges {
  form = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    value: ['', [Validators.min(3), Validators.max(400), Validators.required]],
  });
  isNotFilledWeight = true;
  isEditing = false;
  originalWeight!: Weight;

  @Input() error!: Observable<any>;
  @Input() isLoading!: boolean;
  @Input() user!: User;
  @Input() weight!: Weight;

  @Output() private create = new EventEmitter<Weight>();
  @Output() private update = new EventEmitter<Weight>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.weight && this.weight.id) {
      this.isEditing = true;

      if (changes.weight && changes.weight.firstChange) {
        this.originalWeight = changes.weight.currentValue;
      }

      this.form.patchValue({
        date: moment.utc(this.weight.date),
        time: moment.utc(this.weight.date).format('HH:mm'),
        value: formatNumber(this.weight.value, 'pt', '0.2-2'),
      });
    } else {
      if (this.isNotFilledWeight) {
        this.form.patchValue({
          date: moment(),
          time: moment().format('HH:mm'),
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
      const date = moment(value.date).format('YYYY-MM-DD');

      const weight = {
        ...this.weight,
        date: moment(`${date} ${value.time}`).format('YYYY-MM-DD HH:mm'),
        value: value.value,
      };

      this.create.emit(weight);
    }
  }

  onUpdate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
      const date = moment(value.date).format('YYYY-MM-DD');

      const weight = {
        ...this.weight,
        date: moment(`${date} ${value.time}`).format('YYYY-MM-DD HH:mm'),
        value: this.convertToFloat(this.originalWeight.value, value.value),
      };

      this.update.emit(weight);
    }
  }

  private convertToFloat(oldValue: any, newValue: any): number {
    return parseFloat(oldValue) ===
      parseFloat(newValue.replace('.', '').replace(',', '.'))
      ? oldValue
      : newValue;
  }
}
