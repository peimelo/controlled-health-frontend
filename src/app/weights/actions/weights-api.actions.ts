import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Weight } from '../../shared/models';
import { WeightResponse } from '../models';

export const createWeightFailure = createAction(
  '[Weights/API] Create Weight Failure',
  props<{ error: any }>()
);

export const createWeightSuccess = createAction(
  '[Weights/API] Create Weight Success',
  props<{ weight: Weight }>()
);

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

export const updateWeightFailure = createAction(
  '[Weights/API] Update Weight Failure',
  props<{ error: any }>()
);

export const updateWeightSuccess = createAction(
  '[Weights/API] Update Weight Success',
  props<{ update: Update<Weight> }>()
);
