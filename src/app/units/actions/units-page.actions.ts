import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { Unit } from '../../core/models';

export const addUnit = createAction('[Units Page] Add Unit');

export const deleteUnit = createAction(
  '[Units Page] Delete Unit',
  props<{ id: number }>()
);

export const changePageUnits = createAction(
  '[Units Page] Change Page Units',
  props<{ pageIndex: number }>()
);

export const editUnit = createAction(
  '[Units Page] Edit Unit',
  props<{ unit: Unit }>()
);

export const sortUnits = createAction(
  '[Units Page] Sort Units',
  props<{ sort: Sort }>()
);
