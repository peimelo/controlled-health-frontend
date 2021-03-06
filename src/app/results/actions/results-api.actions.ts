import { createAction, props } from '@ngrx/store';
import { Result, ResultResponse } from '../models';

export const createResultSuccess = createAction(
  '[Results/API] Create Result Success'
);

export const deleteResultSuccess = createAction(
  '[Results/API] Delete Results Success'
);

export const loadResultsSuccess = createAction(
  '[Results/API] Load Results Success',
  props<{ resultResponse: ResultResponse }>()
);

export const loadResultSuccess = createAction(
  '[Results/API] Load Result Success',
  props<{ result: Result }>()
);

export const updateResultSuccess = createAction(
  '[Results/API] Update Result Success'
);
