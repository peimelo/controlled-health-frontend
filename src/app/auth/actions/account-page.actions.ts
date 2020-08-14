import { createAction, props } from '@ngrx/store';
import { PasswordCombination } from '../models';

export const updateAccount = createAction(
  '[Account Page] Update Account',
  props<{ name: string }>()
);

export const updatePassword = createAction(
  '[Account Page] Update Password',
  props<{ passwordCombination: PasswordCombination }>()
);

export const deleteAccountConfirmation = createAction(
  '[Account Page] Delete Account Confirmation'
);
