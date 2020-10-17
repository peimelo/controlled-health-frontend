import { createAction, props } from '@ngrx/store';
import { Dashboard } from '../models';

export const loadDashboardFailure = createAction(
  '[Dashboard/API] Load Dashboard Failure',
  props<{ error: any }>()
);

export const loadDashboardSuccess = createAction(
  '[Dashboard/API] Load Dashboard Success',
  props<{ dashboard: Dashboard }>()
);
