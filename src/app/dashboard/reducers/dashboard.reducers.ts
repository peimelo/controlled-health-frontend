import { createReducer, on } from '@ngrx/store';
import { DashboardApiActions } from '../actions';
import { Club } from '../models';

export const statusFeatureKey = 'status';

export interface State {
  list: Club[] | null;
}

export const initialState: State = {
  list: null,
};

export const reducer = createReducer(
  initialState,

  on(DashboardApiActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    list: dashboard,
  }))
);

export const getList = (state: State) => state.list;
