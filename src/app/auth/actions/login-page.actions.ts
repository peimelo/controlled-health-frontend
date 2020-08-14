import { createAction, props } from '@ngrx/store';
import { Credentials } from '../models';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: Credentials }>()
);

export const showAccountConfirmationMessage = createAction(
  '[Login Page] Show Account Confirmation Message',
  props<{ message: string }>()
);
