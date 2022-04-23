import { createAction, props } from '@ngrx/store';
import { Unit } from '../../core/models';

export const loadAllUnitsSuccess = createAction(
  '[Units/API] Load All Units Success',
  props<{ units: ReadonlyArray<Unit> }>()
);
