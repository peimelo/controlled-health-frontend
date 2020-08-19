import { createAction, props } from '@ngrx/store';
import { WeightResponse } from '../models';

export const deleteWeightFailure = createAction(
  '[Weights/API] Delete Weights Failure'
);

export const deleteWeightSuccess = createAction(
  '[Weights/API] Delete Weights Success',
  props<{ id: number }>()
);

export const loadWeightsFailure = createAction(
  '[Weights/API] Load Weights Failure'
);

export const loadWeightsSuccess = createAction(
  '[Weights/API] Load Weights Success',
  props<{ weightResponse: WeightResponse }>()
);
