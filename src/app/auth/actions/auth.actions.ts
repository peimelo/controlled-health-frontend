import { createAction } from '@ngrx/store';

export const loadUser = createAction('[Auth Guard] Load User');

export const deleteAccount = createAction('[Auth] Delete Account');

export const deleteAccountConfirmationDismiss = createAction(
  '[Auth] Delete Account Confirmation Dismiss'
);

export const logout = createAction('[Auth] Logout');
