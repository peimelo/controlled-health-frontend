import { createAction, props } from '@ngrx/store';

export const loadWeights = createAction(
  '[Weights Guard] Load Weights',
  props<{ pageIndex: number }>()
);

export const weightFormDialogDismiss = createAction(
  '[Weights] Weight Form Dialog Dismiss'
);
