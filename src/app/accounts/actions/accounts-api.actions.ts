import { createAction, props } from '@ngrx/store';
import { AccountResponse } from '../models';

export const createAccountSuccess = createAction(
  '[Accounts/API] Create Account Success'
);

export const deleteAccountSuccess = createAction(
  '[Accounts/API] Delete Accounts Success'
);

export const loadAccountsSuccess = createAction(
  '[Accounts/API] Load Accounts Success',
  props<{ accountResponse: AccountResponse }>()
);

export const updateAccountSuccess = createAction(
  '[Accounts/API] Update Account Success'
);
