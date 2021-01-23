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
import { Height } from '../../../shared/models';

@Component({
  selector: 'app-height-form-dialog',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './height-form-dialog.component.html',
})
export class HeightFormDialogComponent implements OnChanges, OnInit {
  form = this.fb.group({
    date: ['', Validators.required],
    value: [
      '',
      [Validators.max(2.52), Validators.min(0.2), Validators.required],
    ],
  });
  isNotFilledHeight = true;
  isEditing = false;
  originalHeight!: Height;

  @Input() error!: Observable<any>;
  @Input() isLoading!: boolean;
  @Input() user!: User;
  @Input() height!: Height;

  @Output() private create = new EventEmitter<Height>();
  @Output() private update = new EventEmitter<Height>();

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
    if (this.height && this.height.id) {
      this.isEditing = true;

      if (changes.height && changes.height.firstChange) {
        this.originalHeight = changes.height.currentValue;
      }

      this.form.patchValue({
        date: moment.utc(this.height.date).format('DD/MM/YYYY HH:mm'),
        value: formatNumber(this.height.value, 'pt', '0.2-2'),
      });
    } else {
      if (this.isNotFilledHeight) {
        this.form.patchValue({
          date: moment().format('DD/MM/YYYY HH:mm'),
        });

        this.isNotFilledHeight = false;
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
      ? 'Must be >= 0,20'
      : this.form.get('value')?.hasError('max')
      ? 'Must be <= 2,52'
      : '';
  }

  onCreate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
      const height = {
        ...this.height,
        date: value.date,
        value: value.value,
      };

      this.create.emit(height);
    }
  }

  onUpdate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
      const height = {
        ...this.height,
        date: value.date,
        value: this.convertToFloat(this.originalHeight.value, value.value),
      };

      this.update.emit(height);
    }
  }

  private convertToFloat(oldValue: any, newValue: any): number {
    return parseFloat(oldValue) ===
      parseFloat(newValue.replace('.', '').replace(',', '.'))
      ? oldValue
      : newValue;
  }
}
