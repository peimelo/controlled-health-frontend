import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class FormErrorService {
  errorMap: {
    [key: string]: (errors: ValidationErrors, name: string) => string;
  } = {
    confirmedValidator: (errors: ValidationErrors, name: string) =>
      `${name} must be match.`,
    email: (errors: ValidationErrors, name: string) =>
      'Must be a valid email address.',
    max: (errors: ValidationErrors, name: string) =>
      `Must be <= ${errors['max'].max}.`,
    minlength: (errors: ValidationErrors, name: string) =>
      `Must be at least ${errors['minlength'].requiredLength} characters.`,
    min: (errors: ValidationErrors, name: string) =>
      `Must be >= ${errors['min'].min}.`,
    required: (errors: ValidationErrors, name: string) => 'Field is required.',
  };

  mapErrors(errors: ValidationErrors, name = ''): string[] {
    if (!errors) {
      return [];
    }

    return Object.keys(errors).map((key) => this.errorMap[key](errors, name));
  }

  confirmedValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  isMyDateFormat(date: string): string {
    const da = date.split('/');

    if (
      da.length !== 3 ||
      da[0].length !== 2 ||
      da[1].length !== 2 ||
      da[2].length !== 4
    ) {
      return 'Please input in the form of DD/MM/YYYY';
    } else if (!moment(date).isValid()) {
      return 'Please input a valid date.';
    }

    return 'Unknown error.';
  }
}
