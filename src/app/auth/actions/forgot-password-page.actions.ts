import { createAction, props } from '@ngrx/store';

export const forgotPassword = createAction(
  '[Forgot Password Page] Forgot Password',
  props<{ email: string }>()
);
