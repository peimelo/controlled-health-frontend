import { formatNumber } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
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
export class WeightFormDialogComponent implements OnChanges, OnInit {
  form = this.fb.group({
    date: ['', Validators.required],
    value: [
      '',
      [Validators.max(400), Validators.min(3.35), Validators.required],
    ],
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

  ngOnInit(): void {
    // this.error.subscribe((validationErrors) => {
    //   if (validationErrors) {
    //     console.log(validationErrors);
    //     Object.keys(validationErrors).forEach((prop) => {
    //       console.log(prop);
    //       const formControl = this.form.get(prop);
    //       if (formControl) {
    //         console.log(validationErrors[prop]);
    //         formControl.setErrors({
    //           serverError: validationErrors[prop],
    //         });
    //       }
    //     });
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.weight && this.weight.id) {
      this.isEditing = true;

      if (changes.weight && changes.weight.firstChange) {
        this.originalWeight = changes.weight.currentValue;
      }

      this.form.patchValue({
        date: moment.utc(this.weight.date).format('DD/MM/YYYY HH:mm'),
        value: formatNumber(this.weight.value, 'pt', '0.2-2'),
      });
    } else {
      if (this.isNotFilledWeight) {
        this.form.patchValue({
          date: moment().format('DD/MM/YYYY HH:mm'),
        });

        this.isNotFilledWeight = false;
      }
    }
  }

  getErrorDate(): string {
    return this.form.get('date')?.hasError('required')
      ? 'Field is required'
      : '';
  }

  getErrorValue(): string {
    return this.form.get('value')?.hasError('required')
      ? 'Field is required.'
      : this.form.get('value')?.hasError('min')
      ? 'Must be >= 3,35'
      : this.form.get('value')?.hasError('max')
      ? 'Must be <= 400'
      : '';
  }

  onCreate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
      const weight = {
        ...this.weight,
        date: value.date,
        value: value.value,
      };

      this.create.emit(weight);
    }
  }

  onUpdate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
      const weight = {
        ...this.weight,
        date: value.date,
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
