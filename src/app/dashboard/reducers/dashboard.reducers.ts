import { createReducer, on } from '@ngrx/store';
import { DashboardApiActions } from '../actions';
import { Dashboard } from '../models';

export const statusFeatureKey = 'status';

export interface State {
  dashboard: Dashboard | null;
}

export const initialState: State = {
  dashboard: null,
};

export const reducer = createReducer(
  initialState,

  on(DashboardApiActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboard,
  }))
);

export const getDashboard = (state: State) => state.dashboard;
