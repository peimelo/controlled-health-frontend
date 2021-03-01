import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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

        <mat-panel-description> Type your data </mat-panel-description>
      </mat-expansion-panel-header>

      <form [formGroup]="form">
        <div fxLayout fxLayout.xs="column" fxLayoutGap="10px">
          <mat-form-field>
            <mat-label>Email</mat-label>

            <input matInput formControlName="email" />

            <mat-error
              *ngFor="
                let error of formErrorService.mapErrors(
                  form.get('email')?.errors
                )
              "
            >
              {{ error }}
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Name</mat-label>

            <input matInput formControlName="name" />
          </mat-form-field>
        </div>

        <div fxLayout fxLayout.xs="column" fxLayoutGap="10px">
          <mat-form-field fxFlex="50%">
            <mat-label>Gender</mat-label>
            <mat-select formControlName="gender">
              <mat-option value=""></mat-option>
              <mat-option value="F">F</mat-option>
              <mat-option value="M">M</mat-option>
            </mat-select>
          </mat-form-field>

          <app-date-picker
            [controlName]="'date_of_birth'"
            [form]="form"
            [label]="'Date of birth'"
            [required]="false"
          >
          </app-date-picker>
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
export class PersonalDataComponent implements OnChanges {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && changes.user.currentValue) {
      this.form.patchValue({
        date_of_birth: this.user.date_of_birth,
        email: this.user.email,
        gender: this.user.gender,
        name: this.user.name,
      });
    }
  }

  onUpdate(): void {
    const { valid, value } = this.form;

    if (valid) {
      this.update.emit({
        ...this.user,
        date_of_birth: moment(value.date_of_birth).format('YYYY-MM-DD'),
        email: value.email,
        gender: value.gender,
        name: value.name,
      });
    }
  }
}
