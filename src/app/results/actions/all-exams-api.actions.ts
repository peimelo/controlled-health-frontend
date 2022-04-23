import { createAction, props } from '@ngrx/store';
import { Exam } from '../../core/models';

export const loadAllExamsSuccess = createAction(
  '[Exams/API] Load All Exams Success',
  props<{ exams: ReadonlyArray<Exam> }>()
);
