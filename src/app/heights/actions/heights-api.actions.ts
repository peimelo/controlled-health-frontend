import { createAction, props } from '@ngrx/store';
import { HeightResponse } from '../models';

export const createHeightSuccess = createAction(
  '[Heights/API] Create Height Success'
);

export const deleteHeightSuccess = createAction(
  '[Heights/API] Delete Heights Success'
);

export const loadHeightsSuccess = createAction(
  '[Heights/API] Load Heights Success',
  props<{ heightResponse: HeightResponse }>()
);

export const updateHeightSuccess = createAction(
  '[Heights/API] Update Height Success'
);
