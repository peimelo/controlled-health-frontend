import { createAction, props } from '@ngrx/store';
import { Height } from '../../shared/models';

export const createHeight = createAction(
  '[Heights Form Dialog Page] Create Height',
  props<{ height: Height }>()
);

export const updateHeight = createAction(
  '[Heights Form Dialog Page] Update Height',
  props<{ height: Height }>()
);
