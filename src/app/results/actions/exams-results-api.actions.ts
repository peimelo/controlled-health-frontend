import { createAction, props } from '@ngrx/store';
import { ExamResultResponse } from '../models';

export const loadExamsResultsSuccess = createAction(
  '[Exams Results/API] Load Exams Results Success',
  props<{ examResultResponse: ExamResultResponse }>()
);
