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
import { Exam } from '../../../core/models';
import { FormErrorService } from '../../../core/services/form-error.service';
import { NumberService } from '../../../shared/services';
import { ExamResult, ExamResultRequest, Result, Unit } from '../../models';

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
    value: ['', [Validators.max(99999999.99), Validators.required]],
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

  clearExam(): void {
    this.form.controls['exam'].setValue('');
  }

  displayFn(exam: Exam): string {
    return exam && exam.name ? exam.name : '';
  }

  getValueSulffix(): string {
    return this.unitName ? this.unitName : '';
  }

  onCreate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const examResult = {
        exam: value.exam,
        value: this.numberService.convertToFloat(value.value),
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
        value: this.numberService.convertToFloat(value.value),
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
