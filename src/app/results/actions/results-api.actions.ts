import { createAction, props } from '@ngrx/store';
import { Result, ResultResponse } from '../models';

export const createResultSuccess = createAction(
  '[Results/API] Create Result Success',
  props<{ result: Result }>()
);

export const deleteResultSuccess = createAction(
  '[Results/API] Delete Result Success'
);

export const loadExamsResults = createAction(
  '[Results/API] Load Exams Results'
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
