import { createAction, props } from '@ngrx/store';

export const deleteWeight = createAction(
  '[Weights Page] Delete Weight',
  props<{ id: number }>()
);

export const loadWeights = createAction(
  '[Weights Guard] Load Weights',
  props<{ pageIndex: number }>()
);
