import { createAction, props } from '@ngrx/store';
import { Weight } from '../../shared/models';

export const createWeight = createAction(
  '[Weights Form Dialog Page] Create Weight',
  props<{ weight: Weight }>()
);

export const updateWeight = createAction(
  '[Weights Form Dialog Page] Update Weight',
  props<{ weight: Weight }>()
);
