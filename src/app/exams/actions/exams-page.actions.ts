import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { Exam } from '../../core/models';

export const addExam = createAction('[Exams Page] Add Exam');

export const deleteExam = createAction(
  '[Exams Page] Delete Exam',
  props<{ id: number }>()
);

export const changePageExams = createAction(
  '[Exams Page] Change Page Exams',
  props<{ pageIndex: number }>()
);

export const editExam = createAction(
  '[Exams Page] Edit Exam',
  props<{ exam: Exam }>()
);

export const sortExams = createAction(
  '[Exams Page] Sort Exams',
  props<{ sort: Sort }>()
);
