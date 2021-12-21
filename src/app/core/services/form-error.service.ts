import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormErrorService {
  errorMap: {
    [key: string]: (errors: ValidationErrors, name: string) => string;
  } = {
    email: (errors: ValidationErrors, name: string) =>
      'Must be a valid email address.',
    max: (errors: ValidationErrors, name: string) =>
      `Must be <= ${errors['max'].max}.`,
    minlength: (errors: ValidationErrors, name: string) =>
      `Must be at least ${errors['minlength'].requiredLength} characters.`,
    min: (errors: ValidationErrors, name: string) =>
      `Must be >= ${errors['min'].min}.`,
    mustMatch: (errors: ValidationErrors, name: string) =>
      `${name} must be match.`,
    passwordStrength: (errors: ValidationErrors, name: string) =>
      `Your ${name} must have lower case, upper case, numeric and special characters.`,
    required: (errors: ValidationErrors, name: string) =>
      `${name} is required.`,
  };

  mapErrors(errors: ValidationErrors, name: string): string[] {
    if (errors) {
      return Object.keys(errors).map((key) => this.errorMap[key](errors, name));
    }

    return [];
  }

  comparePasswordValidator(controlName: string, matchingControlName: string) {
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
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const hasExtraChars = /[\W_]/.test(value);

      const passwordValid =
        hasUpperCase && hasLowerCase && hasNumeric && hasExtraChars;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }
}
