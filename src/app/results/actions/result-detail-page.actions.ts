import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { Result } from '../models';

export const addExamResult = createAction(
  '[Result Detail Page] Add Exam Result'
);

export const changePageResults = createAction(
  '[Result Detail Page] Change Page Exams',
  props<{ pageIndex: number }>()
);

export const deleteExamResult = createAction(
  '[Result Detail Page] Delete Exam Result',
  props<{ id: number; resultId: number }>()
);

export const loadExamsResults = createAction(
  '[Result Detail Page] Load Exams Results'
);

export const sortResults = createAction(
  '[Result Detail Page] Sort Exams',
  props<{ sort: Sort }>()
);

export const updateResult = createAction(
  '[Result Detail Page] Update Result',
  props<{ result: Result }>()
);
