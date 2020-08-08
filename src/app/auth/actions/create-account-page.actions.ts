import { createAction, props } from '@ngrx/store';
import { CreateAccountRequest } from '../models';

export const createAccount = createAction(
  '[Create Account Page] Create Account',
  props<{ account: CreateAccountRequest }>()
);
