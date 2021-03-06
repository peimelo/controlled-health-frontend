import { createAction, props } from '@ngrx/store';

export const loadResult = createAction(
  '[Result Detail Page] Load Result',
  props<{ id: number }>()
);
