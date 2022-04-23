import { createAction, props } from '@ngrx/store';
import { Exam, ExamResponse } from '../../core/models';

export const createExamSuccess = createAction(
  '[Exams/API] Create Exam Success',
  props<{ exam: Exam }>()
);

export const deleteExamSuccess = createAction(
  '[Exams/API] Delete Exam Success'
);

export const loadExamsExams = createAction('[Exams/API] Load Exams Exams');

export const loadExamsSuccess = createAction(
  '[Exams/API] Load Exams Success',
  props<{ examResponse: ExamResponse }>()
);

export const loadExamSuccess = createAction(
  '[Exams/API] Load Exam Success',
  props<{ exam: Exam }>()
);

export const updateExamSuccess = createAction(
  '[Exams/API] Update Exam Success'
);
