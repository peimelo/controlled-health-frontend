import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Height } from '../../shared/models';
import { HeightResponse } from '../models';

export const createHeightFailure = createAction(
  '[Heights/API] Create Height Failure',
  props<{ error: any }>()
);

export const createHeightSuccess = createAction(
  '[Heights/API] Create Height Success',
  props<{ height: Height }>()
);

export const deleteHeightFailure = createAction(
  '[Heights/API] Delete Heights Failure'
);

export const deleteHeightSuccess = createAction(
  '[Heights/API] Delete Heights Success',
  props<{ id: number }>()
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
  '[Heights/API] Update Height Success',
  props<{ update: Update<Height> }>()
);
