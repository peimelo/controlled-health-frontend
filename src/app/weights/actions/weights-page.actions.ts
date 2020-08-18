import { createAction, props } from '@ngrx/store';

export const loadWeights = createAction(
  '[Weights Guard] Load Weights',
  props<{ pageIndex: number }>()
);
