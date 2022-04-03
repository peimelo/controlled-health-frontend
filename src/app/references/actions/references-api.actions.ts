import { createAction, props } from '@ngrx/store';
import { ReferenceResponse } from '../models';

export const createReferenceSuccess = createAction(
  '[References/API] Create Reference Success'
);

export const deleteReferenceSuccess = createAction(
  '[References/API] Delete References Success'
);

export const loadReferencesSuccess = createAction(
  '[References/API] Load References Success',
  props<{ referenceResponse: ReferenceResponse }>()
);

export const updateReferenceSuccess = createAction(
  '[References/API] Update Reference Success'
);
