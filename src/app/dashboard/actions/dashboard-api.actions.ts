import { createAction, props } from '@ngrx/store';
import { Club } from '../models';

export const loadDashboardFailure = createAction(
  '[Dashboard/API] Load Dashboard Failure',
  props<{ error: any }>()
);

export const loadDashboardSuccess = createAction(
  '[Dashboard/API] Load Dashboard Success',
  props<{ dashboard: Club[] }>()
);
