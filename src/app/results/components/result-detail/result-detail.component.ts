import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';
import { DateTimeService } from '../../../shared/services/dateTime.service';
import { Result } from '../../models';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss'],
})
export class ResultDetailComponent implements OnChanges {
  form = this.fb.group({
    date: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() result!: Result;
  @Output() private update = new EventEmitter<Result>();

  constructor(
    private dateTimeService: DateTimeService,
    private location: Location,
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.result && changes.result.currentValue) {
      this.form.patchValue({
        date: this.result.date,
        description: this.result.description,
      });
    }
  }

  goBack() {
    this.location.back();
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
