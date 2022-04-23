import { createAction, props } from '@ngrx/store';
import { UnitResponse } from '../../core/models';

export const createUnitSuccess = createAction(
  '[Units/API] Create Unit Success'
);

export const deleteUnitSuccess = createAction(
  '[Units/API] Delete Units Success'
);

export const loadUnitsSuccess = createAction(
  '[Units/API] Load Units Success',
  props<{ unitResponse: UnitResponse }>()
);

export const updateUnitSuccess = createAction(
  '[Units/API] Update Unit Success'
);
