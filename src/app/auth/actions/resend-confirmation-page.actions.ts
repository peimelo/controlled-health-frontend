import { createAction, props } from '@ngrx/store';

export const resendConfirmation = createAction(
  '[Resend Confirmation Page] Resend Confirmation',
  props<{ email: string }>()
);
