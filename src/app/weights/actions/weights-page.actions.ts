import { createAction, props } from '@ngrx/store';
import { Weight } from '../models';

export const deleteWeight = createAction(
  '[Weights Page] Delete Weight',
  props<{ id: number }>()
);

export const loadWeights = createAction(
  '[Weights Guard] Load Weights',
  props<{ pageIndex: number }>()
);

export const weightFormDialogOpen = createAction(
  '[Weights Page] Weight Form Dialog Open',
  props<{ weight?: Weight }>()
);
