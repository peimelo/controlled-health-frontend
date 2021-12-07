import {
  ChangeDetectionStrategy,
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
import { DateTimeService } from '../../../shared/services/dateTime.service';
import { Result } from '../../models';

@Component({
  selector: 'app-result-form-dialog',
  templateUrl: './result-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultFormDialogComponent implements OnChanges {
  form = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    value: ['', [Validators.min(3), Validators.max(400), Validators.required]],
  });
  isNotFilledResult = true;
  isEditing = false;
  originalResult!: Result;

  @Input() error!: Observable<any>;
  @Input() isLoading!: boolean;
  @Input() user!: User;
  @Input() result!: Result;

  @Output() private create = new EventEmitter<Result>();
  @Output() private update = new EventEmitter<Result>();

  constructor(
    private dateTimeService: DateTimeService,
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.result && this.result.id) {
      this.isEditing = true;

      if (changes.result && changes.result.firstChange) {
        this.originalResult = changes.result.currentValue;
      }

      this.form.patchValue({
        date: this.dateTimeService.convertDateToUtc(this.result.date),
        description: this.result.description,
      });
    } else {
      if (this.isNotFilledResult) {
        this.form.patchValue({
          date: this.dateTimeService.dateNow(),
        });

        this.isNotFilledResult = false;
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
      const result = {
        ...this.result,
        date: this.dateTimeService.convertDateToSave(value.date),
        description: value.description,
      };

      this.create.emit(result);
    }
  }

  onUpdate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
      const result = {
        ...this.result,
        date: this.dateTimeService.convertDateToSave(value.date),
        description: value.description,
      };

      this.update.emit(result);
    }
  }
}
