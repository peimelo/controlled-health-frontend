import { createAction, props } from '@ngrx/store';
import { HeightResponse } from '../models';

export const createHeightFailure = createAction(
  '[Heights/API] Create Height Failure',
  props<{ error: any }>()
);

export const createHeightSuccess = createAction(
  '[Heights/API] Create Height Success'
);

export const deleteHeightFailure = createAction(
  '[Heights/API] Delete Heights Failure'
);

export const deleteHeightSuccess = createAction(
  '[Heights/API] Delete Heights Success'
);

export const loadHeightsFailure = createAction(
  '[Heights/API] Load Heights Failure'
);

export const loadHeightsSuccess = createAction(
  '[Heights/API] Load Heights Success',
  props<{ heightResponse: HeightResponse }>()
);

export const updateHeightFailure = createAction(
  '[Heights/API] Update Height Failure',
  props<{ error: any }>()
);

export const updateHeightSuccess = createAction(
  '[Heights/API] Update Height Success'
);
