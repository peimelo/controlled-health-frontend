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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../../auth/models';
import { FormErrorService } from '../../../core/services/form-error.service';
import { Weight } from '../../../shared/models';
import { DateTimeService } from '../../../shared/services/dateTime.service';
import { NumberService } from '../../../shared/services/number.service';
import { Exam, ExamResult } from '../../models';

@Component({
  selector: 'app-exam-result-form-dialog',
  templateUrl: './exam-result-form-dialog.component.html',
})
export class ExamResultFormDialogComponent implements OnInit, OnChanges {
  form = this.fb.group({
    exam: ['', Validators.required],
    value: ['', [Validators.min(3), Validators.max(400), Validators.required]],
  });
  isEditing = false;
  isNotFilledWeight = true;
  originalWeight!: Weight;

  filteredOptions!: Observable<Exam[]>;

  @Input() allExams!: Exam[];
  @Input() error!: Observable<any>;
  @Input() examResult!: ExamResult;

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() user!: User;

  @Output() private create = new EventEmitter<any>();
  @Output() private update = new EventEmitter<any>();

  constructor(
    private dateTimeService: DateTimeService,
    private numberService: NumberService,
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnInit() {
    this.filteredOptions = this.form.get('exam')!.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.allExams.slice()))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.examResult && this.examResult.id) {
      this.isEditing = true;

      //   if (changes.weight && changes.weight.firstChange) {
      //     this.originalWeight = changes.weight.currentValue;
      //   }

      //   this.form.patchValue({
      //     date: this.dateTimeService.convertDateToUtc(this.weight.date),
      //     time: this.dateTimeService.convertTimeToUtc(this.weight.date),
      //     value: formatNumber(this.weight.value, 'pt', '0.2-2'),
      //   });
    } else {
      //   if (this.isNotFilledWeight) {
      //     this.form.patchValue({
      //       date: this.dateTimeService.dateNow(),
      //       time: this.dateTimeService.timeNow(),
      //     });
      //     this.isNotFilledWeight = false;
      // }
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

  onCreate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
    }
  }

  onUpdate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
    }
  }

  private _filter(name: string): Exam[] {
    const filterValue = name.toLowerCase();

    return this.allExams.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
