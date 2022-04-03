import { createAction, props } from '@ngrx/store';
import { Reference } from '../../core/models';

export const createReference = createAction(
  '[Reference Form Dialog Page] Create Reference',
  props<{ reference: Reference }>()
);

export const updateReference = createAction(
  '[Reference Form Dialog Page] Update Reference',
  props<{ reference: Reference }>()
);
