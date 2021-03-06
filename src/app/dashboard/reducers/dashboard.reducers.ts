import { createReducer, on } from '@ngrx/store';
import { DashboardApiActions } from '../actions';
import { Dashboard } from '../models';

export const statusFeatureKey = 'status';

export interface State {
  dashboard: Dashboard;
}

export const initialState: State = {
  dashboard: {
    heights: [],
    weights: [],
  },
};

export const reducer = createReducer(
  initialState,

  on(DashboardApiActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboard,
  }))
);

export const getDashboard = (state: State) => state.dashboard;
