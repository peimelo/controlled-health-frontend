import { createAction, props } from '@ngrx/store';
import { User } from '../models';

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: User }>()
);

export const loginRedirect = createAction('[Auth/API] Login Redirect');
