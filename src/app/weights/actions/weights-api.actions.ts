import { createAction, props } from '@ngrx/store';
import { WeightResponse } from '../models';

export const createWeightSuccess = createAction(
  '[Weights/API] Create Weight Success'
);

export const deleteWeightSuccess = createAction(
  '[Weights/API] Delete Weights Success'
);

export const loadWeightsSuccess = createAction(
  '[Weights/API] Load Weights Success',
  props<{ weightResponse: WeightResponse }>()
);

export const updateWeightSuccess = createAction(
  '[Weights/API] Update Weight Success'
);
