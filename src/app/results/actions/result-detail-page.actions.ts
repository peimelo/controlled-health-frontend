import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { ExamResult, Result } from '../models';

export const addExamResult = createAction(
  '[Result Detail Page] Add Exam Result'
);

export const changePageResults = createAction(
  '[Result Detail Page] Change Page Exams',
  props<{ pageIndex: number }>()
);

export const createResult = createAction(
  '[Result Detail Page] Create Result',
  props<{ result: Result }>()
);

export const deleteExamResult = createAction(
  '[Result Detail Page] Delete Exam Result',
  props<{ id: number; resultId: number }>()
);

export const editExamResult = createAction(
  '[Result Detail Page] Edit Exam Result',
  props<{ examResult: ExamResult }>()
);

export const sortResults = createAction(
  '[Result Detail Page] Sort Exams',
  props<{ sort: Sort }>()
);

export const updateResult = createAction(
  '[Result Detail Page] Update Result',
  props<{ result: Result }>()
);
