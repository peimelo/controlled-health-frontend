import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { Result } from '../models';

export const addResult = createAction('[Results Page] Add Result');

export const deleteResult = createAction(
  '[Results Page] Delete Result',
  props<{ id: number }>()
);

export const changePageResults = createAction(
  '[Results Page] Change Page Results',
  props<{ pageIndex: number }>()
);

export const editResult = createAction(
  '[Results Page] Edit Result',
  props<{ result: Result }>()
);

export const sortResults = createAction(
  '[Results Page] Sort Results',
  props<{ sort: Sort }>()
);
