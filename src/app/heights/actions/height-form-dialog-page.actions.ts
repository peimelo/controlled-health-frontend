import { createAction, props } from '@ngrx/store';
import { Height } from '../../core/models';

export const createHeight = createAction(
  '[Height Form Dialog Page] Create Height',
  props<{ height: Height }>()
);

export const updateHeight = createAction(
  '[Height Form Dialog Page] Update Height',
  props<{ height: Height }>()
);
