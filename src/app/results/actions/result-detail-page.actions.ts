import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';

export const changePageResults = createAction(
  '[Results Detail Page] Change Page Exams',
  props<{ pageIndex: number }>()
);

export const loadExamsResults = createAction(
  '[Result Detail Page] Load Exams Results'
);

export const sortResults = createAction(
  '[Results Detail Page] Sort Exams',
  props<{ sort: Sort }>()
);
