import { createReducer, on } from '@ngrx/store';
import { AccountsPageActions } from '../../accounts/actions';
import { DashboardApiActions } from '../actions';
import { Dashboard } from '../models';

export const statusFeatureKey = 'status';

export interface State {
  dashboard: Dashboard;
  loaded: boolean;
}

export const initialState: State = {
  dashboard: {
    heights: [],
    weights: [],
  },
  loaded: false,
};

export const reducer = createReducer(
  initialState,

  on(AccountsPageActions.loadAccount, (state, { id }) => ({ ...initialState })),

  on(DashboardApiActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboard,
    loaded: true,
  }))
);

export const getDashboard = (state: State) => state.dashboard;
export const getLoaded = (state: State) => state.loaded;
