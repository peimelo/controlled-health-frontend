import { formatNumber } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../../auth/models';
import { FormErrorService } from '../../../core/services/form-error.service';
import { NumberService } from '../../../shared/services';
import {
  Exam,
  ExamResult,
  ExamResultRequest,
  Result,
  Unit,
} from '../../models';

@Component({
  selector: 'app-exam-result-form-dialog',
  templateUrl: './exam-result-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamResultFormDialogComponent implements OnInit, OnChanges {
  @Input() allExams!: Exam[];
  @Input() examResult!: ExamResult;
  @Input() result!: Result;
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  @Input() user!: User;

  @Output() private create = new EventEmitter<ExamResultRequest>();
  @Output() private update = new EventEmitter<ExamResultRequest>();

  form = this.fb.group({
    exam: ['', Validators.required],
    value: ['', [Validators.min(3), Validators.max(400), Validators.required]],
  });
  filteredOptions!: Observable<Exam[]>;
  isEditing!: boolean;
  unitName = '';

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService,
    private numberService: NumberService
  ) {}

  ngOnInit() {
    this.filteredOptions = this.form.get('exam')!.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.allExams.slice()))
    );
  }

  ngOnChanges(): void {
    if (this.isEditing === undefined) {
      if (this.examResult && this.examResult.id) {
        this.isEditing = true;

        this.form.patchValue({
          exam: this.examResult.exam,
          value: formatNumber(this.examResult.value, 'pt', '0.2-2'),
        });
        this.unitName = this.setUnitName(this.examResult.exam.unit);
      } else {
        this.isEditing = false;
      }
    }
  }

  displayFn(exam: Exam): string {
    return exam && exam.name ? exam.name : '';
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

  getValuePlaceholder(): string {
    return this.unitName ? `Value (${this.unitName})` : 'Value';
  }

  onCreate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const examResult = {
        exam: value.exam,
        value: value.value,
      };

      this.create.emit({
        examResult: examResult as ExamResult,
        resultId: this.result.id,
      });
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const {
      option: {
        value: { unit },
      },
    } = event;

    this.unitName = this.setUnitName(unit);
  }

  onUpdate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const examResult: ExamResult = {
        ...this.examResult,
        exam: value.exam,
        value: this.numberService.convertToFloat(
          this.examResult.value,
          value.value
        ),
      };

      this.update.emit({ examResult, resultId: this.result.id });
    }
  }

  private _filter(name: string): Exam[] {
    const filterValue = name.toLowerCase();

    return this.allExams.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private setUnitName(unit: Unit): string {
    return unit?.name ? unit.name : '';
  }
}
