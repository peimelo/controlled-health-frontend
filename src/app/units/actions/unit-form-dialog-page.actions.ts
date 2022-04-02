import { createAction, props } from '@ngrx/store';
import { Unit } from '../../core/models';

export const createUnit = createAction(
  '[Unit Form Dialog Page] Create Unit',
  props<{ unit: Unit }>()
);

export const updateUnit = createAction(
  '[Unit Form Dialog Page] Update Unit',
  props<{ unit: Unit }>()
);
