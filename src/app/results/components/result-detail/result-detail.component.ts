import { Location } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';
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

  @Input() result!: Result;

  constructor(
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

  save() {}
}
