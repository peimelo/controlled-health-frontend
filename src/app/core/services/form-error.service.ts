import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable()
export class FormErrorService {
  errorMap: {
    [key: string]: (errors: ValidationErrors, name: string) => string;
  } = {
    confirmedValidator: (errors: ValidationErrors, name: string) =>
      `${name} must be match.`,
    email: (errors: ValidationErrors, name: string) =>
      'Must be a valid email address.',
    minlength: (errors: ValidationErrors, name: string) =>
      `Must be at least ${errors.minlength.requiredLength} characters.`,
    required: (errors: ValidationErrors, name: string) => 'Field is required.',
  };

  mapErrors(errors: ValidationErrors, name: string): string[] {
    return Object.keys(errors || {}).map((key) =>
      this.errorMap[key](errors, name)
    );
  }

  confirmedValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
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
}
