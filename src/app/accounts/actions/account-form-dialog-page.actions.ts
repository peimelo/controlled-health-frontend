import { createAction, props } from '@ngrx/store';
import { Account } from '../models';

export const createAccount = createAction(
  '[Account Form Dialog Page] Create Account',
  props<{ account: Account }>()
);

export const updateAccount = createAction(
  '[Account Form Dialog Page] Update Account',
  props<{ account: Account }>()
);
