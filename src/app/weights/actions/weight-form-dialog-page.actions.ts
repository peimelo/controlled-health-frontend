import { createAction, props } from '@ngrx/store';
import { Weight } from '../../core/models';

export const createWeight = createAction(
  '[Weight Form Dialog Page] Create Weight',
  props<{ weight: Weight }>()
);

export const updateWeight = createAction(
  '[Weight Form Dialog Page] Update Weight',
  props<{ weight: Weight }>()
);
