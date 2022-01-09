import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { Height } from '../../core/models';

export const addHeight = createAction('[Heights Page] Add Height');

export const deleteHeight = createAction(
  '[Heights Page] Delete Height',
  props<{ id: number }>()
);

export const changePageHeights = createAction(
  '[Heights Page] Change Page Heights',
  props<{ pageIndex: number }>()
);

export const editHeight = createAction(
  '[Heights Page] Edit Height',
  props<{ height: Height }>()
);

export const sortHeights = createAction(
  '[Heights Page] Sort Heights',
  props<{ sort: Sort }>()
);
