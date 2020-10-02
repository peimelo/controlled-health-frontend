import { createAction, props } from '@ngrx/store';
import { Weight } from '../models';

export const addWeight = createAction('[Weights Page] Add Weight');

export const deleteWeight = createAction(
  '[Weights Page] Delete Weight',
  props<{ id: number }>()
);

export const loadWeights = createAction(
  '[Weights Guard] Load Weights',
  props<{ pageIndex: number }>()
);

export const editWeight = createAction(
  '[Weights Page] Edit Weight',
  props<{ weight: Weight }>()
);
