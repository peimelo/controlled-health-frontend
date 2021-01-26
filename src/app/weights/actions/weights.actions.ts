import { createAction } from '@ngrx/store';

export const reloadWeights = createAction('[Weights Effects] Reload Weights');

export const weightFormDialogDismiss = createAction(
  '[Weights] Weight Form Dialog Dismiss'
);
