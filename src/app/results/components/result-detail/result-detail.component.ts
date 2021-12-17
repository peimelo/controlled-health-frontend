import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormErrorService } from '../../../core/services/form-error.service';
import { DateTimeService } from '../../../shared/services/dateTime.service';
import { Result } from '../../models';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultDetailComponent implements OnChanges {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  @Input() result!: Result;

  @Output() private create = new EventEmitter<Result>();
  @Output() private update = new EventEmitter<Result>();

  form = this.fb.group({
    date: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  isEditing!: boolean;

  constructor(
    private dateTimeService: DateTimeService,
    private router: Router,
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnChanges(): void {
    if (this.isEditing === undefined) {
      if (this.result && this.result.id) {
        this.isEditing = true;

        this.form.patchValue({
          date: this.result.date,
          description: this.result.description,
        });
      } else {
        this.isEditing = false;

        this.form.patchValue({
          date: this.dateTimeService.dateNow(),
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['results']);
  }

  onCreate(): void {
    const { valid, value } = this.form;

    if (valid) {
      const date = this.dateTimeService.convertDateToSave(value.date);

      const result = {
        date,
        description: value.description,
      };

      this.create.emit(result as Result);
    }
  }

  onUpdate(form: FormGroup): void {
    const { valid, value } = form;

    if (valid) {
      const date = this.dateTimeService.convertDateToSave(value.date);

      const result: Result = {
        ...this.result,
        date,
        description: value.description,
      };

      this.update.emit(result);
    }
  }
}
