import { createAction, props } from '@ngrx/store';
import { Account } from '../models';

export const addAccount = createAction('[Accounts Page] Add Account');

export const deleteAccount = createAction(
  '[Accounts Page] Delete Account',
  props<{ id: number }>()
);

export const editAccount = createAction(
  '[Accounts Page] Edit Account',
  props<{ account: Account }>()
);

export const loadAccount = createAction(
  '[Accounts Page] Load Account',
  props<{ account: Account }>()
);
