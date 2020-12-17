import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable()
export class FormErrorService {
  errorMap: {
    [key: string]: (errors: ValidationErrors, name: string) => string;
  } = {
    confirmedValidator: (c: FormControl, name: string) =>
      `${name} must be match.`,
    email: (c: FormControl, name: string) => 'Must be a valid email address.',
    minlength: (errors: ValidationErrors, name: string) =>
      `Must be at least ${errors.minlength.requiredLength} characters.`,
    required: (c: FormControl, name: string) => 'Field is required.',
  };

  mapErrors(errors: ValidationErrors, name?: string): string[] {
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
