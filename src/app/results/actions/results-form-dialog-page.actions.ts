import { createAction, props } from '@ngrx/store';
import { Result } from '../models';

export const createResult = createAction(
  '[Results Form Dialog Page] Create Result',
  props<{ result: Result }>()
);

export const updateResult = createAction(
  '[Results Form Dialog Page] Update Result',
  props<{ result: Result }>()
);
