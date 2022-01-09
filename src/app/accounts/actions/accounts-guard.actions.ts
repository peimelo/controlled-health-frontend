import { createAction, props } from '@ngrx/store';

export const loadAccounts = createAction('[Accounts Guard] Load Accounts');
export const loadAccount = createAction(
  '[Accounts Guard] Load Account',
  props<{ id: number }>()
);
