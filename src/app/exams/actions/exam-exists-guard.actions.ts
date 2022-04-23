import { createAction, props } from '@ngrx/store';

export const loadExam = createAction(
  '[Exam Exists Guard] Load Exam',
  props<{ id: number }>()
);
