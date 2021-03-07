import { createAction, props } from '@ngrx/store';

export const loadResult = createAction(
  '[Result Exists Guard] Load Result',
  props<{ id: number }>()
);
