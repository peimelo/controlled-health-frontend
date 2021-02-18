import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { Weight } from '../../shared/models';

export const addWeight = createAction('[Weights Page] Add Weight');

export const deleteWeight = createAction(
  '[Weights Page] Delete Weight',
  props<{ id: number }>()
);

export const changePageWeights = createAction(
  '[Weights Page] Change Page Weights',
  props<{ pageIndex: number }>()
);

export const editWeight = createAction(
  '[Weights Page] Edit Weight',
  props<{ weight: Weight }>()
);

export const loadWeights = createAction('[Weights Page] Load Weights');

export const sortWeights = createAction(
  '[Weights Page] Sort Weights',
  props<{ sort: Sort }>()
);
