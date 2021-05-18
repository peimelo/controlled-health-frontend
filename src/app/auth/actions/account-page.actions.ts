import { createAction, props } from '@ngrx/store';
import { PasswordCombination, User } from '../models';

export const deleteAccountConfirmation = createAction(
  '[Account Page] Delete Account Confirmation'
);

export const updateAccount = createAction(
  '[Account Page] Update Account',
  props<{ user: User }>()
);

export const updatePassword = createAction(
  '[Account Page] Update Password',
  props<{ passwordCombination: PasswordCombination }>()
);
