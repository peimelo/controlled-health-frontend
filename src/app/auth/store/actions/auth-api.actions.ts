import { createAction, props } from '@ngrx/store';
import { User } from '../../models';

/**
 * Login Actions
 */
export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: User }>()
);

export const loginRedirect = createAction('[Auth/API] Login Redirect');

/**
 * Load User Actions
 */
export const loadUserFailure = createAction(
  '[Auth/API] Load User Failure',
  props<{ error: any }>()
);

export const loadUserSuccess = createAction(
  '[Auth/API] Load User Success',
  props<{ user: User }>()
);

