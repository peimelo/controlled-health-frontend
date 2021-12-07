import {
  ChangeDetectionStrategy,
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
import { Exam, ExamResult } from '../../models';

@Component({
  selector: 'app-exam-result-form-dialog',
  templateUrl: './exam-result-form-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
