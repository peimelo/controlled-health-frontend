import { createAction, props } from '@ngrx/store';
import { WeightResponse } from '../models';

export const loadWeightsFailure = createAction(
  '[Weights/API] Load Weights Failure'
  // props<{ user: any }>()
);

export const loadWeightsSuccess = createAction(
  '[Weights/API] Load Weights Success',
  props<{ weightResponse: WeightResponse }>()
);
