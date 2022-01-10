import { createAction, props } from '@ngrx/store';
import { Account } from '../models';

export const accountFormDialogDismiss = createAction(
  '[Accounts] Account Form Dialog Dismiss'
);

export const loadAccountFromPageSuccess = createAction(
  '[Accounts] Load Account From Page Success',
  props<{ account: Account }>()
);
