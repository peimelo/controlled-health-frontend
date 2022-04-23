import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exam } from '../../../core/models';
import { FormErrorService } from '../../../core/services/form-error.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamDetailComponent implements OnChanges {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  @Input() exam!: Exam;

  @Output() private create = new EventEmitter<Exam>();
  @Output() private update = new EventEmitter<Exam>();

  form = this.fb.group({
    name: ['', [Validators.required]],
  });
  isEditing!: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnChanges(): void {
    if (this.isEditing === undefined) {
      if (this.exam && this.exam.id) {
        this.isEditing = true;

        this.form.patchValue({
          name: this.exam.name,
        });
      } else {
        this.isEditing = false;
      }
    }
  }

  goBack() {
    this.router.navigate(['exams']);
  }

  onCreate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const exam = {
        name: value.name,
      };

      this.create.emit(exam as Exam);
    }
  }

  onUpdate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const exam: Exam = {
        ...this.exam,
        name: value.name,
      };

      this.update.emit(exam);
    }
  }
}
