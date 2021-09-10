import { createAction, props } from '@ngrx/store';
import { Exam } from '../../results/models';

export const loadAllExamsSuccess = createAction(
  '[Exams/API] Load All Exams Success',
  props<{ exams: Exam[] }>()
);
