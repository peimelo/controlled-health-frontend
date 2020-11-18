import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

        <mat-form-field>
          <mat-label>Name</mat-label>

          <input matInput formControlName="name" />
        </mat-form-field>
      </form>

      <mat-action-row>
        <button color="primary" mat-button (click)="onUpdate()">Save</button>
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
  });

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() user: User;

  @Output() update = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  ngOnInit(): void {
    this.form.patchValue({
      email: this.user.email,
      name: this.user.name,
    });
  }

  onUpdate(): void {
    this.update.emit(this.form.get('name').value);
  }
}
