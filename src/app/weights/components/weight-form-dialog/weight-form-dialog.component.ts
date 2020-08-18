import { formatNumber } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'src/app/auth/models';
import { Weight } from '../../models';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-weight-form-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weight-form-dialog.component.html'
})
export class WeightFormDialogComponent implements OnChanges, OnInit {
  form = this.fb.group({
    date: ['', Validators.required],
    height: ['', [
      Validators.max(2.5),
      Validators.min(0.48),
      Validators.required,
    ]],
    value: ['', [
      Validators.max(400),
      Validators.min(3.35),
      Validators.required,
    ]],
  });
  isNotFilledWeight = true;
  isEditing = false;
  originalWeight: Weight;

  @Input() error: Observable<any>;
  @Input() isLoading: boolean;
  @Input() user: User;
  @Input() weight: Weight;

  @Output() create = new EventEmitter<Weight>();
  @Output() update = new EventEmitter<Weight>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.error.subscribe(validationErrors => {
      if (validationErrors) {
        console.log(validationErrors);

        Object.keys(validationErrors).forEach(prop => {
          console.log(prop);

          const formControl = this.form.get(prop);

          if (formControl) {
            console.log(validationErrors[prop]);
            formControl.setErrors({
              serverError: validationErrors[prop]
            });
          }
        })
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.weight && this.weight.id) {
      this.isEditing = true;

      if (changes.weight && changes.weight.firstChange) {
        this.originalWeight = changes.weight.currentValue;
      }

      this.form.patchValue({
        date: moment.utc(this.weight.date).format('DD/MM/YYYY HH:mm'),
        height: formatNumber(this.weight.height, 'pt', '0.2-2'),
        value: formatNumber(this.weight.value, 'pt', '0.2-2'),
      });
    } else {
      if (this.isNotFilledWeight) {
        this.form.patchValue({
          date: moment().format('DD/MM/YYYY HH:mm'),
          height: formatNumber(this.user.height, 'pt', '0.2-2'),
        });

        this.isNotFilledWeight = false;
      }
    }
  }

  getErrorDate() {
    return this.form.get('date').hasError('required') ? 'Field is required' : '';
  }

  getErrorHeight() {
    return this.form.get('height').hasError('required') ? 'Field is required' :
      this.form.get('height').hasError('min') ? 'Must be >= 0,48' :
        this.form.get('height').hasError('max') ? 'Must be <= 2,5' : '';
  }

  getErrorValue() {
    return this.form.get('value').hasError('required') ? 'Field is required' :
      this.form.get('value').hasError('min') ? 'Must be >= 3,35' :
        this.form.get('value').hasError('max') ? 'Must be <= 400' : '';
  }

  onCreate(form: FormGroup) {
    const { valid, value } = form;

    if (valid) {
      const weight = {
        ...this.weight,
        date: value.date,
        height: this.convertToFloat(this.user.height, value.height),
        value: value.value,
      };

      this.create.emit(weight);
    }
  }

  onUpdate(form: FormGroup) {
    const { valid, value } = form;

    if (valid) {
      const weight = {
        ...this.weight,
        date: value.date,
        height: this.convertToFloat(this.originalWeight.height, value.height),
        value: this.convertToFloat(this.originalWeight.value, value.value),
      };

      this.update.emit(weight);
    }
  }

  private convertToFloat(oldValue: any, newValue: any): number {
    return parseFloat(oldValue) === parseFloat(newValue.replace('.', '').replace(',', '.'))
      ? oldValue
      : newValue
  }
}
