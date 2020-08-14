import { createAction, props } from '@ngrx/store';
import { User } from '../models';

export const loadUserSuccess = createAction(
  '[Auth/API] Load User Success',
  props<{ user: User }>()
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: User }>()
);

export const loginRedirect = createAction('[Auth/API] Login Redirect');

export const updateAccountSuccess = createAction(
  '[Auth/API] Update Account Success',
  props<{ user: User }>()
);
