import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { FormErrorService } from '../../../core/services/form-error.service';
import { User } from '../../models';

@Component({
  selector: 'app-personal-data',
  template: `
    <mat-expansion-panel expanded="true">
      <mat-expansion-panel-header>
        <mat-panel-title> Personal Data </mat-panel-title>

        <mat-panel-description> Type your name </mat-panel-description>
      </mat-expansion-panel-header>

      <form [formGroup]="form">
        <mat-form-field>
          <mat-label>Email</mat-label>

          <input matInput [value]="user?.email" disabled />
        </mat-form-field>

        <div fxLayout fxLayout.xs="column" fxLayoutGap="10px">
          <mat-form-field>
            <mat-label>Name</mat-label>

            <input matInput formControlName="name" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Gender</mat-label>
            <mat-select formControlName="gender">
              <mat-option value="F">F</mat-option>
              <mat-option value="M">M</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Date of birth</mat-label>
            <input
              matInput
              [matDatepicker]="picker"
              formControlName="date_of_birth"
              maxlength="10"
              #pickerInput
            />
            <mat-datepicker-toggle
              matSuffix
              [for]="picker"
            ></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error
              *ngIf="
                !form.controls['date_of_birth'].valid &&
                form.controls['date_of_birth'].touched
              "
            >
              {{ getErrorDate(pickerInput.value) }}
            </mat-error>
          </mat-form-field>
        </div>
      </form>

      <mat-action-row>
        <button
          color="primary"
          [disabled]="!form.valid"
          mat-button
          (click)="onUpdate()"
        >
          Save
        </button>
      </mat-action-row>
    </mat-expansion-panel>
  `,
  styleUrls: ['./account-form.component.scss'],
})
export class PersonalDataComponent implements OnInit {
  form = this.fb.group({
    email: [
      { value: '', disabled: true },
      [Validators.email, Validators.required],
    ],
    name: ['', []],
    gender: ['', []],
    date_of_birth: ['', []],
  });

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() user!: User;

  @Output() update = new EventEmitter<User>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnInit(): void {
    this.form.patchValue({
      email: this.user.email,
      name: this.user.name,
      gender: this.user.gender,
      date_of_birth: this.user.date_of_birth,
    });
  }

  getErrorDate(pickerInput: string): string {
    if (!pickerInput || pickerInput === '') {
      return 'Please choose a date.';
    }

    return this.formErrorService.isMyDateFormat(pickerInput);
  }

  onUpdate(): void {
    const { valid, value } = this.form;

    if (valid) {
      this.update.emit({
        ...this.user,
        date_of_birth: moment(value.date_of_birth).format('YYYY-MM-DD'),
        gender: value.gender,
        name: value.name,
      });
    }
  }
}
