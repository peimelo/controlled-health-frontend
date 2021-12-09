import { createAction, props } from '@ngrx/store';
import { ExamResult } from '../models';

export const createExamResult = createAction(
  '[Exam Result Form Dialog Page] Create Exam Result',
  props<{ examResult: ExamResult; resultId: number }>()
);

export const updateExamResult = createAction(
  '[Exam Result Form Dialog Page] Update Exam Result',
  props<{ examResult: ExamResult; resultId: number }>()
);
