import { createAction, props } from '@ngrx/store';

export const errorMessage = createAction(
  '[Message/API] Error Message',
  props<{ message: string }>()
);

export const successMessage = createAction(
  '[Message/API] Success Message',
  props<{ message: string }>()
);
