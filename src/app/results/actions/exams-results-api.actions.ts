import { createAction, props } from '@ngrx/store';
import { ExamResultResponse } from '../models';

export const createExamResultSuccess = createAction(
  '[Exams Results/API] Create Exam Result Success'
);

export const deleteExamResultSuccess = createAction(
  '[Exams Results/API] Delete Exam Result Success'
);

export const loadExamsResultsSuccess = createAction(
  '[Exams Results/API] Load Exams Results Success',
  props<{ examResultResponse: ExamResultResponse }>()
);

export const updateExamResultSuccess = createAction(
  '[Exams Results/API] Update Exam Result Success'
);
