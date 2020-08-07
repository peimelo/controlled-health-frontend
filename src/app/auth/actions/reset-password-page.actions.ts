import { createAction, props } from '@ngrx/store';
import { PasswordCombination } from '../models';

export const resetPassword = createAction(
  '[Reset Password Page] Reset Password',
  props<{ passwordCombination: PasswordCombination }>()
);
